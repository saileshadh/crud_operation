import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import pokemon from './pokemon.png'

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemonDetail(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!pokemonDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className='cardd'>
      {/* <h1>Pokemon Details</h1> */}
      <img src={pokemon} alt="pokemon images" />
      <div className='individual'> 
      
      <p className='name'>Name: {pokemonDetail.name}</p>
      <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
      </div>
    </div>
    
  );
};

export default PokemonDetail;
