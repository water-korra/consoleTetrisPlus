'use strict';
const fs = require("fs")
const { inputData } = require("./input_output.js");
class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Field {
    constructor(width, height, figure, landscape) {
        this.width = width;
        this.height = height;
        this.figure = figure;
        this.landscape = landscape;
    }
}

const findFigure = (gameField) => {
    const figure = [];

    for (let line = 0; line < gameField.length; line++) {
        for (let column = 0; column < gameField[line].length; column++) {
            if (gameField[line][column] === 'p') {
                figure.push(new Coordinates(column, line));
            }
        }
    }

    return figure;
}
let figuresArray = findFigure(inputData.gameField);

const getLandscape = (gameField) => {
    const landscape = [];

    for (let line = 0; line < gameField.length; line++) {
        for (let column = 0; column < gameField[line].length; column++) {
            if (gameField[line][column] === '#') {
                landscape.push(new Coordinates(column, line));
            }
        }
    }

    return landscape;
}

let landscapeArray = getLandscape(inputData.gameField);

const TetrisField = new Field(
    inputData.width,
    inputData.height,
    figuresArray,
    landscapeArray
);

function tetrisStep(field) {
    let isMovable = true;

    //Check if figure is on landscape
    for (let i = 0; i < field.figure.length; i++) {
        for (let k = 0; k < field.landscape.length; k++) {
            if (field.figure[i].x === field.landscape[k].x &&
                field.figure[i].y + 1 === field.landscape[k].y) {
                isMovable = false;
            }
        }
    }

    //Check if figure is outside the field
    for (let i = 0; i < field.figure.length; i++) {
        if (field.figure[i].y === field.height - 1) {
            isMovable = false;
        }
    }

    if (isMovable === true) {
        for (let i = 0; i < field.figure.length; i++) {
            field.figure[i].y += 1;
        }
    }
    return field;
}
// console.log(tetrisStep(TetrisField));

const playTetris = (field) => {
    for (let i = 0; i < field.height; i++) {
        field = tetrisStep(field);
    }
    return field;
}
// console.log(playTetris(TetrisField));


const renderField = (field) => {
    field = playTetris(field);
    const newArray = [];
    for (let i = 0; i < field.height; i++) {
        newArray.push([]);
        for (let k = 0; k < field.width; k++) {
            newArray[i].push('.');
        }
    }

    for (let i = 0; i < field.figure.length; i++) {
        newArray[field.figure[i].y][field.figure[i].x] = 'p';
    }

    for (let i = 0; i < field.landscape.length; i++) {
        newArray[field.landscape[i].y][field.landscape[i].x] = '#';
    }

    for (let i = 0; i < field.height; i++) {
        newArray[i] = newArray[i].join('');
    }
    return newArray.join('\n');
}
const finalField = renderField(TetrisField)
// console.log(renderField(TetrisField));

module.exports = {finalField}
