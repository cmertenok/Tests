'use strict'

const fs = require('fs');

class Files {
  parseInput(inputFile){
    try {
      return fs.readFileSync(`./test/input/${inputFile}`).toString().trim().split('\n');
    } catch (error) {
      throw new Error(`This file ${this.inputFile} does not exist -> ${error}`);
    }
  }

  writeFile(writeFile, data){
    try {
        fs.writeFileSync(writeFile, data.toString());
    } catch (error) {
        throw new Error(`Error writing to file -> ${error}`);
    }
  }

  viewDate(date){
    console.log(date)
  }
}

class Game{
  constructor(prop){
    this.width  = +prop.width;
    this.height = +prop.height;
    this.arrField  = prop.field.map(row => row.trim().split(''));
    this.arrFigures = this.searchField('p');
    this.arrLandscape = this.searchField('#');
  }

  searchField(elem){
    const arr = [];
    this.arrField.forEach((row, idxRow) => {
      row.forEach((point, idxCol) => {
        if(point === elem) arr.push([idxRow, idxCol]);
      })
    })
    return arr;
  }

  lastStep() {
    let flag = true;
    const str = JSON.stringify(this.arrLandscape);

    while_block: {
      do{
        const nextArrFigures = this.arrFigures.map(elem => [elem[0]+1, elem[1]]);
          for (let i = 0; i < nextArrFigures.length; i++) {
            const elem = JSON.stringify(nextArrFigures[i]);
            
            if(str.includes(elem) || elem.includes(`${this.height}`)) {
              flag = false;
              break while_block;
            }
          }
          this.arrFigures = nextArrFigures
      } while(flag)
    }
    return this.arrFigures
  }
 
  editeField() {
    this.lastStep();

    const strArrFigures = JSON.stringify(this.arrFigures);
    this.arrField = this.arrField.map((row, idxRow) => {
      return row.map((point, idxCol) => {
        const strCord = JSON.stringify([idxRow, idxCol])
        return strArrFigures.includes(strCord) ? 'p' : point === 'p' ? '.' : point
      });
    });

    return this.arrField.map(row => row.join('')).join('\n');
  }
}

class Communication {
  constructor(props){
    this.inputPath = props.inputPath;
    this.idx = props.idx;
    this.gameClass = '';
    this.fileSistem = props.fileClass;
  }

  createClassGame() {
    this.fileSistem.viewDate(`\nTEST ${this.idx + 1}. Name: ${this.inputPath}`);


    const date = JSON.parse(JSON.stringify(this.fileSistem.parseInput(this.inputPath))),
        [height, width] = date.shift().split(' '),
        field = date;
        
    this.gameClass = new Game({width, height, field});
    return this.gameClass
  }

  communClasses() {
    const pathOutput = `./test/output/OUT${this.inputPath}`,
    gameDate = this.gameClass.editeField();

    this.fileSistem.viewDate(gameDate);
    return this.fileSistem.writeFile(pathOutput, gameDate);
  }
}

function start(){
  fs.readdirSync('./test/input/').forEach((inputPath, idx) => {
    const comm = new Communication({inputPath, idx, fileClass: new Files()});
    comm.createClassGame();
    comm.communClasses();
  });
}

start()

module.exports = { Game, Communication, Files }