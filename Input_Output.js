const fs = require("fs");

const parseInput = (fileName) => {
  const input = fs.readFileSync(fileName, "utf8");
  const lines = input.split("\n");
  const width = parseInt(lines[0].split(" ")[1], 10);
  const height = parseInt(lines[0].split(" ")[0], 10);
  const gameField = lines.slice(1, height + 1);
  return { width, height, gameField };
};
const inputData = parseInput("input.txt");


const writeOutput = (data) => {
  fs.writeFileSync("output.txt", data);
};

module.exports = { inputData, writeOutput };
