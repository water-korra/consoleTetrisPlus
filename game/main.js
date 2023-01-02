const fs = require("fs");

const { renderField, Field, findFigure, findLandscape } = require("./logic");
const { writeOutput, parseInput, checkInputData } = require("./io");
const args = process.argv

const main = (args) => {
    let fileSystem = {
        checkFile(file) {
            return fs.existsSync(file);
        },
        readFile(fileName){
            const fileContent = fs.readFileSync((fileName), "utf-8")
            return fileContent
        }
    };
    let output = {
        showResult(gameResult) {
            console.log(gameResult);
        }
    };
    runProgram(args[2], fileSystem, output);
};

const runProgram = (args, fileSystem, output) => {
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

    let input = fileSystem.readFile(args)
    let inputData =  parseInput(input)
    let initState

    try{
        checkInputData(inputData)
    } catch(error) {
        initState = false
    }
    
    if(initState === false){
        output.showResult("Wrong data in txt file")
    }
    else{
        let TetrisField = new Field(
            inputData.width,
            inputData.height,
            findFigure(inputData.gameField),
            findLandscape(inputData.gameField)
        );
        let finalField = renderField(TetrisField);
        output.showResult(finalField);
        writeOutput(finalField);
        
    }
};
main(args);

module.exports = {runProgram}