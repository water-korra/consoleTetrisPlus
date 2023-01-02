const {renderField, Field, findFigure, findLandscape, playTetris, tetrisStep } = require("./logic");

describe("logic layes test", () => {
    test("findFigure function finds p(figure) coordinates in field", () => {
        input = [ '.p.p', '..#.', '####', '....' ]
        expectedOutput = [ 
            { x: 1, y: 0 },
            { x: 3, y: 0 } ]
        expect(findFigure(input)).toEqual(expectedOutput)
    })

    test("findLandscapre function finds #(landscapre) coordinates in field", () => {
        input = [ '.p.p', '..#.', '####', '....' ]
        expectedOutput = 
        [
             { x: 2, y: 1 },
             { x: 0, y: 2 },
             { x: 1, y: 2 },
             { x: 2, y: 2 },
             { x: 3, y: 2 }
          ]
        expect(findLandscape(input)).toEqual(expectedOutput)
    })
    
    test("figure coordinates move one step down if doesn't colide with landscapre", () => {
        input = {
            width: 4,
            height: 4,
            figure: [  { x: 1, y: 0 },  { x: 3, y: 0 } ],
            landscape: [
               { x: 2, y: 1 },
               { x: 0, y: 2 },
               { x: 1, y: 2 },
               { x: 2, y: 2 },
               { x: 3, y: 2 }
            ]
          }
        expectedOutput =  {
        width: 4,
        height: 4,
        figure: [  { x: 1, y: 1 },  { x: 3, y: 1 } ],
        landscape: [
           { x: 2, y: 1 },
           { x: 0, y: 2 },
           { x: 1, y: 2 },
           { x: 2, y: 2 },
           { x: 3, y: 2 }
        ]}
        expect(tetrisStep(input)).toEqual(expectedOutput)
    })

    test("figure moved down if it doesn't colid with landscape", () => {
        input = {
            width: 4,
            height: 5,
            figure: [  { x: 1, y: 0 }, {x: 2, y: 0} ,{ x: 3, y: 0 } ],
            landscape: [
               { x: 2, y: 3 },
               { x: 0, y: 4 },
               { x: 1, y: 4 },
               { x: 2, y: 4 },
               { x: 3, y: 4 },
            ]
          }
        expectedOutput =  {
        width: 4,
        height: 5,
        figure: [  { x: 1, y: 2 }, {x: 2, y: 2} ,{ x: 3, y: 2 } ],
            landscape: [
                { x: 2, y: 3 },
                { x: 0, y: 4 },
                { x: 1, y: 4 },
                { x: 2, y: 4 },
                { x: 3, y: 4 },
            ]
        }
        expect(playTetris(input)).toEqual(expectedOutput)
    })

    test("using coordinates of figures and landscape (p and #) we print Field", () => {
        input = {
            width: 4,
            height: 5,
            figure: [  { x: 1, y: 0 }, {x: 2, y: 0} ,{ x: 3, y: 0 } ],
            landscape: [
               { x: 2, y: 3 },
               { x: 0, y: 4 },
               { x: 1, y: 4 },
               { x: 2, y: 4 },
               { x: 3, y: 4 },
            ]
          }
          expectedOutput = ("....\n....\n.ppp\n..#.\n####")
          expect(renderField(input)).toEqual(expectedOutput)
    })
});



