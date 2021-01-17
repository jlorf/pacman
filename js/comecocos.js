var mapa;
var canvasp5;
let paret;
let comecocos;
let bola;
let fantasma1;
let fantasma2;
let transparent;

let esquerra, dreta, abaix, amunt;

let maximfantasmes = 5;
let fantasmes = 0;
let fantasmesobject = [];

let pospacman;

const s = p => {
  p.preload = function() {
    paret = p.loadImage("imatges/wall.png");
    comecocos = p.loadImage("imatges/comecocos.png");
    bola = p.loadImage("imatges/bola.png");
    fantasma1 = p.loadImage("imatges/fantasma.png");
    fantasma2 = p.loadImage("imatges/fantasma2.png");
    transparent = p.loadImage("imatges/transparent.png");
  };

  p.setup = function() {
    esquerra = dreta = amunt = abaix = false;
    mapa = new Mapa(25, 25, 32);
    let height = mapa.Rows * mapa.SIZE_IMAGE;
    let width = mapa.Columns * mapa.SIZE_IMAGE;

    pospacman = new Posicio(0, 0);

    let cells = generateEllerMaze(mapa.Maze);

    //draw
    let j = 1;
    function recursiveDrawMaze() {
      cells[j].forEach(c => {
        if (c) {
          mapa.Maze[c.x][c.y] = 1;
          if (c.connections.right) {
            mapa.Maze[c.x + 1][c.y] = 1;
          }
          if (c.connections.down) {
            mapa.Maze[c.x][c.y + 1] = 1;
          }
          if (c.connections.up) {
            mapa.Maze[c.x][c.y - 1] = 1;
          }
          if (c.connections.left) {
            mapa.Maze[c.x - 1][c.y] = 1;
          }
        }
      });
      j += 2;
      if (j < cells.length) {
        recursiveDrawMaze();
      }
    }
    recursiveDrawMaze();

    for (i = 0; i < mapa.Maze.length; i++) {
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++) {
        if (mapa.Maze[i][i2] !== 1) mapa.Maze[i][i2] = -1;
      }
    }

    posicioPacman();
    mapa.Maze[pospacman.row][pospacman.column] = 4;

    for (i = 0; i < mapa.Maze.length; i++) {
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++) {
        if (mapa.Maze[i][i2] !== 1 && mapa.Maze[i][i2] !== 4) {
          let rnd = getRandomArbitrary(0, 3);
          if (rnd == 1) rnd = -1;
          if (rnd == 2 || rnd == 3)
          {
            fantasmes++;
            if (fantasmes > maximfantasmes){
              rnd = -1;
            } else {
              var f = new Fantasma(i, i2);
              fantasmesobject.push(f);
            }
          }
          mapa.Maze[i][i2] = rnd;
        }
      }
    }

    p.createCanvas(height, width);
    p.frameRate(30);
    $("canvas").css("position", "absolute");
    $("canvas").css("top", "50%");
    $("canvas").css("left", "50%");
    $("canvas").addClass("transform");

    function posicioPacman() {
      pospacman.row = getRandomArbitrary(0, mapa.Rows - 1);
      pospacman.column = getRandomArbitrary(0, mapa.Columns - 1);
      if (mapa.Maze[pospacman.row][pospacman.column] != -1) posicioPacman();
    }
  };

  p.draw = function() {
    p.background(0);
    let anterior = new Posicio(pospacman.row, pospacman.column);
    pospacman.row = pospacman.row + (dreta ? 1 : esquerra ? -1 : 0);
    if (pospacman.row < 0) pospacman.row = 0;
    else if (pospacman.row > mapa.Rows - 1) pospacman.row = mapa.Rows - 1;
    if (pospacman.column < 0) pospacman.column = 0;
    else if (pospacman.column > mapa.Columns - 1)
      pospacman.column = mapa.Columns - 1;
    pospacman.column = pospacman.column + (amunt ? -1 : abaix ? 1 : 0);
    try {
      if (
        anterior.row != pospacman.row ||
        pospacman.column != anterior.column
      ) {
        if (!ComprovarParets(anterior)) {
          mapa.Maze[anterior.row][anterior.column] = -1;
          mapa.Maze[pospacman.row][pospacman.column] = 4;
        }
      }
    } catch {}
    for (i = 0; i < mapa.Maze.length; i++) {
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++) {
        let img;
        switch (mapa.Maze[i][i2]) {
          case -1:
            img = transparent;
            break;
          case 0:
            img = bola;
            break;
          case 1:
            img = paret;
            break;
          case 2:
            img = fantasma1;
            var prova = fantasmesobject.find(f => f.x == i && f.y == i2);
            debugger;
            break;
          case 3:
            img = fantasma2;
            break;
          case 4:
            img = comecocos;
            break;
        }
        try {
          p.image(img, i * mapa.SIZE_IMAGE, i2 * mapa.SIZE_IMAGE);
        } catch {}
      }
    }
  };

  p.keyPressed = function() {
    esquerra = dreta = amunt = abaix = false;
    if (p.keyCode === p.LEFT_ARROW) {
      esquerra = true;
    } else if (p.keyCode === p.RIGHT_ARROW) {
      dreta = true;
    } else if (p.keyCode === p.UP_ARROW) {
      amunt = true;
    } else if (p.keyCode === p.DOWN_ARROW) {
      abaix = true;
    }
  };
};

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ComprovarParets(anterior) {
  let paret = mapa.Maze[pospacman.row][pospacman.column] == 1;
  if (paret) {
    pospacman = new Posicio(anterior.row, anterior.column);
    esquerra = dreta = amunt = abaix = false;
  }
  if (pospacman.row >= mapa.Rows) {
    pospacman = new Posicio(anterior.row, anterior.column);
    esquerra = dreta = amunt = abaix = false;
  } else if (pospacman.row < 0) {
    esquerra = dreta = amunt = abaix = false;
    pospacman = new Posicio(anterior.row, anterior.column);
  }
  if (pospacman.column >= mapa.Columns) {
    pospacman = new Posicio(anterior.row, anterior.column);
    esquerra = dreta = amunt = abaix = false;
  } else if (pospacman.column < 0) {
    esquerra = dreta = amunt = abaix = false;
    pospacman = new Posicio(anterior.row, anterior.column);
  }
  return paret;
}

class Posicio {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}

$( document ).ready(function() {
  canvasp5 = new p5(s, 'pacman')
});