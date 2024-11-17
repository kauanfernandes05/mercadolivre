import { verificaQuantidade } from "./carrinho.js";

document.addEventListener('DOMContentLoaded', () => {
    const produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));
    if (produtoSelecionado) {
        setTimeout(() => {
            mostrarProduto(produtoSelecionado);;
        }, 100)
    }

    let carrinhoProdutos = JSON.parse(localStorage.getItem('carrinhoProdutos') || '[]');
    if (!Array.isArray(carrinhoProdutos)) {
        carrinhoProdutos = [];
    }
    setTimeout(() => {
        atualizarCarrinho(carrinhoProdutos);
    }, 100)
});

function mostrarProduto(item) {
    const produtoContainer = document.querySelector('.produto');
    
    const titulo = document.createElement('h2');
    titulo.textContent = item.title;

    const carrosselDiv = document.createElement('div');
    carrosselDiv.setAttribute('id', 'carrossel');

    const carrosselContainer = document.createElement('div');
    carrosselContainer.classList.add('produto-carrossel-container');

    const produtoCarrossel = document.createElement('div');
    produtoCarrossel.classList.add('produto-carrossel');

    item.pictures.forEach(picture => {
        const image = document.createElement('img');
        image.setAttribute('src', picture.url);

        produtoCarrossel.appendChild(image);
    })

    carrosselContainer.appendChild(produtoCarrossel);

    const prevButton = document.createElement('div');
    prevButton.classList.add('prev-button');
    prevButton.textContent = "<";

    const nextButton = document.createElement('div');
    nextButton.classList.add('next-button');
    nextButton.textContent = ">";

    const imageButtons = document.createElement('div');
    imageButtons.classList.add('image-buttons');

    for(let i = 0; i < item.pictures.length; i++) {
        const divImageButtons = document.createElement('div');
        divImageButtons.setAttribute('id', i+1);

        imageButtons.appendChild(divImageButtons);
    }
    
    carrosselDiv.appendChild(carrosselContainer);
    carrosselDiv.appendChild(prevButton);
    carrosselDiv.appendChild(nextButton);
    carrosselDiv.appendChild(imageButtons);

    const preco = document.createElement('h1');
    let valor = item.price;
    const parcela = document.createElement('p');
    parcela.classList.add('parcela');

    if(Number.isInteger(valor)){
        valor = Math.round(valor);
        let inteiro = Math.floor(valor / 100);
        let centavos = valor % 100;
        valor = `R$${inteiro}<sup>${centavos.toString().padStart(2, '0')}</sup>`;  
        preco.innerHTML = valor;
    
        valor = Math.round(item.price/12);
        inteiro = Math.floor(valor / 100);
        centavos = valor % 100;
        parcela.innerHTML = `em 12 x de ${inteiro}<sup>${centavos}</sup>`;
    } else {
        let valor = item.price.toFixed(2);
        let inteiro = Math.floor(valor);
        let centavos = Math.round((valor - inteiro) * 100);
        valor = `R$${inteiro}<sup>${centavos.toString().padStart(2, '0')}</sup>`;  
        preco.innerHTML = valor;
    
        valor = item.price / 12;
        valor.toFixed(2)
        inteiro = Math.floor(valor);

        centavos = Math.round((valor - inteiro) * 100);
        parcela.innerHTML = `em 12 x de ${inteiro}<sup>${centavos}</sup>`;
    }

    
    const entrega = document.createElement('p');
    entrega.innerHTML = '<strong>Chegará grátis</strong> por ser sua primeira compra';

    const estoque = document.createElement('p');
    const disponivel = (item.initial_quantity == 1) ? `${Math.round(item.initial_quantity / 100)} unidade` : `${Math.round(item.initial_quantity / 100)} unidades`
    estoque.textContent = `Estoque disponível: ${disponivel}`;

    const produtoQuantidade = document.createElement('div');
    produtoQuantidade.classList.add('produto-quantidade');

    const quantidade = document.createElement('p');
    quantidade.textContent = 'quantidade';

    const quantidadeImg = document.createElement('img');
    quantidadeImg.setAttribute('src', '../IMG/Vector 1.svg');

    produtoQuantidade.appendChild(quantidade);
    produtoQuantidade.appendChild(quantidadeImg);

    const escolha = document.createElement('div');
    escolha.classList.add('produto-quantidade-escolha');

    for(let i = 0; i < 5; i++) {
        if(i + 1 <= Math.floor(item.initial_quantity / 100)) {
            const produtoEscolha = document.createElement('p');
            produtoEscolha.textContent = (i + 1 == 1) ? `${i + 1} unidade` : `${i + 1} unidades`;
            escolha.appendChild(produtoEscolha);
        } else {
            i=5
        }
    }

    const carrinho = document.createElement('a');
    carrinho.textContent = 'Adicionar ao carrinho';

    carrinho.onclick = () => adicionarCarrinho(item, quantidade);

    produtoContainer.appendChild(titulo);
    produtoContainer.appendChild(carrosselDiv);
    produtoContainer.appendChild(preco);
    produtoContainer.appendChild(parcela);
    produtoContainer.appendChild(entrega);
    produtoContainer.appendChild(estoque);
    produtoContainer.appendChild(produtoQuantidade);
    produtoContainer.appendChild(escolha);
    produtoContainer.appendChild(carrinho);
}

function adicionarCarrinho(item, quantidade) {
    if(quantidade.textContent == 'quantidade') {
        alert('Escolha a quantidade');
    } else {
        let carrinhoProdutos = JSON.parse(localStorage.getItem('carrinhoProdutos') || '[]');

        if (!Array.isArray(carrinhoProdutos)) {
            carrinhoProdutos = [];
        }
        
        let numero = Number(quantidade.textContent.substr(0, 1));

        const produtoCarrinho = {
            titulo: item.title,
            preco: item.price,
            imageUrl: item.pictures[0].url,
            quantidade: numero
        }

        console.log(carrinhoProdutos);
        carrinhoProdutos.push(produtoCarrinho);
        localStorage.setItem('carrinhoProdutos', JSON.stringify(carrinhoProdutos));

        console.log(carrinhoProdutos);
        atualizarCarrinho(carrinhoProdutos);
        verificaQuantidade();
    }
}

function atualizarCarrinho(items) {
    const contCart = document.querySelector('.cart-items');
    contCart.innerHTML = '';

    if (!Array.isArray(items)) {
        items = [];
    }
    
    const cartQuantia = document.querySelector('.cart-quantia');
    cartQuantia.textContent = '0';

    let somaInteiros = 0;
    let somaCentavos = 0;
    
    items.forEach(item => {
        cartQuantia.textContent = Number(cartQuantia.textContent) + item.quantidade;

        const cartProduto = document.createElement('div');
        cartProduto.classList.add('cart-produto');

        const image = document.createElement('img');
        image.setAttribute('src', item.imageUrl);
        
        const cartTextos = document.createElement('div');
        cartTextos.classList.add('cart-textos');

        const titulo = document.createElement('h2');
        titulo.textContent = item.titulo;

        const preco = document.createElement('h1');
        let valor = item.preco * item.quantidade;
    
        if(Number.isInteger(valor)){
            valor = Math.round(valor);
            let inteiro = Math.floor(valor / 100);
            let centavos = valor % 100;
            valor = `R$${inteiro}<sup>${centavos.toString().padStart(2, '0')}</sup>`;  
            preco.innerHTML = valor;

            somaInteiros = somaInteiros + inteiro;
            somaCentavos = somaCentavos + (centavos / 100);
        } else {
            valor = valor.toFixed(2);
            let inteiro = Math.floor(valor);
            let centavos = Math.round((valor - inteiro) * 100);
            valor = `R$${inteiro}<sup>${centavos.toString().padStart(2, '0')}</sup>`;  
            preco.innerHTML = valor;

            somaInteiros = somaInteiros + inteiro;
            somaCentavos = somaCentavos + (centavos / 100);
        }
        
        const cartQuantidade = document.createElement('div');
        cartQuantidade.classList.add('cart-quantidade');

        const textoQuantidade = document.createElement('p');
        textoQuantidade.textContent = 'Quantidade: ';
        
        const quantidadeComprada = document.createElement('p');
        quantidadeComprada.textContent = item.quantidade;

        const botaoExcluir = document.createElement('div');
        botaoExcluir.setAttribute('id', 'excluir');

        botaoExcluir.onclick = () => {
            excluirProduto(item);
            verificaQuantidade();
        }

        const div1 = document.createElement('div');
        const div2 = document.createElement('div');

        botaoExcluir.appendChild(div1);
        botaoExcluir.appendChild(div2);

        cartQuantidade.appendChild(textoQuantidade);
        cartQuantidade.appendChild(quantidadeComprada);
        cartTextos.appendChild(titulo);
        cartTextos.appendChild(preco);
        cartTextos.appendChild(cartQuantidade);
        cartProduto.appendChild(image);
        cartProduto.appendChild(cartTextos);
        cartProduto.appendChild(botaoExcluir);
        contCart.appendChild(cartProduto);
    })

    let somaTotal = somaInteiros + somaCentavos;
    let inteiro = Math.floor(somaTotal);
    let centavos = Math.round((somaTotal - inteiro) * 100);
    let valor = `R$ ${inteiro}<sup>${centavos.toString().padStart(2, '0')}</sup>`;  
    
    const cartTotal = document.createElement('div');
    cartTotal.classList.add('cart-total');

    const valorTotal = document.createElement('h1');
    valorTotal.innerHTML = `Total: ${valor}`;

    cartTotal.appendChild(valorTotal);
    contCart.appendChild(cartTotal);
}

function excluirProduto(item) {
    let carrinhoProdutos = JSON.parse(localStorage.getItem('carrinhoProdutos') || '[]');

    if (!Array.isArray(carrinhoProdutos)) {
        carrinhoProdutos = [];
    }

    let index = carrinhoProdutos.findIndex(produto => produto.titulo === item.titulo);
    
    carrinhoProdutos.splice(index, 1);

    localStorage.setItem('carrinhoProdutos', JSON.stringify(carrinhoProdutos));
    atualizarCarrinho(carrinhoProdutos);
}

export { atualizarCarrinho };