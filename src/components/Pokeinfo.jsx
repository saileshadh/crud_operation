import React from "react";
import { useParams, Link } from "react-router-dom";

const Pokeinfo = ({ pokeData, onDelete, onUpdate, setPokeDex }) => {
  const { id } = useParams();
  if (!pokeData) {
    return <div>Data not available</div>;
  }

  const currentIndex = pokeData.findIndex((pokemon) => pokemon.id.toString() === id);

  if (currentIndex === -1) {
    return <div>Pokemon not found</div>;
  }

  const currentPokemon = pokeData[currentIndex];
  const { name } = currentPokemon;

  const handleUpdate = () => {
    if (currentIndex < pokeData.length - 1) {
      const nextPokemon = pokeData[currentIndex + 1];
      setPokeDex(nextPokemon);
    }
  };

  return (
    <>
      <h1>name: {name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt={name}
      />
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      <div>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};

export default Pokeinfo;
