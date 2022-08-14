const pokeCards = [];
const poke = document.getElementById('busqueda');
console.log(poke.value);
const button = document.getElementById('button-addon2');
poke.addEventListener('click', addPokecard(poke.value));

class PokeCard {
	constructor(nombre, img, id) {
		this.nombre = nombre;
		this.img = img;
		this.id = id;
		this.borrar = false;
	}

	borrar() {
		this.borrar = true;
	}
}

function buildCard(pokecard, index) {
	const divCol = document.createElement('div');
	divCol.setAttribute('class', 'col');
	divCol.setAttribute('id', index);

	divCol.innerHTML += `<div class="card h-100">
                <button id="b${index}" type="button" class="btn-close" aria-label="Close"></button>
                <img src="${pokecard.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${pokecard.name.toUpperCase()}</h5>
                    <p class="card-text">Id: ${pokecard.id}</p>
                </div>
            </div>`;
	pokecard.borrar && deleteCard(index);
	const equis = document.getElementById(`b${index}`);
	equis.addEventListener('click', borrar);
	return divCol;
}

function buildCards(pokecards) {
	const arr = pokecards.map((pokecard, index) => buildCard(pokecard, index));
	return arr;
}

function displayPokeCards() {
	const pokeContainer = document.querySelector('#gallery');
	document.querySelector('#busqueda').value = '';
	const result = buildCards(pokeCards);
	for (let i = 0; i < result.length; i++) {
		pokeContainer.appendChild(result[i]);
	}
}

function addPokecard(poke) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
		.then(res => res.json())
		.then(data => {
			nuevo = new PokeCard(data.name, data.sprites.front_default, data.id);
			pokeCards.push(nuevo);
		});
	console.log(pokeCards);
	document.getElementById('busqueda').value = '';
	displayPokeCards();
}

function borrar(event) {
	const index = event.target.id;
	pokeCards.splice(index, 1);
	displayPokeCards();
}

displayPokeCards();
