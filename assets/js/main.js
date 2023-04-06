const offset = 0;
const limit = 26;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon, index) {
  const number = index + 1;
  return `<li class="pokemon">
  <span class="numero">#${number.toString().padStart(3, "0")}</span>
  <span class="nome">${pokemon.name}</span>

  <div class="detalhes">
    <ol class="botao">
      <li class="tipo">Saiba Mais</li>

    </ol>

    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${number}.gif" alt=${
    pokemon.name
  }>

  </div>
</li>
`;
}

const pokemonLista = document.getElementById(`pokemonLista`);

pokeApi
  .getPokemons()
  .then((pokemons) => {
    for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      pokemonLista.innerHTML += convertPokemonToLi(pokemon, i);
    }
  })
  .catch((error) => {
    console.error(error);
  });
