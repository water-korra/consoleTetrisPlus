const fs = require("fs");

const parseInput = (fileName) => {
  const input = fs.readFileSync(fileName, "utf8");
  const lines = input.split("\n");
  const width = parseInt(lines[0].split(" ")[1]);
  const height = parseInt(lines[0].split(" ")[0]);
  const fieldSize = lines[0];
  const gameField = lines.slice(1);
  return { width, height, gameField, fieldSize };
};

const inputData = parseInput("input.txt"); //widht,height,field parsed from input.txt

//function to check inputData  is correct
const checkInputData = (data) => { 
  let inputFileErrors = [];
  const gameSymbols = ["p", ".", "#"];
  if (/^\d+ \d+$/.test(data.fieldSize) === false) {
    inputFileErrors.push("Not correct field size numbers");
  }
  for (let element of data.gameField) {
    if (
      data.width < 1 ||
      data.height < 1 ||
      element.length !== data.width ||
      data.gameField.length !== data.height
    ) {
      inputFileErrors.push("field was not made according to width and height");
      break;
    }
  }
  for (let i = 0; i < data.gameField.length; i++) {
    for (let x = 0; x < data.gameField[i].length; x++) {
      if (gameSymbols.includes(data.gameField[i][x]) === false) {
        inputFileErrors.push("not correct symbol");
        break;
      }
    }
  }
  return inputFileErrors;
};

const checkedInputData = checkInputData(inputData);

const writeOutput = (data) => {
  fs.writeFileSync("output.txt", data);
};

//if data is correct program is working
if (checkedInputData.length === 0) {
  module.exports = { inputData, writeOutput };
} else {
  console.log(checkedInputData);
  process.exit();
}
