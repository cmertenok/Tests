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
    this.arrSteps = [];
    this.arrField  = prop.field.map(row => row.trim().split(''));
    this.arrFigures = this.searchField('p');
    this.arrLandscape = this.searchField('#');
  }

  searchField(elem){
    const arr = [];
    this.arrField.forEach((row, indRow) => {
      row.forEach((point, indCol) => {
        if(point === elem) arr.push([indRow, indCol]);
      })
    })
    return arr;
  }

  editeField() {
    let flag = true,
        indStep = 0;
    const str = JSON.stringify(this.arrLandscape);

    while_block: {
      do{
        this.arrSteps.push(this.editNextStep(indStep))
        const nextArrFigures = this.arrFigures.map(elem => [elem[0]+1, elem[1]]);
          for (let i = 0; i < nextArrFigures.length; i++) {
            const elem = JSON.stringify(nextArrFigures[i]);
            
            if(str.includes(elem) || elem.includes(`${this.height}`)) {
              flag = false;
              break while_block;
            }
          }
          this.arrFigures = nextArrFigures;
          indStep++;
          
      } while(flag)
    }
    return this.arrSteps
  }

  editNextStep(indStep) {
    const strArrFigures = JSON.stringify(this.arrFigures);
    this.arrField = this.arrField.map((row, indRow) => {
      return row.map((point, indCol) => {
        const strCord = JSON.stringify([indRow, indCol])
        return strArrFigures.includes(strCord) ? 'p' : point === 'p' ? '.' : point
      });
    });

    return `Step ${indStep}: \n${this.arrField.map(row => row.join('')).join('\n')} \n`
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
    gameDate.forEach(elem => {
      this.fileSistem.viewDate(elem);
    });
    this.fileSistem.writeFile(pathOutput, gameDate.join('\n'));

    return gameDate;
  }
}

function start(path){
  fs.readdirSync(path).forEach((inputPath, idx) => {
    const comm = new Communication({inputPath, idx, fileClass: new Files()});
    comm.createClassGame();
    comm.communClasses();
  });
}

start('./test/input/')

module.exports = { Game, Communication, Files , start}