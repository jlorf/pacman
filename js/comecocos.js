var mapa;

let paret;
let comecocos;
let bola;
let fantasma1;
let fantasma2;

function preload() {
  paret = loadImage('imatges/wall.png');
  comecocos = loadImage('imatges/comecocos.png');
  bola = loadImage('imatges/bola.png');
  fantasma1 = loadImage('imatges/fantasma.png');
  fantasma2 = loadImage('imatges/fantasma2.png');
}

function setup() {
    mapa = new Mapa(4, 4, 32)
    let height = mapa.Rows * mapa.SIZE_IMAGE;
    let width = mapa.Columns * mapa.SIZE_IMAGE;
    for (i = 0; i < mapa.Maze.length; i++){
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
        mapa.Maze[i][i2] = getRandomArbitrary(0, 3);
      }   
    }

    mapa.Maze[getRandomArbitrary(0, mapa.Rows - 1)][getRandomArbitrary(0, mapa.Columns - 1)] = 4;

    createCanvas(height, width);
    $("canvas").css("position", "absolute");
    $("canvas").css("top", "50%");
    $("canvas").css("left", "50%");
    $("canvas").addClass("transform");
  }
  
  function draw() {
    background(220);
    for (i = 0; i < mapa.Maze.length; i++){
        for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
          let img;
          switch(mapa.Maze[i][i2]){
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
          image(img, i * mapa.SIZE_IMAGE, i2 * mapa.SIZE_IMAGE);
        }   
    }
  }

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }