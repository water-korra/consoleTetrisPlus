const fs = require("fs");

const parseInput = (input) => {
  const lines = input.split("\n");
  const width = parseInt(lines[0].split(" ")[1]);
  const height = parseInt(lines[0].split(" ")[0]);
  const fieldSize = lines[0];
  const gameField = lines.slice(1);
  return { width, height, gameField, fieldSize };
};

const checkInputData = (data) => {
  const gameSymbols = ["p", ".", "#"];
  if (/^\d+ \d+$/.test(data.fieldSize) === false) {
    throw new Error("Not correct field size numbers")
  }
  for (let element of data.gameField) {
    if (
      data.width < 1 ||
      data.height < 1 ||
      element.length !== data.width ||
      data.gameField.length !== data.height
    ) {
      throw new Error("field was not made according to width and height")
    }
  }
  for (let i = 0; i < data.gameField.length; i++) {
    for (let x = 0; x < data.gameField[i].length; x++) {
      if (gameSymbols.includes(data.gameField[i][x]) === false) {
        throw new Error("not correct symbol")
      }
    }
  }
};

const writeOutput = (data) => {
  fs.writeFileSync("output.txt", data);
};

module.exports = {  writeOutput , parseInput, checkInputData};