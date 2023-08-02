import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Pokeinfo from "./components/Pokeinfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Pokeinfo/:id" element={<Pokeinfo />} />
      </Routes>
    </Router>
  );
}

export default App;
