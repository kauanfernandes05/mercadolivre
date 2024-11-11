const carrinho = document.getElementById('icon-cart');
const carrinhoProdutos = document.querySelector('.cart-items');

carrinho.addEventListener('click', () => {
    carrinhoProdutos.classList.toggle('active');
})