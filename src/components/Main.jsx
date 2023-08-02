import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { Route, Link, useNavigate, Routes } from "react-router-dom";
import "./Style.css";
import Pokeinfo from "./Pokeinfo";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokeDex, setPokeDex] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    const data = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );
    setPokeData(data.sort((a, b) => a.id - b.id));
  };

  const handleDeletePokemon = (id) => {
    setPokeData((prevData) => prevData.filter((pokemon) => pokemon.id !== id));
    setPokeDex(null);
  };

  const handleSelectCard = (selectedPokemon) => {
    setPokeDex(selectedPokemon);
    setCurrentIndex(pokeData.findIndex((pokemon) => pokemon.id === selectedPokemon.id));
  };

  const handleUpdate = () => {
    if (currentIndex < pokeData.length - 1) {
      const nextPokemon = pokeData[currentIndex + 1];
      setPokeDex(nextPokemon);
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <div className="container">
      <div className="left-content">
        {loading ? <h1>Loading...</h1> : pokeData.length > 0 ? <Card pokemons={pokeData} onSelectCard={handleSelectCard} /> : null}
      </div>
      <div className="right-content">
        <Routes>
          <Route path="/Pokeinfo/:id" element={<Pokeinfo pokeData={pokeDex} onDelete={handleDeletePokemon} onUpdate={handleUpdate} setPokeDex={setPokeDex} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
