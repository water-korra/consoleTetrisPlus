const {  writeOutput, parseInput } = require("./input_output");
const { Field, renderField, findFigure, findLandscape } = require("./logic");
const inputData = parseInput("input.txt")
//запаршеное поле


const TetrisField = new Field(
  inputData.width,
  inputData.height,
  findFigure(inputData.gameField),
  findLandscape(inputData.gameField)
);
//объект класа с полем из логики
const finalField = renderField(TetrisField);
//подставляю в renderField из логики TetrisField
writeOutput(finalField);
//записывюа в output.txt

