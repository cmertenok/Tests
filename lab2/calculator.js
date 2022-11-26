const fs = require('fs');

const Parse = inputFileName => {
  try {
      return fs.readFileSync(inputFileName).toString().split(' ')
  } catch (error) {
      throw new Error(`This file ${inputFileName} does not exist -> ${error}`);
  }
}

const WriteToFile = (pathToFile, data) => {
  try {
      fs.writeFileSync(pathToFile, data.toString());
  } catch (error) {
      throw new Error(`Error writing to file -> ${error}`);
  }
}

class CalculatorState {
  constructor(){
    this.screen = '';
    this.first_number = '';
    this.op = '';
    this.start_second_number = false;
  }
}

function HandleKeyPress(obj, elem) {
  if(elem === '=' && !!obj.start_second_number){
    obj.screen = Math.floor(eval(`${obj.first_number}${obj.op}${obj.screen}`))
  } else if(isNaN(+elem)){
    obj.start_second_number = true
    obj.op = elem
    obj.screen = ''
  } else if(!obj.start_second_number){
    obj.first_number += elem
    obj.screen += elem
  } else { obj.screen += elem }

}

function Calculate(pathRead, pathWrite){
  const obj = new CalculatorState()
  const arrData = Parse(pathRead);
  const arrOp = ['=', '+', '-', '*', '/'];

  try{
    if(arrData.length === 1 && arrData[0] === ''){ obj.screen = '0' }
    else {
      arrData.forEach(elem => {
        if(!isNaN(+elem) && typeof +elem === 'number' || arrOp.includes(elem)){
          HandleKeyPress(obj, elem)
        } else {
            throw new Error(`This element: ${elem} doesn't fit the condition!`);
        }
       })
    }

    obj.screen === '' ? obj.screen = obj.first_number : ''
    WriteToFile(pathWrite, obj.screen)
  }
  catch(e){
    console.error(e)
  }
}

fs.readdirSync('./test/input/').forEach(inputPath => {
  Calculate('./test/input/' + inputPath, `./test/output/OUT${inputPath}`)
})

module.exports = {Parse, WriteToFile, CalculatorState, HandleKeyPress, Calculate}