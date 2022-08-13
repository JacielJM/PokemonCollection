const pokemon = document.getElementById('busqueda');
const button = document.getElementById('button-addon2');
const gallery = document.getElementById('gallery');

button.addEventListener('click', e => {
	e.preventDefault();
	fetchPokemon(pokemon.value);
});

function fetchPokemon(poke = undefined) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
		.then(res => res.json())
		.then(data => addPokemon(data));
}

function addPokemon(pokemon) {
	document.getElementById('busqueda').value = '';
	const divCol = document.createElement('div');
	divCol.setAttribute('class', 'col');

	const divCard = document.createElement('div');
	divCard.setAttribute('class', 'card h-100');

	const closeBtn = document.createElement('button');
	closeBtn.setAttribute('type', 'button');
	closeBtn.setAttribute('class', 'btn-close');
	closeBtn.setAttribute('ariaLabel', 'Close');

	const imgPokemon = document.createElement('img');
	imgPokemon.setAttribute('src', `${pokemon.sprites.front_default}`);
	imgPokemon.setAttribute('class', 'card-img-top');

	const cardBody = document.createElement('div');
	cardBody.setAttribute('class', 'card-body');

	const cardTitle = document.createElement('h5');
	cardTitle.setAttribute('class', 'card-title');
	cardTitle.innerHTML = pokemon.name.toUpperCase();

	const cardText = document.createElement('p');
	cardText.setAttribute('class', 'card-text');
	cardText.innerHTML = `Id: ${pokemon.id}`;

	divCol.appendChild(divCard);
	divCard.appendChild(closeBtn);
	divCard.appendChild(imgPokemon);
	divCard.appendChild(cardBody);
	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardText);

	gallery.appendChild(divCol);
}

fetchPokemon();
