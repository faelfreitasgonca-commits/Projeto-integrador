// Script para carrinho.html - Gerenciar carrinho de compras

// Função para obter o carrinho do localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Função para salvar o carrinho no localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
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

// Função para formatar preço
function formatPrice(price) {
    return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
}

// Função para calcular o total do carrinho
function calculateTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    return total;
}

// Função para atualizar a exibição do total
function updateTotal() {
    const total = calculateTotal();
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }
}

// Função para remover produto do carrinho
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Função para atualizar quantidade do produto
function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const product = cart.find(item => item.id === productId);
    
    if (product) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            product.quantidade = newQuantity;
            saveCart(cart);
            renderCart();
            updateCartCount();
        }
    }
}

// Função para renderizar o carrinho
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartElement = document.getElementById('empty-cart');
    const produtoHeader = document.getElementById('produto-header');
    const envioSection = document.getElementById('envio-section');

    // Limpar container
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        // Mostrar mensagem de carrinho vazio
        emptyCartElement.style.display = 'block';
        produtoHeader.style.display = 'none';
        envioSection.style.display = 'none';
    } else {
        // Esconder mensagem de carrinho vazio
        emptyCartElement.style.display = 'none';
        produtoHeader.style.display = 'grid';
        envioSection.style.display = 'block';

        // Renderizar cada produto
        cart.forEach(item => {
            const produtoDiv = document.createElement('div');
            produtoDiv.className = 'produto';
            produtoDiv.innerHTML = `
                <div class="produto-info">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <p>${item.nome}</p>
                </div>
                
                <div class="quantidade">
                    <div class="controles-quantidade">
                        <button class="btn-menos" onclick="updateQuantity('${item.id}', ${item.quantidade - 1})">-</button>
                        <span class="qntd">${item.quantidade}</span>
                        <button class="btn-mais" onclick="updateQuantity('${item.id}', ${item.quantidade + 1})">+</button>
                    </div>
                    <button class="remove" onclick="removeFromCart('${item.id}')">Remover</button>
                </div>
                
                <div class="price">
                    <strong>${formatPrice(item.preco * item.quantidade)}</strong>
                    <small>Unitário: ${formatPrice(item.preco)}</small>
                </div>
            `;
            cartItemsContainer.appendChild(produtoDiv);
        });

        // Atualizar total
        updateTotal();
    }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartCount();
});
