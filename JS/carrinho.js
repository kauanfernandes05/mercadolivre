const carrinho = document.getElementById('icon-cart');
const carrinhoProdutos = document.querySelector('.cart-items');
const cartQuantia = document.querySelector('.cart-quantia');

carrinho.addEventListener('click', () => {
    carrinhoProdutos.classList.toggle('active');
})

export function verificaQuantidade() {
    const quantidade = Number(cartQuantia.textContent);

    if (quantidade == 0) {
        cartQuantia.classList.remove('active');
    } else {
        cartQuantia.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        verificaQuantidade();
    }, 100)
});