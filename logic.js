const Coordinates = class {
    constructor(x, y) {
      (this.x = x), (this.y = y);
    }
  };
  
  const tetrisField = class {
    constructor(width, height, figure, landscape) {
      (this.width = width),
        (this.height = height),
        (this.figure = figure),
        (this.landscape = landscape);
    }
  };
  
  const neededField = [
    "..p.....",
    ".ppp....",
    "..p.....",
    "........",
    "...#....",
    "...#...#",
    "#..#####",
  ];
  
  const findFigure = (field) => {
    let figures = [];
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === "p") {
          figures.push(new Coordinates(y, x));
        }
      }
    }
    return figures;
  };
  
  const findLandscape = (field) => {
    let landscapes = [];
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === "#") {
          landscapes.push(new Coordinates(y, x));
        }
      }
    }
    return landscapes;
  };
  