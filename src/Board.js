import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let i = 0;i < nrows; i++){
      let cell = []
      for(let j=0;j < ncols; j++){
        cell.push(Math.random() > chanceLightStartsOn)
      }
      initialBoard.push(cell)
    }
    return initialBoard;
  }
  
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for(let row of board){
      if (row.includes(true)){
        return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      
      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      const copyBoard = [...oldBoard]

      flipCell(y, x, copyBoard);
      flipCell(y, x - 1, copyBoard);
      flipCell(y, x + 1, copyBoard);
      flipCell(y - 1, x, copyBoard);
      flipCell(y + 1, x, copyBoard);
      return copyBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  if(hasWon()){
    return(
      <div>
        <h1>You Win!</h1>
      </div>
    )
  }

  // make table board

  // TODO
  let table = []
  for(let i = 0;i < nrows; i++){
    let row = []
    for(let j=0;j < ncols; j++){
      row.push(<Cell key={`${i}-${j}`}
      coord={`${i}-${j}`}
      isLit={board[i][j]}
      flipCellsAroundMe={() => flipCellsAround(`${i}-${j}`)} />)
    }
    table.push(row)
  }
  


  return(
    <div>
      {table.map(row => <div>{row}</div>)}
    </div>
  )
}

export default Board;
