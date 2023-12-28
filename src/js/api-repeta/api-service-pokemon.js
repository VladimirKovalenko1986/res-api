const BASE_URL = 'https://pokeapi.co/api/v2';

function fetchPokemon(pokemonId) {
  const url = `${BASE_URL}/pokemon/${pokemonId}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  });
}

export default { fetchPokemon };
