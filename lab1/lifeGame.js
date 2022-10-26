'use strict'

const fs = require('fs')

const start = (inputName, outName) => {
  writeInFile(outName, game(readFile(inputName)).join('\n'));
};
  
const readFile = inputName => {
    try {
      return fs.readFileSync(inputName).toString()
  } catch (error) {
      throw new Error(`This file ${inputName} does not exist -> ${error}`);
  }
}

const writeInFile = (pathToFile, data) => {
  try {
      fs.writeFileSync(pathToFile, data);
  } catch (error) {
      throw new Error(`Error writing to file -> ${error}`);
  }
}

function game(data) {
  let [generation, sizeArr, ...board] = data.split('\n');

  board = board.map((elem) => elem.split(''));
  const [columnLen, rowLen] = sizeArr.split(' ');

  while(generation > 0){
    const arrCordcell = aliveCellPos(columnLen,rowLen, board);
    const nextGeneration = createEmptyArr(columnLen, rowLen);

    board = gameLoop(arrCordcell, board, {columnLen, rowLen}, nextGeneration);
    generation -= 1;
  }
  return board = board.map(elem => elem.join(''))
}

function aliveCellPos(columnLen, rowLen, board){
  const aliveCellPos = [];
  for(let row = 0; row < rowLen; row++){
    for(let column = 0; column < columnLen; column++){
      if(board[row][column] === 'x'){ aliveCellPos.push({column, row}); }
    }
  }
  return aliveCellPos
}

function createEmptyArr(columnLen, rowLen){
  const nextGeneration = []
  for(let i = 0; i < +rowLen; i++){
    let arr = [];
    for(let j = 0; j < +columnLen; j++){ arr.push('.') }
    nextGeneration.push(arr);
  }
  return nextGeneration;
}

function clearArr(arrDot){
 return [...new Set(
    arrDot.map(item => JSON.stringify(
      Object.keys(item).sort().reduce((obj, value) => (obj[value] = item[value], obj), {})
      ))
  )].map(item => JSON.parse(item));
}

function gameLoop(cordArr, board, sizeObj, nextGeneration, flag = false){
  const arrCord = flag ? clearArr(cordArr) : cordArr;
  const arrDot = [];

  for (let index = 0; index < arrCord.length; index++) {
    const elem = arrCord[index];
    let count = 0;

    for (let rowInd = -1 ; rowInd <= 1; rowInd++) {
      let elemRow = elem.row + rowInd < 0 ? sizeObj.rowLen - 1 : elem.row + rowInd;
      elemRow = elemRow > sizeObj.rowLen - 1 ? 0 : elemRow;

      for (let colInd = -1; colInd <= 1; colInd++) {
        let elemCol = elem.column + colInd < 0 ? sizeObj.columnLen - 1 : elem.column + colInd;
        elemCol = elemCol > sizeObj.columnLen - 1 ? 0 : elemCol;
        if(!(elemRow === elem.row && elemCol === elem.column)){
          if(board[elemRow][elemCol] === 'x'){ count += 1; }
          else if ( !flag ){arrDot.push({row: elemRow, column: elemCol});}
        }
      }
    }
    if(count > 1 && count < 4 && !flag){
      nextGeneration[elem.row][elem.column] = 'x';
    }
    if(count === 3 && flag){
      nextGeneration[elem.row][elem.column] = 'x';
    }
  }

  return flag ? nextGeneration : gameLoop(arrDot, board, sizeObj, nextGeneration, true);
}

start('./test/input/test1.txt', './test/out/outTest1.txt');
start('./test/input/test2.txt', './test/out/outTest2.txt');
start('./test/input/test3.txt', './test/out/outTest3.txt');

module.exports = {start, readFile, writeInFile ,aliveCellPos, createEmptyArr, clearArr, gameLoop, game};
