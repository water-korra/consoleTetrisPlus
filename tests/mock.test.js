const {
    runProgram
} = require("../game/main");
const fs = require("fs");
const exp = require("constants");

describe("test for runProgram function", () => {
    let outputClass = {
        showResult(gameResult) {
            console.log(gameResult);
        }
    }
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("if user didn't type arguments:", () => {
        //When
        jest.spyOn(outputClass, "showResult");
        runProgram("", fs, outputClass)

        //Then
        let messages = outputClass.showResult.mock
            .calls
        expect(messages.length)
            .toEqual(1);
        expect(messages[0][0])
            .toEqual(Messages.noArgs);
    });

    test("checks if input.txt file exists", () => {
        //When
        jest.spyOn(outputClass, "showResult");

        jest.spyOn(fs, "existsSync")
            .mockImplementation((path) => false);
        runProgram('example.txt', fs, outputClass)

        //Then
        let messages = outputClass.showResult.mock
            .calls;
        expect(messages.length)
            .toStrictEqual(1);
        expect(messages[0][0])
            .toStrictEqual(Messages
                .inputFileDoesNotExist);
    });

    test("check input file format", () => {
        //When
        jest.spyOn(outputClass, "showResult");
        jest.spyOn(fs, "existsSync")
            .mockImplementation((path) => true);
        jest
            .spyOn(fs, "readFileSync")
            .mockImplementation(
                (path, options) =>
                    "7 8\n..p.....\n"
            );
        runProgram('example.txt', fs, outputClass)

        //Then
        let messages = outputClass.showResult.mock
            .calls;
        expect(messages.length)
            .toStrictEqual(1);
        expect(messages[0][0])
            .toStrictEqual(Messages.inputFileIsWrong);
    });

    test("correct final result output", () => {
        //When
        jest.spyOn(outputClass, "showResult");

        jest.spyOn(fs, "existsSync")
            .mockImplementation((path) => true);
        jest
            .spyOn(fs, "readFileSync")
            .mockImplementation(
                (path, options) =>
                    "7 8\n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..#####"
            );

        runProgram('example.txt', fs, outputClass)
        //Then
        let messages = outputClass.showResult.mock
            .calls;
        expect(messages.length)
            .toStrictEqual(1);
        expect(messages[0][0])
            .toStrictEqual(Messages.gameResult);
    })

    test("correct steps result output", () => {
        //When
        jest.spyOn(outputClass, "showResult");

        jest.spyOn(fs, "existsSync")
            .mockImplementation((path) => true);
        jest
            .spyOn(fs, "readFileSync")
            .mockImplementation(
                (path, options) =>
                    "7 8\n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..#####"
            );

        runProgram('example.txt', fs, outputClass, "printSteps")
        //Then
        let messages = outputClass.showResult.mock
            .calls;
        console.log(messages);
        expect(messages.length)
            .toStrictEqual(3);
        expect(messages[0][0])
            .toStrictEqual(Messages.step0);
        expect(messages[1][0])
            .toStrictEqual(Messages.step1);
        expect(messages[2][0])
            .toStrictEqual(Messages.step2);
    })

    let Messages = {
        noArgs: `Hello. It's Tetris game. Please pass me me an input file. Example
> node tetris.js input.txt`,
        inputFileDoesNotExist: "File doesn't exist",
        inputFileIsWrong: "Wrong data in input file",
        falseGameResult: "incorrect final field",
        falseStepGameResult: "incorrect steps",
        gameResult:
          "........\n........\n..p.....\n.ppp....\n..p#....\n...#...#\n#..#####",
        stepResult:
        "Step0\n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..#####\n\nStep 1\n........\n..p.....\n.ppp....\n..p.....\n...#....\n...#...#\n#..#####\n\nStep 2\n........\n........\n..p.....\n.ppp....\n..p#....\n...#...#\n#..#####",
        step0: 'Step 0\n..p.....\n.ppp....\n..p.....\n........\n...#....\n...#...#\n#..#####',
        step1: ' \nStep 1\n........\n..p.....\n.ppp....\n..p.....\n...#....\n...#...#\n#..#####',
        step2: ' \nStep 2\n........\n........\n..p.....\n.ppp....\n..p#....\n...#...#\n#..#####'
      };
})
