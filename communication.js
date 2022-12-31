const { inputData, writeOutput } = require("./input_output");
const { Field, renderField, findFigure, findLandscape } = require("./logic");

const TetrisField = new Field(
  inputData.width,
  inputData.height,
  findFigure(inputData.gameField),
  findLandscape(inputData.gameField)
);

const finalField = renderField(TetrisField);
writeOutput(finalField);
