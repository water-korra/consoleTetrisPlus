const fs = require("fs");

const {
  renderField,
  Field,
  findFigure,
  findLandscape,
  tetrisStep,
  getDifference,
} = require("./logic");


const { parseInput, checkInputData } = require("./io");
const args = process.argv;

let output = {
  showResult(gameResult) {
    console.log(gameResult);
  },
};

function runProgram(args, fs, output, param) {
  function checkFile(file) {
    return fs.existsSync(file)
  }
  function readFile(file) {
    const fileContent = fs.readFileSync(file, "utf-8")
    return fileContent
  }
  if (!args) {
    output.showResult(`Hello. It's Tetris game. Please pass me me an input file. Example
> node tetris.js input.txt`);
    return;
  }
  if (!checkFile(args)) {
    output.showResult("File doesn't exist");
    return;
  }

  let input = readFile(args)
  let inputData = parseInput(input);
  let initState;

  try {
    checkInputData(inputData);
  } catch (error) {
    initState = false;
  }

  if ((initState === false)) {
    output.showResult("Wrong data in input file");
    return
  }
  else {
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
    if (param === "printSteps") {
      output.showResult(`Step 0\n${startFieldString}`);
      for (let i = 0; i < steps; i++) {
        finalField = renderField(tetrisStep(TetrisField));
        output.showResult(` \nStep ${i + 1}\n${finalField}`);
      }
      return finalField
    }
    else {
      for (let i = 0; i < steps; i++) {
        finalField = renderField(tetrisStep(TetrisField));
      }
      output.showResult(finalField);
    }
  }
};

runProgram(args[2], fs, output, args[3])
module.exports = { runProgram }