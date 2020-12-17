var mapa;

let paret;
let comecocos;
let bola;
let fantasma1;
let fantasma2;
let transparent;

let esquerra, dreta, abaix, amunt;

let pospacman;

function preload() {
  paret = loadImage('imatges/wall.png');
  comecocos = loadImage('imatges/comecocos.png');
  bola = loadImage('imatges/bola.png');
  fantasma1 = loadImage('imatges/fantasma.png');
  fantasma2 = loadImage('imatges/fantasma2.png');
  transparent = loadImage('imatges/transparent.png');
}

function setup() {
    esquerra = dreta = amunt = abaix = false;
    mapa = new Mapa(25, 25, 32)
    let height = mapa.Rows * mapa.SIZE_IMAGE;
    let width = mapa.Columns * mapa.SIZE_IMAGE;
    
    pospacman = new Posicio(0, 0);

    let cells = generateEllerMaze(mapa.Maze);

    cells.filter(i => true).forEach(function(cela){
    // cells.filter(i => i.filter(i2 => i2.connections.right === true || i2.connections.down === true || i2.connections.up  === true|| i2.connections.left === true).length > 0).forEach(function(cela){
      cela.forEach(function(cela2){
        mapa.Maze[cela2.y - 1][cela2.x - 1] = (cela2?.connections?.right == true || cela2?.connections?.down == true || cela2?.connections?.up  == true || cela2?.connections?.left == true) ? 1 : -1;
        // mapa.Maze[cela2.y][cela2.x] = 1;
      });
    });

    // for (i = 0; i < mapa.Maze.length; i++){
    //   for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
    //     if (cells.filter(it => it.filter(it2 => it2.set === `${i}|${i2}`).length > 0).length > 0)
    //       mapa.Maze[i][i2] = 1;
    //       else mapa.Maze[i][i2] = -1;
    //     // cells.filter(it => it.filter(it2 => it2.set === `${i}|${i2}`).length > 0).forEach(function(item){
    //     //   item.forEach(function(item2){
    //     //     if (mapa.Maze[item2.y] !== undefined){
    //     //       mapa.Maze[item2.y][item2.x] = 1;
    //     //     }
    //     //   });
    //     // });
    //   }   
    // }

    for (i = 0; i < mapa.Maze.length; i++){
      for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
        if (mapa.Maze[i][i2] !== 1) 
        {
          let rnd = getRandomArbitrary(0, 3);
          if (rnd == 1) rnd = -1;
          mapa.Maze[i][i2] = rnd;
        }
      }   
    }

    // for (i = 0; i < mapa.Maze.length; i++){
    //   for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
    //     mapa.Maze[i][i2] = getRandomArbitrary(0, 3);
    //   }   
    // }

    pospacman.row = getRandomArbitrary(0, mapa.Rows - 1);
    pospacman.column = getRandomArbitrary(0, mapa.Columns - 1);
    mapa.Maze[pospacman.row][pospacman.column] = 4;

    createCanvas(height, width);
    frameRate(30);
    $("canvas").css("position", "absolute");
    $("canvas").css("top", "50%");
    $("canvas").css("left", "50%");
    $("canvas").addClass("transform");
  }
  
  function draw() {
    background(0);
    let anterior = new Posicio(pospacman.row, pospacman.column);
    pospacman.row = pospacman.row + (dreta ? 1 : (esquerra ? -1 : 0));
    if (pospacman.row < 0) pospacman.row = 0;
    else if (pospacman.row > mapa.Rows - 1) pospacman.row = mapa.Rows - 1;
    if (pospacman.column < 0) pospacman.column = 0;
    else if (pospacman.column > mapa.Columns - 1) pospacman.column = mapa.Columns - 1;
    pospacman.column = pospacman.column + (amunt ? -1 : (abaix ? 1 : 0));
    try{
      if ((anterior.row != pospacman.row || pospacman.column != anterior.column)){
        if (!ComprovarParets(anterior)){
          mapa.Maze[anterior.row][anterior.column] = -1;
          mapa.Maze[pospacman.row][pospacman.column] = 4;
        }
      }
    } catch {}
    for (i = 0; i < mapa.Maze.length; i++){
        for (i2 = 0; i2 < mapa.Maze[i].length; i2++){
          let img;
            switch(mapa.Maze[i][i2]){
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
            try{
            image(img, i * mapa.SIZE_IMAGE, i2 * mapa.SIZE_IMAGE);
            } catch{}
        }   
    }
  }

  function keyPressed() {
    esquerra = dreta = amunt = abaix = false;
    if (keyCode === LEFT_ARROW) {
      esquerra = true;
    } else if (keyCode === RIGHT_ARROW) {
      dreta = true;
    } else if (keyCode === UP_ARROW) {
      amunt = true;
    } else if (keyCode === DOWN_ARROW) {
      abaix = true;
    }
  }

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function ComprovarParets(anterior){
    let paret = mapa.Maze[pospacman.row][pospacman.column] == 1;
    if (paret){
      pospacman = new Posicio(anterior.row, anterior.column);
      esquerra = dreta = amunt = abaix = false;
    }
    if (pospacman.row >= mapa.Rows){
      pospacman = new Posicio(anterior.row, anterior.column);
      esquerra = dreta = amunt = abaix = false;
    } else if (pospacman.row < 0){
      esquerra = dreta = amunt = abaix = false;
      pospacman = new Posicio(anterior.row, anterior.column);
    }
    if (pospacman.column >= mapa.Columns){
      pospacman = new Posicio(anterior.row, anterior.column);
      esquerra = dreta = amunt = abaix = false;
    } else if (pospacman.column < 0){
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