import React, { useEffect, useState } from 'react';
import PokimonApiCall, { getPokemon } from "./PokemonApi";
// import { getPokemon } from './PokemonApi';

const PokemonList = () => {
    const [pokeData, setPokeData] =useState([]);
    const [character, setCharacter] = useState("");

    const getPokeData = async () => {
      let characterName = "charizard";
      setCharacter(characterName)

      try {
      const data = await PokimonApiCall.getPokemon(characterName);
      if(data && data.abilities){
        setPokeData(data.abilities);
      }
      
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
    }
      
    }

    useEffect(()=>{
     getPokeData()
    }, [])


  return (
    <div>
      <h4>Character {character.toLocaleUpperCase()} Abilities</h4>
   
      {pokeData?.map((data)=>(
           <div data-testid="name-id" style={{color: "white"}} >{data?.ability?.name}</div>
        ))}
      </div>
      
  )
}

export default PokemonList
