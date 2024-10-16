// PokemonApi.js
import axios from 'axios';

export const getPokemon = (name) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(response => {
      if (response.status === 200) {
        return response.data; // Return the data from the response
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .catch(error => {
      throw new Error('Failed to fetch data', error); // Handle errors here
    });
};

export default { getPokemon };
