const resultados = document.getElementById('results');
const inputPesquisa = document.getElementById('input-pesquisa');

document.addEventListener('DOMContentLoaded', () => {
    inputPesquisa.addEventListener('focus', () => {
        resultados.style.display = 'block';

        if(resultados.innerHTML.trim() === '') {
            resultados.innerHTML = '<p class="naoEncontrado">Nenhum resultado encontrado</p>'
        }
    })

    inputPesquisa.addEventListener('blur', () => {
        setTimeout(() => {
            if (!resultados.contains(document.activeElement)) {
                resultados.style.display = 'none';
            }
        }, 1000)
    })
})

async function procurarPorNome(nome) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${nome}`);

    const data = await response.json();
    mostrarResultados(data.results);
}

function mostrarResultados(items) {
    resultados.innerHTML = '';
    
    if(items.length === 0) {
        resultados.innerHTML = '<p class="naoEncontrado">Nenhum resultado encontrado</p>'
    }

    items.forEach(item => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('results-produto');

        divContainer.onclick = (evento) => {
            evento.stopPropagation();
            
            comprarProdutos(item.id);
        }

        const image = document.createElement('img');
        image.setAttribute('src', item.thumbnail);

        const divTextos = document.createElement('div');

        const titulo = document.createElement('p');
        titulo.textContent = item.title;

        const preco = document.createElement('h1');
        let valor = item.price.toFixed(2).toString().split('.');
        preco.innerHTML = `R$${valor[0]}<sup>${valor[1]}</sup>`;

        const parcela = document.createElement('p');
        parcela.textContent = 'em ate 10x sem juros';

        const frete = document.createElement('p');
        frete.innerHTML = '<strong>frete gratis</strong> na sua primera compra';

        divTextos.appendChild(titulo);
        divTextos.appendChild(preco);
        divTextos.appendChild(parcela);
        divTextos.appendChild(frete);
        divContainer.appendChild(image);
        divContainer.appendChild(divTextos);
        resultados.appendChild(divContainer);
    })
}

inputPesquisa.addEventListener('input', () => {
    const termoDePesquisa = inputPesquisa.value.trim();
    procurarPorNome(termoDePesquisa);
})

async function comprarProdutos(id) {
    try {
        const request = await fetch(`https://api.mercadolibre.com/items/${id}`)
        const item = await request.json();
        
        localStorage.setItem('produtoSelecionado', JSON.stringify(item));
        window.location.href = '../produtos.html'
        
    } catch (error) {
        alert('Erro ao buscar produto');
    }
}