document.addEventListener('DOMContentLoaded', () => {
    const produtoQuantidade = document.querySelector('.produto-quantidade');
    const textoProduto = document.querySelector('.produto-quantidade p');
    const produtoQuantidadeEscolha = document.querySelector('.produto-quantidade-escolha');
    const textoQuantidade = document.querySelectorAll('.produto-quantidade-escolha p');

    produtoQuantidade.addEventListener('click', () => {
        produtoQuantidade.classList.toggle('active');
        produtoQuantidadeEscolha.classList.toggle('active');
    })

    textoQuantidade.forEach(texto => {
        texto.addEventListener('click', () => {
            let textoEscolhido = texto.textContent;
            textoProduto.textContent = textoEscolhido;

            produtoQuantidade.classList.toggle('active');
            produtoQuantidadeEscolha.classList.toggle('active');
        })
    })
})