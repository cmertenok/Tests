const {start, readFile, writeInFile ,aliveCellPos, createEmptyArr, clearArr, gameLoop, game} = require("../lifeGame");
const fs = require('fs');

describe('Game test', () => {
  it('Correct file entry', () => {
    start('./test/input/test1.txt', './test/out/outTest1.txt');
    const data = fs.readFileSync('./test/out/outTest1.txt').toString();
    expect(data).toBe('........\n........\n.xxx....\n........\n........');
  });

  it('Read file', () => {
    const data = readFile('./test/input/test1.txt');
    expect(data).toBe('3\n8 5\n........\n..x.....\n..x.....\n..x.....\n........');
  })

  it('Write file', () => {
    writeInFile('./test/out/outTest2.txt', 'Test');
    const data = fs.readFileSync('./test/out/outTest2.txt').toString();
    expect(data).toBe('Test')
  })

  it('Return array withe alive cells', () => {
    expect(JSON.stringify(aliveCellPos(2, 2, [['.', 'x'], ['x', '.']]))).toBe(JSON.stringify([{"column": 1, "row": 0}, {"column": 0, "row": 1}]))
  })

  it('Generate empty array', () => {
    expect(JSON.stringify(createEmptyArr(3, 3))).toBe(JSON.stringify([[".", ".", "."], [".", ".", "."], [".", ".", "."]]))
  })

  it('Clear repeate array', () => {
    const arrTest = [
      { row: 12, column: 5 }, { row: 12, column: 5 },
      { row: 3, column: 1 }, { row: 4, column: 1 },
      { row: 5, column: 5 }, { row: 5, column: 5 },
    ]
    expect(JSON.stringify(clearArr(arrTest))).toBe(JSON.stringify([{"column":5,"row":12},{"column":1,"row":3},{"column":1,"row":4},{"column":5,"row":5}]))
  })

  it('Return new board after one iteration', () => {
    const columnLen = 4;
    const rowLen = 4;
    const board = [['.','x','.','.'],['.','x','.','.'],['.','x','.','.'],['.','.','.','.'],];
    const arrCordcell = aliveCellPos(columnLen, rowLen, board);
    const nextGeneration = createEmptyArr(columnLen, rowLen);
    const arrAnswer = JSON.stringify([['.','.','.','.'],['x','x','x','.'],['.','.','.','.'],['.','.','.','.']]);

    expect(JSON.stringify(gameLoop(arrCordcell, board, {columnLen, rowLen}, nextGeneration))).toBe(arrAnswer)
  })

  it('Life loop of a board', () => {
    const data = '3\n8 5\n........\n..x.....\n..x.....\n..x.....\n........';
    const answer =  [ '........', '........', '.xxx....', '........', '........' ];
    expect(JSON.stringify(game(data))).toBe(JSON.stringify(answer))

  })
})
