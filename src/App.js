import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Game } from "./components/game";
import { Nav } from './components/nav-bar'
import { Leaderboards } from "./components/leaderboards";
import { Footer } from "./components/footer";
import './styles/styles.css'
 
const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Game />}/>
          <Route path='/leaderboards' element={<Leaderboards />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
