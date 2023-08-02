import React, { useEffect, useState } from 'react';
import { Link, Route } from "react-router-dom";
import './Style.css';
import Card from './Card';
import axios from 'axios';
import Pokeinfo from './Pokeinfo';

export default function Main() {

    const url = "https://pokeapi.co/api/v2/pokemon/"
    const [data, setData] = useState([]);
    const [pokeDex, setPokeDex] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchInfo = async () => {
        const res = await axios.get(url);
        console.log(res.data)
        getPokemon(res.data.results);
    };
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            setData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }
    const handleDeletePokemon = (id) => {
        setData((prevData) => prevData.filter((pokemon) => pokemon.id !== id));
        setPokeDex(null);
    };
    const handleUpdate = () => {
        const currentIndex = data.findIndex((pokemon) => pokemon.id === pokeDex.id);
        if (currentIndex < data.length - 1) {
            const nextPokemon = data[currentIndex + 1];
            setPokeDex(nextPokemon);
            setCurrentIndex(currentIndex + 1);
        }
    }


    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className='container'>
            <div>
                <Card pokemons={data} info={poke => setPokeDex(poke)} />
            </div>
            <div>
                <Pokeinfo data={pokeDex} onDelete={handleDeletePokemon} onUpdate={handleUpdate} />
            </div>
        </div>
    );
}
