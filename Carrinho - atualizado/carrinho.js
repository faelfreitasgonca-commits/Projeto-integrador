const produtosCard = document.querySelectorAll('.produto');
const totalDisplay = document.getElementById('total');

produtosCard.forEach(card => {
    const btnMais = card.querySelector('.btn-mais');
    const btnMenos = card.querySelector('.btn-menos');
    const btnRemover = card.querySelector('.remove');
    const displayQntd = card.querySelector('.qntd');

    // Botão de aumentar quantidade
    btnMais.addEventListener('click', () => {
        displayQntd.textContent = parseInt(displayQntd.textContent) + 1;
        calcularTudo();
    });

    // Botão de diminuir quantidade
    btnMenos.addEventListener('click', () => {
        let atual = parseInt(displayQntd.textContent);
        if (atual > 1) {
            displayQntd.textContent = atual - 1;
            calcularTudo();
        }
    });

    // Botão de remover produto
    btnRemover.addEventListener('click', () => {
        card.remove();
        calcularTudo();
    });
});

function calcularTudo() {
    let somaTotal = 0;

    document.querySelectorAll('.produto').forEach(card => {
        const qntd = parseInt(card.querySelector('.qntd').textContent);
        const preco = parseFloat(card.querySelector('.preco').textContent);
        somaTotal += qntd * preco;
    });

    totalDisplay.textContent = 'R$ ' + somaTotal.toFixed(2).replace('.', ',');
}

// Calcula o total inicial ao carregar a página
calcularTudo();