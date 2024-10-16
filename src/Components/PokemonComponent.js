// PokemonComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonComponent = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null); // New state for handling errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/charizard');
        setPokemon(response.data);
      } catch (error) {
        setError('Failed to fetch data'); // Set error message
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>; // Display error if it exists
  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index} data-testid="ability">
            {ability.ability.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonComponent;

