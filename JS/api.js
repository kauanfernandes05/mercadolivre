import { atualizarCarrinho } from './produto.js'

document.addEventListener('DOMContentLoaded', () => {
    produtos();
    localStorage.removeItem('produtoSelecionado');

    let carrinhoProdutos = JSON.parse(localStorage.getItem('carrinhoProdutos') || '[]');
    if (!Array.isArray(carrinhoProdutos)) {
        carrinhoProdutos = [];
    }
    atualizarCarrinho(carrinhoProdutos);
})

async function produtos() {
    const items = await buscarItems();

    items.forEach(async item => {
        const request = await fetch(`https://api.mercadolibre.com/items/${item.id}`)
        const produto = await request.json();
        
        const ofertasContainer = document.querySelector('.ofertas-container');

        const ofertas = document.createElement('div');
        ofertas.classList.add('ofertas');

        ofertas.onclick = () => comprarProdutos(produto.id);

        const image = document.createElement('img');
        image.classList.add('img-oferta');
        image.setAttribute('src', produto.pictures[0].url);

        const divTextos = document.createElement('div');
        divTextos.classList.add('text-oferta');

        const title = document.createElement('h3');
        title.textContent = produto.title;
        
        const preco = document.createElement('h1');
        let valor = produto.price;
        valor = Math.round(valor);
        let inteiro = Math.floor(valor / 100);
        let centavos = valor % 100;
        valor = `R$${inteiro}<sup>${centavos.toString().padStart(2, '0')}</sup>`;  
        preco.innerHTML = valor;

        const parcela = document.createElement('p');
        parcela.textContent = 'em ate 10x sem juros'

        const frete = document.createElement('p');
        frete.innerHTML = '<strong>frete gratis</strong> na sua primera compra';
        
        ofertas.appendChild(image);
        divTextos.appendChild(title);
        divTextos.appendChild(preco);
        divTextos.appendChild(parcela);
        divTextos.appendChild(frete);
        ofertas.appendChild(divTextos);
        ofertasContainer.appendChild(ofertas);
    })
    
}

async function comprarProdutos(id) {
    const request = await fetch(`https://api.mercadolibre.com/items/${id}`)
    const item = await request.json();
    
    localStorage.setItem('produtoSelecionado', JSON.stringify(item));
    window.location.href = '../produtos.html'
}

async function buscarItems() {
    try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA1430&sort=sold_quantity');
        const data = await response.json();

        const top12 = data.results.slice(0, 12);
        console.log(top12);
        
        return top12;
        
    } catch {
        alert('Erro ao buscar items');
        throw error;
    }
}