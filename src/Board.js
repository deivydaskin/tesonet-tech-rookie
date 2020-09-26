import React, { useState, useEffect, useRef } from 'react';
import Blank from './blank.png'
import Food  from './food.png'

const Board = ({xVal, yVal}) => {

const width=xVal;
const height=yVal;    
let initialRows = [];
for(let i=0; i<height; i++) {
    initialRows.push([]);
    for(let k=0; k<width; k++) {
        initialRows[i].push('blank');
    }
}

const [rows, setRows] = useState(initialRows);
const [food, setFood] = useState({x: 0, y: 0});
const [direction, setDirection] = useState('right');

const display = () => {
    const newRows = initialRows;
    newRows[food.x][food.y]='food';
    setRows(newRows);
}


const move = (dir) => {
    let location = {};
    if(dir == "right"){
        if(direction === "right"){
            setDirection("down")
        } else if(direction === "down"){
            setDirection("left")
        } else if(direction === "left"){
            setDirection("up")
        } else if(direction === "up"){
            setDirection("right")
            
        }
        document.getElementById('image').style.transform = "rotate(90deg)";
        location = {
            x: food.x,
            y: food.y
        }
    } else if(dir == "forward"){
        if(direction === "right"){
            location = {
                x: food.x,
                y: food.y + 1
            }
        } else if(direction === "down"){
            location = {
                x: food.x + 1,
                y: food.y
            }
        } else if(direction === "left"){
            location = {
                x: food.x,
                y: food.y - 1
            }
        } else if(direction === "up"){
            location = {
                x: food.x - 1,
                y: food.y
            }
        }
        
    } else {
        location = {
            x: food.x,
            y: food.y
        }
    }
    setFood(location)
    
    display();
}


useInterval(move, 100);

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const displayRows = rows.map(row => 
    <li>
        {row.map(e => {
            switch(e) {
                case 'blank':
                   return <img src={Blank}/>
                case 'food':
                    return <img src={Food} id="image"/>      
                      }
                 })
        }
    </li>
    );

return (
    <div>
        <div>
            <button onClick={() => move("right")}>Turn Right</button>
            <button onClick={() => move("forward")}>MoveForward</button>
        </div>
    <div >
        <ul style={{width:'500px', padding:'0px'}} class='img500'>
        { displayRows }
        </ul>
    </div>
    </div>
)
}

export default Board;