class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
//тут коориданты решеток , p
class Field {
  constructor(width, height, figure, landscape) {
    this.width = width;
    this.height = height;
    this.figure = figure;
    this.landscape = landscape;
  }
}
//тут понятнов все

const findFigure = (gameField) => {
  const figure = [];
  for (let line = 0; line < gameField.length; line++) {
    for (let column = 0; column < gameField[line].length; column++) {
      if (gameField[line][column] === "p") {
        figure.push(new Coordinates(column, line));
      }
    }
  }
  return figure;
};

//записывает координаты всех p

const findLandscape = (gameField) => {
  const landscape = [];
  for (let line = 0; line < gameField.length; line++) {
    for (let column = 0; column < gameField[line].length; column++) {
      if (gameField[line][column] === "#") {
        landscape.push(new Coordinates(column, line));
      }
    }
  }
  return landscape;
};
//записывает коориднаты всех решеток

function tetrisStep(field) {
  let figureDown = true;

  for (let i = 0; i < field.figure.length; i++) {
    for (let k = 0; k < field.landscape.length; k++) {
      if (
        field.figure[i].x === field.landscape[k].x &&
        field.figure[i].y + 1 === field.landscape[k].y
      ) {
        figureDown = false;
      }
    }
  }
  for (let i = 0; i < field.figure.length; i++) {
    if (field.figure[i].y === field.height - 1) {
      figureDown = false;
    }
  }

  if (figureDown === true) {
    for (let i = 0; i < field.figure.length; i++) {
      field.figure[i].y += 1;
    }
  }
  return field;
}
//перемещает фигуру на одну кординату вниз

const playTetris = (field) => {
  for (let i = 0; i < field.height; i++) {
    field = tetrisStep(field);
  }
  return field;
};

//перемищает фигуру до соприкосновения с решетками

const renderField = (field) => {
  field = playTetris(field);
  const newArray = [];
  for (let i = 0; i < field.height; i++) {
    newArray.push([]);
    for (let k = 0; k < field.width; k++) {
      newArray[i].push(".");
    }
  }

  for (let i = 0; i < field.figure.length; i++) {
    newArray[field.figure[i].y][field.figure[i].x] = "p";
  }

  for (let i = 0; i < field.landscape.length; i++) {
    newArray[field.landscape[i].y][field.landscape[i].x] = "#";
  }

  for (let i = 0; i < field.height; i++) {
    newArray[i] = newArray[i].join("");
  }
  return newArray.join("\n");
};
//делает поле из точек, на нужные кординаты меняет точки на p и #

module.exports = { Field, renderField, findFigure, findLandscape };


