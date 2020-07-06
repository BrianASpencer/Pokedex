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
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};