import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import Board from './Board.js';
import './App.css';

function App() {
  const [xVal, setX] = useState(1);
  const [yVal, setY] = useState(1);

  const changeSize = dir => e => {
    if(dir === "x"){
      setX(e.target.value)
    } else if(dir === "y"){
      setY(e.target.value)
    }
  }

  return (
    <div className="App">
      <input placeholder="X size" type="number" min="0" onChange={changeSize("x")} value={xVal}/>
      <input placeholder="Y size" type="number" min="0" onChange={changeSize("y")} value={yVal}/>
      <Board xVal={xVal} yVal={yVal}/>
    </div>
  );
}

export default App;
