import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokemon from './pokemon.png'
import axios from 'axios';
import Postanddelete from './Postanddelete';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [updatedName, setUpdatedName] = useState('');
  const [editingPokemonId, setEditingPokemonId] = useState(null);

  const handleDelete = (pokemonToDelete) => {
    setPokemonList((prevList) =>
      prevList.filter((pokemon) => pokemon.url !== pokemonToDelete.url)
    );
  };
  // const handleDelete = (pokemonToDelete) => {
  //   axios.delete(`https://pokeapi.co/api/v2/pokemon?limit=20/`)
  //     .then((res) => {
  //       setPokemonList((prevList) =>
  //         prevList.filter((pokemon) => pokemon.id !== pokemonToDelete.id)
  //       );
  //     })
  //     .catch((error) => {
  //       alert('not deleting', error);
  //     });
  // };

  const handleUpdateName = (event, pokemon) => {
    event.preventDefault();
    if (updatedName.trim() === '') {
      return;
    }
    setPokemonList((prevList) =>
      prevList.map((p) =>
        p.url === pokemon.url ? { ...p, name: updatedName } : p
      )
    );
    setUpdatedName('');
    setEditingPokemonId(null);
  };

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='card'>
      {/* <h1>Pokemon List</h1> */}
      <img src={pokemon} alt="pokemon images" />
      <ul className='cards'>
        {pokemonList.map((pokemon) => {
          const id = pokemon.url.split('/')[6];

          return (
            <li className='individual' key={id}>
              <Link to={`/pokemon/${id}`}>
                <div className='name'>{id}</div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                />
                <div className='name'>
                {pokemon.name}
                </div>
              </Link>
              <button className='btn' onClick={() => handleDelete(pokemon)}>Delete</button>
              <button className='btn' onClick={() => setEditingPokemonId(id)}>Update</button>
              {editingPokemonId === id && (
                <form className='form' onSubmit={(event) => handleUpdateName(event, pokemon)}>
                  <input className='input'
                    type='text'
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                  <button className='btn' type='submit'>Apply</button>
                </form>
              )}
            </li>
          );
        })}
      </ul>
      <div className='btns'>
        <button ><Link to={Postanddelete}>post and Delete</Link></button>
      </div>
    </div>
  );
};

export default PokemonList;
