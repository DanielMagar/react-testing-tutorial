export const getPokemon = () => {
  let name = "charizard"
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json(); // Return the result of response.json()
    })
    .catch(error => {
      throw new Error('Failed to fetch data', error); // Handle errors here
    });
};
