const MIN_PAGE = 0;
const MAX_PAGE = 0;
const POKE_TAM = 9;
const actualPage = 0;
const poke_offset = 0;

document.addEventListener('DOMContentLoaded', () => {

    class PokeCard extends HTMLElement {
        constructor() {
            super();
        }

        static get styles() {
            return ``
        }

        connectedCallback() {
            this.innerHTML = `
            ${PokeCard.styles}

            <div class="card">
            <div>
            <!--  <img id="img-pokeCard" src="" alt=""> -->
                <h1>Imagen</h1>
            </div>
            <div>
                <h1>Texto: Descripción</h1>
            </div>
            <div>
                <h1>Atack: Descripción</h1>
            </div>
            <div>
                <h1>Types: Descripción</h1>
            </div>
            <!-- 
                id: el.data.id,
                name: el.data.name.charAt(0).toUpperCase() + el.data.name.slice(1),
                attack: el.data.stats[1].base_stat,
                image: el.data.sprites.front_default,
                flagId: false,
                types: el.data.types.length > 0 ? el.data.types.map((obj) => obj.type.name) : []
            -->

        </div>
            `;
        }

        setImg(image) {
            if (image) {
                console.log("SRC: " + image);
                this.querySelector('#img-pokeCard').src = image;
                this.querySelector('#img-pokeCard').alt = "Image Pokemon";
            }
        }
    }
    customElements.define('poke-card', PokeCard);
})

function getPokemons() {
    const pokeApi = fetch('https://pokeapi.co/api/v2/pokemon?limit=' + POKE_TAM + '&offset=' + poke_offset)
        .then(response => response.json()
            .then(data => {
                // console.log(data.results);
                data.results.forEach(el => {
                    drawPokemon(el.url);
                }
                )
                return data.results;
            })
        );
}

function drawPokemon(url) {
    // console.log('URL: ' + url);
    const poke = fetch(url)
        .then(response => response.json()
            .then(data => {
                const card = document.createElement('poke-card');
                
                if (data.sprites.front_default) {
                    console.log(data.sprites.front_default);
                    card.setImg(data.sprites.front_default);
                }
                // label.innerHTML = element.name;
                document.getElementById("cards").appendChild(card);
            }
            )
        )
    //return data.results;
}

function nextPage() {
    if (actualPage < MAX_PAGE) {
        actualPage += 1;
        poke_offset = actualPage * POKE_TAM;
        retrievePokemon();
    }
}

function previewPage() {
    if (actualPage > MIN_PAGE) {
        actualPage -= 1
        poke_offset = actualPage * POKE_TAM;
        retrievePokemon();
    }
}