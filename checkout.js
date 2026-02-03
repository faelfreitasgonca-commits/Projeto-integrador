// ==================== MÁSCARAS DE ENTRADA ====================

// Máscara de telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    e.target.value = value;
});

// Máscara de CEP
document.getElementById('cep').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 8) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    
    e.target.value = value;
});

// Máscara de número do cartão
const cardNumberInput = document.getElementById('card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 16) {
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        }
        
        e.target.value = value;
    });
}

// Máscara de validade do cartão
const cardExpiryInput = document.getElementById('card-expiry');
if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 4) {
            value = value.replace(/^(\d{2})(\d)/, '$1/$2');
        }
        
        e.target.value = value;
    });
}

// Máscara de CVV
const cardCvvInput = document.getElementById('card-cvv');
if (cardCvvInput) {
    cardCvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
}

// ==================== BUSCA DE CEP ====================

document.querySelector('.btn-buscar-cep').addEventListener('click', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return;
    }
    
    // Mostra loading
    const btn = this;
    const originalText = btn.textContent;
    btn.textContent = 'Buscando...';
    btn.disabled = true;
    
    // Busca o CEP na API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado. Por favor, verifique o número digitado.');
                return;
            }
            
            // Preenche os campos automaticamente
            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
            
            // Foca no campo número
            document.getElementById('numero').focus();
            
            // Calcula frete (simulado)
            calcularFrete();
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar CEP. Tente novamente.');
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
});

// ==================== CÁLCULO DE FRETE ====================

function calcularFrete() {
    // Simulação de cálculo de frete
    const freteValor = 15.00;
    const subtotalElement = document.getElementById('subtotal');
    const freteElement = document.getElementById('frete');
    const totalElement = document.getElementById('total');
    
    const subtotal = parseFloat(subtotalElement.textContent.replace('R$ ', '').replace(',', '.'));
    const total = subtotal + freteValor;
    
    freteElement.textContent = `R$ ${freteValor.toFixed(2).replace('.', ',')}`;
    totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    // Atualiza as parcelas se cartão de crédito estiver selecionado
    atualizarParcelas(total);
}

// ==================== MÉTODOS DE PAGAMENTO ====================

const paymentRadios = document.querySelectorAll('input[name="pagamento"]');
const cardDetails = document.getElementById('card-details');
const pixInfo = document.getElementById('pix-info');
const installmentsSection = document.getElementById('installments-section');

paymentRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        // Esconde todos os detalhes primeiro
        cardDetails.style.display = 'none';
        pixInfo.style.display = 'none';
        installmentsSection.style.display = 'none';
        
        // Remove required dos campos de cartão
        document.getElementById('card-number').removeAttribute('required');
        document.getElementById('card-name').removeAttribute('required');
        document.getElementById('card-expiry').removeAttribute('required');
        document.getElementById('card-cvv').removeAttribute('required');
        
        // Mostra o conteúdo apropriado
        if (this.value === 'credito' || this.value === 'debito') {
            cardDetails.style.display = 'block';
            
            // Adiciona required aos campos de cartão
            document.getElementById('card-number').setAttribute('required', 'required');
            document.getElementById('card-name').setAttribute('required', 'required');
            document.getElementById('card-expiry').setAttribute('required', 'required');
            document.getElementById('card-cvv').setAttribute('required', 'required');
            
            // Mostra parcelas apenas para crédito
            if (this.value === 'credito') {
                installmentsSection.style.display = 'block';
            }
        } else if (this.value === 'pix') {
            pixInfo.style.display = 'block';
        }
    });
});

// ==================== ATUALIZAR PARCELAS ====================

function atualizarParcelas(total) {
    const installmentsSelect = document.getElementById('installments');
    if (!installmentsSelect) return;
    
    installmentsSelect.innerHTML = '';
    
    // Gera opções de parcelas (até 3x sem juros neste exemplo)
    for (let i = 1; i <= 3; i++) {
        const valorParcela = (total / i).toFixed(2).replace('.', ',');
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}x de R$ ${valorParcela} sem juros`;
        installmentsSelect.appendChild(option);
    }
}

// ==================== VALIDAÇÃO E ENVIO DO FORMULÁRIO ====================

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validações básicas
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value;
    
    // Verifica se método de pagamento foi selecionado
    const pagamento = document.querySelector('input[name="pagamento"]:checked');
    if (!pagamento) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }
    
    // Validação específica para cartão
    if (pagamento.value === 'credito' || pagamento.value === 'debito') {
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardName = document.getElementById('card-name').value.trim();
        const cardExpiry = document.getElementById('card-expiry').value.trim();
        const cardCvv = document.getElementById('card-cvv').value.trim();
        
        if (cardNumber.length < 13 || cardNumber.length > 16) {
            alert('Número do cartão inválido.');
            return;
        }
        
        if (!cardName) {
            alert('Por favor, informe o nome no cartão.');
            return;
        }
        
        if (cardExpiry.length !== 5) {
            alert('Data de validade inválida. Use o formato MM/AA.');
            return;
        }
        
        if (cardCvv.length < 3 || cardCvv.length > 4) {
            alert('CVV inválido.');
            return;
        }
    }
    
    // Coleta todos os dados do pedido
    const dadosPedido = {
        cliente: {
            nome: nome,
            email: email,
            telefone: telefone
        },
        endereco: {
            cep: cep,
            endereco: endereco,
            numero: numero,
            complemento: document.getElementById('complemento').value.trim(),
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            observacoes: document.getElementById('observacoes').value.trim()
        },
        pagamento: {
            metodo: pagamento.value,
            parcelas: pagamento.value === 'credito' ? document.getElementById('installments').value : 1
        },
        total: document.getElementById('total').textContent
    };
    
    // Simula processamento do pedido
    processarPedido(dadosPedido);
});

// ==================== PROCESSAR PEDIDO ====================

function processarPedido(dados) {
    // Mostra loading
    const btnFinalizar = document.querySelector('.btn-finalizar');
    const originalHTML = btnFinalizar.innerHTML;
    btnFinalizar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    btnFinalizar.disabled = true;
    
    // Simula envio para servidor (substitua por sua API real)
    setTimeout(() => {
        console.log('Pedido finalizado:', dados);
        
        // Redireciona para página de confirmação
        alert('Pedido realizado com sucesso!\n\nNúmero do pedido: #' + Math.floor(Math.random() * 100000) + '\n\nVocê receberá um e-mail com os detalhes.');
        
        // Limpa o carrinho (localStorage)
        localStorage.removeItem('carrinho');
        
        // Redireciona (você pode criar uma página de confirmação)
        window.location.href = 'index.html';
    }, 2000);
}

// ==================== INICIALIZAÇÃO ====================

// Carrega dados do carrinho se houver (você pode integrar com localStorage)
document.addEventListener('DOMContentLoaded', function() {
    // Aqui você pode carregar os produtos do localStorage se estiver usando
    // const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    // e atualizar a seção de resumo
    
    // Por enquanto, os produtos estão hardcoded no HTML
    console.log('Checkout carregado');
});

// Validação de e-mail
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        this.focus();
    }
});
