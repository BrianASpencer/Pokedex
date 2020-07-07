const pokedex = document.getElementById('pokedex');

const lower = document.getElementById('lowerBound');

const upper = document.getElementById('upperBound');

var lowerBound = lower.value;
var upperBound = upper.value;


const fetchPokemon = (lower, upper) => {
    const promises = [];
    for (let i = lower; i <= upper; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => 
        `
        <li class="ourcard">
            <img class="ourcard-image" src="${pokeman.image}"/>
            <h2 class="ourcard-title">${'# '+pokeman.id} <br> ${pokeman.name}</h2>
            <p class="ourcard-subtitle">Type: ${pokeman.type}</p>
        </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon(lowerBound, upperBound);