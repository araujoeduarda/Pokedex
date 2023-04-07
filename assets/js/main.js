const typeTranslations = {
  normal: "Normal",
  fighting: "Lutador",
  flying: "Voador",
  poison: "Veneno",
  ground: "Terra",
  rock: "Pedra",
  bug: "Inseto",
  ghost: "Fantasma",
  steel: "Aço",
  fire: "Fogo",
  water: "Água",
  grass: "Grama",
  electric: "Elétrico",
  psychic: "Psíquico",
  ice: "Gelo",
  dragon: "Dragão",
  dark: "Sombrio",
  fairy: "Fada",
};

function convertPokemonToLi(pokemon, index) {
  const number = index + 1;
  const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
  const pokemonUrl = `https://unpkg.com/css-chain-test@1.0.8/src/PokeApi-Explorer.html?id=${pokemonId}`;

  // Faz uma nova requisição para obter informações detalhadas sobre o Pokémon
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      const { types, species } = data;
      const typeNames = types
        .map((type) => typeTranslations[type.type.name])
        .join(", ");
      const speciesName = species.name;

      return `<li class="pokemon">
        <span class="numero">#${number.toString().padStart(3, "0")}</span>
        <span class="nome">${pokemon.name}</span>
        <span class="tipo">${typeNames}</span>

        <div class="detalhes">
          <ol class="botao">
            <li class="tipo"><a href="${pokemonUrl}" target="_blank">Saiba Mais</a></li>
          </ol>

          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${number}.gif" alt="${
        pokemon.name
      }">
        </div>
      </li>
      `;
    })
    .catch((error) => console.error(error));
}

const pokemonLista = document.getElementById(`pokemonLista`);

pokeApi
  .getPokemons()
  .then((pokemons) => {
    for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      convertPokemonToLi(pokemon, i).then((html) => {
        pokemonLista.innerHTML += html;
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
