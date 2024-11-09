document.addEventListener('DOMContentLoaded', () => {
    const produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));
    if (produtoSelecionado) {
        mostrarProduto(produtoSelecionado);
    }
});

function mostrarProduto(item) {
    const produtoContainer = document.querySelector('.produto');
    console.log((item));
    
}