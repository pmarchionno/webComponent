const MIN_PAGE = 0;
const POKE_TAM = 12; // Número de Tarjetas por Página
const apiPokeURL = 'https://pokeapi.co/api/v2/pokemon';
const MAX_PAGE = (function () {
    // Calculamos el máximo de páginas según el total de Pokémons y POKE_TAM
    const totalPokemons = 0;
    fetch(apiPokeURL)
        .then(response => response.json())
        .then(data => {
            this.totalPokemons = data.count;
        });
    return Math.ceil(totalPokemons / POKE_TAM);
})();
const actualPage = 0;
const poke_offset = 0;

document.addEventListener('DOMContentLoaded', () => {
    class PokeCard extends HTMLElement {
        constructor(pokemonData) {
            super();
            this.pokemonData = pokemonData || {};
        }

        static get observedAttributes() {
            return ['pokemon-data'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'pokemon-data' && newValue) {
                const pokemon = JSON.parse(newValue);
                this.render(pokemon);
            }
        }

        render(pokemon) {
            this.innerHTML = `
            <div class="card">
                <div class="card-img">
                    <img class="img-pokeCard" src="${pokemon.sprites.front_default}" alt="Image of ${pokemon.name}">
                </div>
                <div class="border-1">
                </div>
                <div class="">
                ${pokemon.name}
                </div>
                <div class="">
                ${pokemon.name}
                </div>
                <div class="">
                ${pokemon.name}
                </div>
                <div class="">
                ${pokemon.name}
                </div>
                <div class="">
                ${pokemon.name}
                </div>
                <h2 id="textPrincipal">${pokemon.name}</h2>
            </div>
            `;
        }
    }

    customElements.define('poke-card', PokeCard);
});

function getPokemons() {
    fetch(apiPokeURL + '?limit=' + POKE_TAM + '&offset=' + poke_offset)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(el => {
                drawPokemon(el.url);
            });
        });
}

function drawPokemon(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const card = document.createElement('poke-card');
            card.setAttribute('pokemon-data', JSON.stringify(data)); // Pass data as attribute
            document.getElementById("cards").appendChild(card);
        });
}

function nextPage() {
    if (actualPage < MAX_PAGE) {
        actualPage += 1;
        poke_offset = actualPage * POKE_TAM;
        getPokemons();
    }
}

function previewPage() {
    if (actualPage > MIN_PAGE) {
        actualPage -= 1;
        poke_offset = actualPage * POKE_TAM;
        getPokemons();
    }
}

window.onload = function () { getPokemons() };
