var mapa;

let paret;
let comecocos;
function preload() {
  paret = loadImage('imatges/wall.png');
  comecocos = loadImage('imatges/comecocos.png');
}

function setup() {
    mapa = new Mapa(4, 4, 32)
    let height = mapa.Rows * mapa.SIZE_IMAGE;
    let width = mapa.Columns * mapa.SIZE_IMAGE;
    for (i = 0; i < mapa.Maze.length; i++){
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
        mapa.Maze[i][i2] = Math.round(Math.random());
      }   
    }
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
            if (mapa.Maze[i][i2] !== 0){
                image(paret, i * mapa.SIZE_IMAGE, i2 * mapa.SIZE_IMAGE);
            }
        }   
    }
  }