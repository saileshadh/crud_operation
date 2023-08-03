import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './components/Style.css';
import Postanddelete from './components/Postanddelete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path='/postanddelete' element={<Postanddelete/>}/>
      </Routes>
    </Router>
  );
}

export default App;
