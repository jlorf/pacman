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

let beginning;
let chomp;
let death;
let eatfruit;

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
    beginning = p.loadSound('sons/pacman_beginning.wav');
    chomp = p.loadSound('sons/pacman_chomp.wav');
    death = p.loadSound('sons/pacman_death.wav');
    eatfruit = p.loadSound('sons/pacman_eatfruit.wav');
  };

  p.setup = function () {
    IniciarJoc(p);
    beginning.setVolume(0.5);
    beginning.play();
  };

  p.draw = function () {
    p.background(0);
    // mapa.Maze[pacman.y][pacman.x] = -1;
    
    var pos_anterior = {
      x: pacman.x, y: pacman.y
    }
    pacman = pacman.Moure(mapa);

    switch(pacman.direction){
      case 0: comecocos = comecocosdreta; break;
      case 1: comecocos = comecocosesquerra; break;
      case 2: comecocos = comecocosamunt; break;
      case 3: comecocos = comecocosabaix; break;
    }

    if (pos_anterior.x != pacman.x || pos_anterior.y != pacman.y){
      chomp.setVolume(0.5);
      chomp.play();
      var index_menjar = mapa.menjar.findIndex(m => m.x == pacman.x && m.y == pacman.y);
      if (index_menjar > -1){
        pacman.punts = pacman.punts + 1;        
        var menjarobj = mapa.menjar.splice(index_menjar, 1);
        eatfruit.setVolume(0.5);
        eatfruit.play();
      }
    } else {
      if (pacman.paret){
        pacman.vides = pacman.vides - 1;
        pacman.paret = false;
      }
    }

    mapa.Maze[pacman.y][pacman.x] = 4;

    //mostrar parets
    mapa.roques.forEach(element => {
      element.Show(p, paret, mapa.SIZE_IMAGE);
    });

    //mostrar menjar
    mapa.menjar.forEach(element => {
      element.Show(p, bola, mapa.SIZE_IMAGE);
    });

    //mostrar pacman
    pacman.Show(p, comecocos, mapa.SIZE_IMAGE);

    var perdre = pacman.vides < 0;
    var guanyar = !perdre && (mapa?.menjar == undefined || mapa?.menjar?.length == 0);

    if (guanyar || perdre){
      p.noLoop();
      if (perdre) {
        death.setVolume(0.5);
        death.play();
      }
      if (confirm((guanyar ? "Has guanyat" : "Has perdut") + ", Vols tornar a jugar?")){
        IniciarJoc(p);
        p.loop();
      }
    }
    // debugger;

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

function IniciarJoc(p) {
  mapa = new Mapa(25, 25, 32, p);
  let height = mapa.Rows * mapa.SIZE_IMAGE;
  let width = mapa.Columns * mapa.SIZE_IMAGE;

  pacman = new Pacman(0, 0);

  posicioPacman();
  mapa.Maze[pacman.y][pacman.x] = 4;

  p.createCanvas(height, width);
  p.frameRate(10);
  $("canvas").css("position", "absolute");
  $("canvas").css("top", "50%");
  $("canvas").css("left", "50%");
  $("canvas").addClass("transform");
}

function posicioPacman() {
  // pospacman.row = getRandomArbitrary(0, mapa.Rows - 1);
  // pospacman.column = getRandomArbitrary(0, mapa.Columns - 1);
  // if (mapa.Maze[pospacman.row][pospacman.column] != -1) posicioPacman();
  pacman.y = getRandomArbitrary(0, mapa.Rows - 1);
  pacman.x = getRandomArbitrary(0, mapa.Columns - 1);
  if (mapa.Maze[pacman.y][pacman.x] != -1) posicioPacman();
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

$(document).ready(function () {
  canvasp5 = new p5(s, 'pacman')
});