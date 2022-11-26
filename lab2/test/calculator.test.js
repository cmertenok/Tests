const {Parse, WriteToFile, CalculatorState, HandleKeyPress, Calculate} = require("../calculator");
const fs = require('fs');

describe('Calculator', () => {
  it('Parse file to arr "123+456="', () => {
    const parse = JSON.stringify(Parse('./test/input/test123+456.txt'))
    expect(parse).toEqual(JSON.stringify(['1', '2','3','+','4','5','6','=']))
  })

  it('Parse file to arr "123+"', () => {
    const parse = JSON.stringify(Parse('./test/input/test123+.txt'))
    expect(parse).toEqual(JSON.stringify(['1', '2','3','+']))
  })

  it('Parse file to arr "empty file"', () => {
    const parse = JSON.stringify(Parse('./test/input/testEmpty.txt'))
    expect(parse).toEqual(JSON.stringify(['']))
  })

  it('Write to file "11"', () => {
    WriteToFile('./test/input/testWrite.txt', '1 1')
    const parseDate = JSON.stringify(Parse('./test/input/testWrite.txt'))
    expect(parseDate).toBe(JSON.stringify(['1', '1']))
  })

  it('Write to file "579"', () => {
    WriteToFile('./test/output/OUTtest123+456.txt', '5 7 9')
    const parseDate = JSON.stringify(Parse('./test/output/OUTtest123+456.txt'))
    expect(parseDate).toBe(JSON.stringify(['5', '7', '9']))
  })

  it('Craete Calculator State', () => {
    const state = new CalculatorState()
    expect(state).toEqual({screen: '', first_number: '',op: '',start_second_number: false})
  })

  it('HandleKeyPress "123+456="', () => {
    const state = new CalculatorState()
    const arr = ['1','2','3','+','4','5','6','=']
    arr.forEach(elem => {
      HandleKeyPress(state, elem)
    })
    expect(state).toEqual({"first_number": "123", "op": "+","screen": 579, "start_second_number": true,})
  })

  it('HandleKeyPress "123"', () => {
    const state = new CalculatorState()
    const arr = ['1','2','3']
    arr.forEach(elem => {
      HandleKeyPress(state, elem)
    })
    expect(state).toEqual({"first_number": "123", "op": "","screen": "123", "start_second_number": false,})
  })

  it('HandleKeyPress "5"', () => {
    const state = new CalculatorState()
    const arr = ['5']
    arr.forEach(elem => {
      HandleKeyPress(state, elem)
    })
    expect(state).toEqual({"first_number": "5", "op": "","screen": "5", "start_second_number": false,})
  })

  it('HandleKeyPress "123+45"', () => {
    const state = new CalculatorState()
    const arr = ['1','2','3','+','4','5']
    arr.forEach(elem => {
      HandleKeyPress(state, elem)
    })
    expect(state).toEqual({"first_number": "123", "op": "+","screen": "45", "start_second_number": true,})
  })

  it('HandleKeyPress "123+45="', () => {
    const state = new CalculatorState()
    const arr = ['1','2','3','+','4','5','=']
    arr.forEach(elem => {
      HandleKeyPress(state, elem)
    })
    expect(state).toEqual({"first_number": "123", "op": "+","screen": 168, "start_second_number": true,})
  })

  it('Calculate "100:3"', () => {
    const nameFile = 'test100_3.txt';
    Calculate(`./test/input/${nameFile}`, `./test/output/OUT${nameFile}`)
    const answer = Parse(`./test/output/OUT${nameFile}`)
    expect(answer).toEqual([ '33' ])
  })

  it('Calculate "9:10"', () => {
    const nameFile = 'test9_10.txt';
    Calculate(`./test/input/${nameFile}`, `./test/output/OUT${nameFile}`)
    const answer = Parse(`./test/output/OUT${nameFile}`)
    expect(answer).toEqual([ '0' ])
  })

  it('Calculate "Empty"', () => {
    const nameFile = 'testEmpty.txt';
    Calculate(`./test/input/${nameFile}`, `./test/output/OUT${nameFile}`)
    const answer = Parse(`./test/output/OUT${nameFile}`)
    expect(answer).toEqual([ '0' ])
  })

  it('Calculate "10*22"', () => {
    const nameFile = 'test10_22.txt';
    Calculate(`./test/input/${nameFile}`, `./test/output/OUT${nameFile}`)
    const answer = Parse(`./test/output/OUT${nameFile}`)
    expect(answer).toEqual([ '220' ])
  })
})