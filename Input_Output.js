const fs = require("fs")

const parseInput = (fileName) => {
    const input = fs.readFileSync(fileName, 'utf8');
    const lines = input.split('\n');
    const width = parseInt(lines[0].split(' ')[1], 10);
    const height = parseInt(lines[0].split(' ')[0], 10);
    const startingField = lines.slice(1,height)
    // return [fieldHeight,fieldWidth,field]
    return {width, height,startingField}
}

const inputData = parseInput("input.txt")
module.exports = {inputData}

console.log(inputData);