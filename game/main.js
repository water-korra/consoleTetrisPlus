const fs = require("fs");

const {
  renderField,
  Field,
  findFigure,
  findLandscape,
  tetrisStep,
  getDifference,
} = require("./logic");
const {  parseInput, checkInputData } = require("./io");
const args = process.argv;

const main = (args) => {
  let fileSystem = {
    checkFile(file) {
      return fs.existsSync(file);
    },
    readFile(fileName) {
      const fileContent = fs.readFileSync(fileName, "utf-8");
      return fileContent;
    },
  };
  let output = {
    showResult(gameResult) {
      console.log(gameResult);
    },
  };
  runProgram(args[2], fileSystem, output, args[3]);
};

const runProgram = (args, fileSystem, output, param) => {
  let regEx = /^.+\.txt$/;
  if (!args) {
    output.showResult("Run main.js together with txt args name");
    return;
  }
  if (!regEx.test(args)) {
    output.showResult("Enter only txt file");
    return;
  }
  if (!fileSystem.checkFile(args)) {
    output.showResult("file doesn't exist");
    return;
  }

  let input = fileSystem.readFile(args);
  let inputData = parseInput(input);
  let initState;

  try {
    checkInputData(inputData);
  } catch (error) {
    initState = false;
  }

  if ((initState = false)) {
    output.showResult("Wrong data in txt file");
    return;
  }

  let TetrisField = new Field(
    inputData.width,
    inputData.height,
    findFigure(inputData.gameField),
    findLandscape(inputData.gameField)
  );
  let startField = new Field(
    inputData.width,
    inputData.height,
    findFigure(inputData.gameField),
    findLandscape(inputData.gameField)
  );
  const startFieldString = renderField(startField);

  let steps = getDifference(startField, TetrisField);
  let finalField;
  if(param === "printSteps") {
      output.showResult(startFieldString);
      for (let i = 0; i < steps; i++) {
        finalField = renderField(tetrisStep(TetrisField));
        output.showResult(finalField);
      }
      return finalField
    } 
    else {
      for (let i = 0; i < steps; i++) {
        finalField = renderField(tetrisStep(TetrisField));
      }
      output.showResult(finalField);
    }
};
main(args);

module.exports = { runProgram  };
