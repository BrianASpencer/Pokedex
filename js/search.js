const pokedex = document.getElementById('pokedex');

function search() {
    var input = document.getElementById('queryContent');
    input = input.value.toLowerCase();
    lookUp(input);
}

function lookUp(query) {
    const promises = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    promises.push(fetch(url).then((res) => res.json()));
    
    Promise.all(promises).then((results) => {
        console.log(results);
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            shiny: result.sprites['front_shiny'],
            type: result.types.map((type) => type.type.name).join(', '),
            moves: result.moves.map((move) => move.move.name).join(', '),
            id: result.id,
            stats: result.stats.map((stat) => stat.base_stat).join(', ')
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    //console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => 
        `
        <li class="ourcard">
            Regular
            <img class="ourcard-image" src="${pokeman.image}"/>
            <br>
            Shiny
            <img class="ourcard-image" src="${pokeman.shiny}"/>
            <h2 class="ourcard-title">${'# '+pokeman.id} <br> ${pokeman.name}</h2>
            <p class="ourcard-subtitle">Type: ${pokeman.type.charAt(0).toUpperCase() + pokeman.type.substring(1)}</p>
            <p class="ourcard-title">Moves: </p>
            <p class="ourcard-subtitle">${pokeman.moves}<br></p>
            <h2 class="ourcard-title">Base Stats:</h2>
            <p style='visibility: hidden'>${pokeman.stats = pokeman.stats.split(',')}</p>
            <p class="ourcard-subtitle">HP: ${pokeman.stats[0]}<br></p>
            <p class="ourcard-subtitle">Attack: ${pokeman.stats[1]}<br></p>
            <p class="ourcard-subtitle">Defense: ${pokeman.stats[2]}<br></p>
            <p class="ourcard-subtitle">Sp. Attack: ${pokeman.stats[3]}<br></p>
            <p class="ourcard-subtitle">Sp. Defense: ${pokeman.stats[4]}<br></p>
            <p class="ourcard-subtitle">Speed: ${pokeman.stats[5]}<br></p>
        </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};
