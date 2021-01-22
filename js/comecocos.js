var mapa;
var canvasp5;
let paret;
let comecocos;
let comecocosdreta;
let comecocosesquerra;
let comecocosamunt;
let comecocosabaix;
let bola;
let fantasma1;
let fantasma2;
let transparent;

let esquerra, dreta, abaix, amunt;

let maximfantasmes = 5;
let fantasmes = 0;
let fantasmesobject = [];

let roquesobject = [];

let pospacman;

let pacman;

const s = p => {
  p.preload = function () {
    paret = p.loadImage("imatges/wall.png");
    comecocosdreta = p.loadImage("imatges/pacman.gif");
    comecocosesquerra = p.loadImage("imatges/pacmanesquerra.gif");
    comecocosamunt = p.loadImage("imatges/pacmanamunt.gif");
    comecocosabaix = p.loadImage("imatges/pacmanabaix.gif");
    bola = p.loadImage("imatges/bola.png");
    fantasma1 = p.loadImage("imatges/fantasma.png");
    fantasma2 = p.loadImage("imatges/fantasma2.png");
    transparent = p.loadImage("imatges/transparent.png");
    comecocos = comecocosdreta;
  };

  p.setup = function () {
    esquerra = dreta = amunt = abaix = false;
    mapa = new Mapa(25, 25, 32);
    let height = mapa.Rows * mapa.SIZE_IMAGE;
    let width = mapa.Columns * mapa.SIZE_IMAGE;

    // pospacman = new Posicio(0, 0);
    pacman = new Pacman(0, 0);

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
        else roquesobject.push(new Roca(i, i2));
      }
    }

    posicioPacman();
    mapa.Maze[pacman.y][pacman.x] = 4;

    for (i = 0; i < mapa.Maze.length; i++) {
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++) {
        if (mapa.Maze[i][i2] !== 1 && mapa.Maze[i][i2] !== 4) {
          let rnd = getRandomArbitrary(0, 3);
          if (rnd == 1) rnd = -1;
          if (rnd == 2 || rnd == 3) {
            fantasmes++;
            if (fantasmes > maximfantasmes) {
              rnd = -1;
            } else {
              var f = new Fantasma(i, i2, rnd);
              fantasmesobject.push(f);
            }
          }
          mapa.Maze[i][i2] = rnd;
        }
      }
    }

    p.createCanvas(height, width);
    p.frameRate(10);
    $("canvas").css("position", "absolute");
    $("canvas").css("top", "50%");
    $("canvas").css("left", "50%");
    $("canvas").addClass("transform");

    function posicioPacman() {
      // pospacman.row = getRandomArbitrary(0, mapa.Rows - 1);
      // pospacman.column = getRandomArbitrary(0, mapa.Columns - 1);
      // if (mapa.Maze[pospacman.row][pospacman.column] != -1) posicioPacman();
      pacman.y = getRandomArbitrary(0, mapa.Rows - 1);
      pacman.x = getRandomArbitrary(0, mapa.Columns - 1);
      if (mapa.Maze[pacman.y][pacman.x] != -1) posicioPacman();
    }
  };

  p.draw = function () {
    p.background(0);
    // let anterior = new Posicio(pospacman.row, pospacman.column);
    // pospacman.row = pospacman.row + (dreta ? 1 : esquerra ? -1 : 0);
    // if (pospacman.row < 0) pospacman.row = 0;
    // else if (pospacman.row > mapa.Rows - 1) pospacman.row = mapa.Rows - 1;
    // if (pospacman.column < 0) pospacman.column = 0;
    // else if (pospacman.column > mapa.Columns - 1)
    //   pospacman.column = mapa.Columns - 1;
    // pospacman.column = pospacman.column + (amunt ? -1 : abaix ? 1 : 0);
    // try {
    //   if (
    //     anterior.row != pospacman.row ||
    //     pospacman.column != anterior.column
    //   ) {
    //     if (!ComprovarParets(anterior)) {
    //       mapa.Maze[anterior.row][anterior.column] = -1;
    //       mapa.Maze[pospacman.row][pospacman.column] = 4;
    //     }
    //   }
    // } catch { }
    mapa.Maze[pacman.y][pacman.x] = -1;
    pacman = pacman.Moure(mapa);
    //comecocos = dreta ? comecocosdreta : esquerra ? comecocosesquerra : amunt ? comecocosamunt : abaix ? comecocosabaix : comecocosdreta;
    switch(pacman.direction){
      case 0: comecocos = comecocosdreta; break;
      case 1: comecocos = comecocosesquerra; break;
      case 2: comecocos = comecocosamunt; break;
      case 3: comecocos = comecocosabaix; break;
    }
    mapa.Maze[pacman.y][pacman.x] = 4;

    fantasmesobject.forEach(fantasma => {
      try {
        // var ftipus = mapa.Maze[fantasma.x][fantasma.y];
        // if (ftipus == -1) ftipus = 2;
        mapa.Maze[fantasma.x][fantasma.y] = -1;
        var index = fantasmesobject.indexOf(fantasma);
        var fantasma2 = fantasma.Moure(mapa);
        if (fantasma2 !== null && fantasma2 != undefined) fantasmesobject[index] = fantasma2;
        mapa.Maze[fantasma2.x][fantasma2.y] = fantasma.tipus;
        // debugger;
      }
      catch (e) {
        debugger;
      }
    });

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
            break;
          case 3:
            img = fantasma2;
            break;
          case 4:
            img = comecocos;
            break;
        }
        try {
          if (img != null) p.image(img, i * mapa.SIZE_IMAGE, i2 * mapa.SIZE_IMAGE);
        } catch { }
      }
    }
  };

  p.keyPressed = function () {
    esquerra = dreta = amunt = abaix = false;
    if (p.keyCode === p.LEFT_ARROW) {
      esquerra = true;
      pacman.direction = 1;
    } else if (p.keyCode === p.RIGHT_ARROW) {
      dreta = true;
      pacman.direction = 0;
    } else if (p.keyCode === p.UP_ARROW) {
      amunt = true;
      pacman.direction = 2;
    } else if (p.keyCode === p.DOWN_ARROW) {
      abaix = true;
      pacman.direction = 3;
    }
  };
};

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// function ComprovarParets(anterior) {
//   let paret = mapa.Maze[pospacman.row][pospacman.column] == 1;
//   if (paret) {
//     pospacman = new Posicio(anterior.row, anterior.column);
//     esquerra = dreta = amunt = abaix = false;
//   }
//   if (pospacman.row >= mapa.Rows) {
//     pospacman = new Posicio(anterior.row, anterior.column);
//     esquerra = dreta = amunt = abaix = false;
//   } else if (pospacman.row < 0) {
//     esquerra = dreta = amunt = abaix = false;
//     pospacman = new Posicio(anterior.row, anterior.column);
//   }
//   if (pospacman.column >= mapa.Columns) {
//     pospacman = new Posicio(anterior.row, anterior.column);
//     esquerra = dreta = amunt = abaix = false;
//   } else if (pospacman.column < 0) {
//     esquerra = dreta = amunt = abaix = false;
//     pospacman = new Posicio(anterior.row, anterior.column);
//   }
//   return paret;
// }

// class Posicio {
//   constructor(row, column) {
//     this.row = row;
//     this.column = column;
//   }
// }

$(document).ready(function () {
  canvasp5 = new p5(s, 'pacman')
});