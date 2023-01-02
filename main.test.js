const {runProgram} = require("./main");
let results = [];
let output = {
  showResult(res) {
    results.push(res);
  }
}

let fileSystem = {
  checkFile(fileName) {
    throw new Error("Unexpected call");
  },

  readFile(fileName) {
    throw new Error("Unexpected call");
  }
}

describe("test for runProgram function", () => {
  test("shows message how to run the game", () => {
    results.length = 0;
    runProgram('', fileSystem, output);

    expect(results[0]).toEqual("Run main.js together with txt args name");
    expect(results.length).toEqual(1);
  });

  test("checks file format", () => {
    results.length = 0;
    runProgram('input', fileSystem, output);

    expect(results[0]).toEqual("Enter only txt file");
    expect(results.length).toEqual(1);
  });

  test("checks txt file existence", () => {
    results.length = 0;
    let fileSystem = {
      checkFile(fileName) {
        return false;
      },
    
      readFile(fileName) {
        throw new Error("Unexpected call");
      }
    }
    runProgram('example.txt', fileSystem, output);

    expect(results[0]).toEqual("file doesn't exist");
    expect(results.length).toEqual(1);
  });

  test("checks if data in file is correct", () => {
    results.length = 0;
    let fileSystem = {
      checkFile(fileName) {
        return true;
      },
    
      readFile(fileName) {
        return "7 1\n...."
      }
    }
    runProgram('example.txt', fileSystem, output);

    expect(results[0]).toEqual("Wrong data in txt file");
    expect(results.length).toEqual(1);
  });

  test("outputs final result", () => {
    results.length = 0;
    let fileSystem = {
      checkFile(fileName) {
        return true;
      },
    
      readFile(fileName) {
        return '4 4\n.p.p\n..#.\n####\n....';
      }
    }
    runProgram('example.txt', fileSystem, output);

    expect(results[0]).toEqual('....\n.p#p\n####\n....');
    expect(results.length).toEqual(1);
  });
});