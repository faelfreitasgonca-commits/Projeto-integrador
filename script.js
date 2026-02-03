// Script para o index.html - Adicionar produtos ao carrinho

// Função para obter o carrinho do localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Função para salvar o carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Função para adicionar produto ao carrinho
function addToCart(produto) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === produto.id);

    if (existingProduct) {
        existingProduct.quantidade += 1;
    } else {
        cart.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    saveCart(cart);
    showNotification('Produto adicionado ao carrinho!');
}

// Função para mostrar notificação
function showNotification(message) {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar event listeners aos botões
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar contador ao carregar a página
    updateCartCount();

    // Adicionar evento de clique em todos os botões "Adicionar"
    const addButtons = document.querySelectorAll('.btn-adicionar');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const produtoElement = this.closest('.produto');
            
            const produto = {
                id: produtoElement.getAttribute('data-id'),
                nome: produtoElement.getAttribute('data-nome'),
                preco: parseFloat(produtoElement.getAttribute('data-preco')),
                imagem: produtoElement.getAttribute('data-imagem')
            };

            addToCart(produto);
        });
    });

    // Slider de banners
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let index = 0;

        setInterval(() => {
            slides.forEach(s => s.classList.remove('ativo'));
            slides[index].classList.add('ativo');
            index = (index + 1) % slides.length;
        }, 5000);
    }
});
