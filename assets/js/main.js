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

const typeColors = {
  normal: "black",
  fighting: "orange",
  flying: "black",
  poison: "purple",
  ground: "brown",
  rock: "gray",
  bug: "lightpurple",
  ghost: "darkgray",
  steel: "metal",
  fire: "red",
  water: "lightblue",
  grass: "green",
  electric: "lightyellow",
  psychic: "purple",
  ice: "iceblue",
  dragon: "orange",
  dark: "gray",
  fairy: "pink",
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
      const typeColor = typeColors[types[0].type.name];

      return `<li class="pokemon" style="color: ${typeColor}">
        <span class="numero">#${number.toString().padStart(3, "0")}</span>
        <span class="nome">${pokemon.name}</span>
        <span class="tipos">${typeNames}</span>

        <div class="detalhes">
          <ol class="botao">
            <li class="tipo"><a href="${pokemonUrl}" target="_blank">Saiba Mais</a></li>
          </ol>

          <img src="https://img.pokemondb.net/sprites/home/normal/${
            pokemon.name
          }.png" alt="${pokemon.name}">
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
