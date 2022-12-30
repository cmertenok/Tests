const { Game, Communication, Files , start} = require("../tetris++");
const fs = require('fs');

class MockFiles {
  result = '';
  boards = {
    1: `7 8\n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..#####`.split('\n'),
    2: `5 6\n..p...\n##p.##\n##pp##\n##..##\n##..##`.split('\n'),
  }

  parseInput = jest.fn((boardsNum) => this.boards[boardsNum]);

  writeFile = jest.fn((writeFile, data) => this.result = data);

  viewDate = jest.fn((date) => console.log(date))
}

describe('Tetris testing:', () => {
  const mockFileSystem = new MockFiles();

  function initComm(inputPath, idx, fileClass) {
    return new Communication({ inputPath, idx, fileClass })
  }

  function json(arr) {
    return JSON.stringify(arr).trim()
  }

  beforeEach(() => {
    mockFileSystem.result = '';
  });

  describe('Testing file #1', () => {
    const path = 1;
    const idx = 1;
    const comm = initComm(path, idx, mockFileSystem);

    it('Should return correct array figures', () => {
      const game = comm.createClassGame();
      const answer = {
        width:8,
        height:7,
        arrSteps:[],
        arrField: [[".",".","p",".",".",".",".","."],[".","p","p","p",".",".",".","."],
                   [".",".","p",".",".",".",".","."],[".",".",".",".",".",".",".","."],
                   [".",".",".","#",".",".",".","."],[".",".",".","#",".",".",".","#"],
                   ["#",".",".","#","#","#","#","#"]],
        arrFigures:[[0,2],[1,1],[1,2],[1,3],[2,2]],
        arrLandscape:[[4,3],[5,3],[5,7],[6,0],[6,3],[6,4],[6,5],[6,6],[6,7]]
      };
      expect(json(game)).toBe(json(answer))
    })
    
    it('Should return correct array figures', () => {
      const game = comm.createClassGame();
      const arrFigures = game.searchField('p');
      const answer = [[ 0, 2 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 2, 2 ]];
      expect(json(arrFigures)).toBe(json(answer))
    })

    it('Should return correct array landscape', () => {
      const game = comm.createClassGame();
      const arrLandscape = game.searchField('#');
      const answer = [[4,3],[5,3],[5,7],[6,0],[6,3],[6,4],[6,5],[6,6],[6,7]];
      expect(json(arrLandscape)).toBe(json(answer))
    })

    it('Should return correct first step', () => {
      const game = comm.createClassGame();
      const lastStep = game.editNextStep(0);
      const arrAnswer = `Step 0: \n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..##### \n`;
      expect(json(lastStep)).toBe(json(arrAnswer))
    })

    it('Should return correct editef field', () => {
      const game = comm.createClassGame();
      const editeField = game.editeField();
      const arrAnswer = ["Step 0: \n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..##### \n","Step 1: \n........\n..p.....\n.ppp....\n..p.....\n...#....\n...#...#\n#..##### \n", "Step 2: \n........\n........\n..p.....\n.ppp....\n..p#....\n...#...#\n#..##### \n"];
      expect(json(editeField)).toBe(json(arrAnswer))
    })

    it('Should return correct write file', () => {
      comm.createClassGame();
      const writeFile = comm.communClasses();
      const arrAnswer = ["Step 0: \n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..##### \n","Step 1: \n........\n..p.....\n.ppp....\n..p.....\n...#....\n...#...#\n#..##### \n", "Step 2: \n........\n........\n..p.....\n.ppp....\n..p#....\n...#...#\n#..##### \n"];
     expect(json(writeFile)).toBe(json(arrAnswer))
    })
  })

  describe('Testing file #2', () => {
    const path = 2;
    const idx = 2;
    const comm = initComm(path, idx, mockFileSystem);

    it('Should return correct array figures', () => {
      const game = comm.createClassGame();
      const answer = {
        width:6,
        height:5,
        arrSteps: [],
        arrField: [[".",".","p",".",".","."],["#","#","p",".","#","#"],
                   ["#","#","p","p","#","#"],["#","#",".",".","#","#"],
                   ["#","#",".",".","#","#"]],
        arrFigures:[[0,2],[1,2],[2,2],[2,3]],
        arrLandscape:[[1,0],[1,1],[1,4],[1,5],[2,0],[2,1],[2,4],[2,5],[3,0],[3,1],[3,4],[3,5],[4,0],[4,1],[4,4],[4,5]]
      }
      expect(json(game)).toBe(json(answer))
    })
    
    it('Should return correct array figures', () => {
      const game = comm.createClassGame();
      const arrFigures = game.searchField('p');
      const answer = [[0,2],[1,2],[2,2],[2,3]];
      expect(json(arrFigures)).toBe(json(answer))
    })

    it('Should return correct array landscape', () => {
      const game = comm.createClassGame();
      const arrLandscape = game.searchField('#');
      const answer = [[1,0],[1,1],[1,4],[1,5],[2,0],[2,1],[2,4],[2,5],[3,0],[3,1],[3,4],[3,5],[4,0],[4,1],[4,4],[4,5]];
      expect(json(arrLandscape)).toBe(json(answer))
    })

    it('Should return correct first step', () => {
      const game = comm.createClassGame();
      const lastStep = game.editNextStep(0);
      const arrAnswer = `Step 0: \n..p...\n##p.##\n##pp##\n##..##\n##..## \n`;
      expect(json(lastStep)).toBe(json(arrAnswer))
    })

    it('Should return correct editef field', () => {
      const game = comm.createClassGame();
      const editeField = game.editeField();
      const arrAnswer = ["Step 0: \n..p...\n##p.##\n##pp##\n##..##\n##..## \n","Step 1: \n......\n##p.##\n##p.##\n##pp##\n##..## \n","Step 2: \n......\n##..##\n##p.##\n##p.##\n##pp## \n"]
      expect(json(editeField)).toBe(json(arrAnswer))
    })

    it('Should return correct write file', () => {
      comm.createClassGame();
      const writeFile = comm.communClasses();
      const arrAnswer = ["Step 0: \n..p...\n##p.##\n##pp##\n##..##\n##..## \n","Step 1: \n......\n##p.##\n##p.##\n##pp##\n##..## \n","Step 2: \n......\n##..##\n##p.##\n##p.##\n##pp## \n"]
      expect(json(writeFile)).toBe(json(arrAnswer))
    })
  })
})