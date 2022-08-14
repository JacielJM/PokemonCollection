const pokeCards = [];
const poke = document.getElementById('busqueda');
const button = document.getElementById('button-addon2');
button.addEventListener('click', e => {
	e.preventDefault();
	fetchPokemon(poke.value);
});

class PokeCard {
	constructor(data) {
		this.nombre = data.name;
		this.img = data.sprites.front_default;
		this.id = data.id;
		this.borrar = false;
	}
}

function fetchPokemon(poke) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
		.then(res => res.json())
		.then(data => pokeCards.push(new PokeCard(data)));
	displayPokemon();
}

// function buildCards(pokecards) {
// 	let arr = pokecards.map((pokecard) => buildCard(pokecard));
// 	return arr;
// }

function buildCard(pokecard) {
	const divCol = document.createElement('div');
	divCol.setAttribute('class', 'col');

	divCol.innerHTML += `<div class="card h-100">
                <button type="button" class="btn-close" aria-label="Close"></button>
                <img src="${pokecard.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${pokecard.nombre.toUpperCase()}</h5>
                    <p class="card-text">Id: ${pokecard.id}</p>
                </div>
            </div>`;
	return divCol;
}
function displayPokemon() {
	const pokeContainer = document.querySelector('#gallery');
	pokeContainer.innerHTML = ``;
	for (let i = 0; i < pokeCards.length; i++) {
		const result = buildCard(pokeCards[i]);
		pokeContainer.appendChild(result);
	}
	document.querySelector('#busqueda').value = ``;
}

displayPokemon();
