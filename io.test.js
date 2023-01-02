const { writeOutput , parseInput, checkInputData}  = require("./io")

describe("test of part of io layer", () => {

  test("check if field from .txt file correctly parses to know width\n, height, field", () => {
    input = "5 4\n.ppp\n....\n....\n..#.\n####"
    expectedOutput = {
        width: 4,
        height: 5,
        gameField: [ '.ppp', '....', '....', '..#.', '####' ],
        fieldSize: '5 4'
      }
    expect(parseInput(input)).toEqual(expectedOutput)
  })

  test("check if we catch all error if input.txt file format is wrong", () => {
    input = {
      width: 4,
      height: 5,
      gameField: [ '.ppp', '....', '....', '..#.', '####' ],
      fieldSize: '5 4'
    }
    expectedOutput = undefined
    expect(checkInputData(input)).toEqual(expectedOutput)
  })

})

