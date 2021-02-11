var mapa;
var canvasp5;
var canvasp52;
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
let time;

let millisrestar = 0;

const s3 = p3 => {
  let MENU = 0
  let imatgemenu;

  p3.preload = function () {
    imatgemenu = p3.loadImage('imatges/imatgemenu.jpg');
  }

  p3.setup = function () {
    p3.createCanvas(p3.windowWidth - 10, p3.windowHeight - 10);
  }

  p3.draw = function () {
    p3.background(0);
    p3.fill(0, 255, 0);
    p3.rect(50, 50, 200, 75);
    p3.fill(255, 0, 255);
    p3.rect(50, 200, 200, 75);
    p3.textSize(50)
    p3.fill(255);
    p3.text('START', 70, 106);
    p3.textSize(40);
    p3.text('OPCIONS', 52, 248);
    p3.image(imatgemenu, 250, 0, 550, 550);

    if (MENU == 1) {
      $("#menu").css("display", "none");
      tempsrestar = canvasp52.millis();
      $("#puntuacio").css("display", "block");
      $("#pacman").css("display", "block");
    }
    if (p3.MENU == 2) {
      p3.background(255, 0, 255)
      p3.textSize(20)
      p3.text('Right Click to return to MENU', 525, 30)
      p3.textSize(30)
      p3.text('1. Rocks will fall from the top of the screen.', 50, 150)
      p3.text('2. Move your character using arrow keys', 50, 200)
      p3.text('<- and -> to avoid being crushed.', 80, 240)
      p3.text('3. The game is over when a rock hits you.', 50, 290)

    }
    if (MENU == 3) {
      p3.background(255, 0, 0)
      p3.textSize(75)
      p3.text('COME AGAIN SOON!', 25, height / 2)
    } // EXIT 
  }

  p3.mouseClicked = function () {
    if (MENU == 0) {
      if (p3.mouseX < 200 && p3.mouseX > 50) {
        if (p3.mouseY < 125 && p3.mouseY > 50) {
          MENU = 1
        }
        if (p3.mouseY < 275 && p3.mouseY > 200) {
          MENU = 2
        }
        if (p3.mouseY < 425 && p3.mouseY > 350) {
          MENU = 3
        }
      }
    }
  }

  p3.windowResized = function () {
    p3.resizeCanvas(p3.windowWidth - 10, p3.windowHeight - 10);
  };
}

const s2 = p2 => {
  p2.setup = function () {
    p2.createCanvas(p2.windowWidth - 10, p2.windowHeight - 10);
    p2.fill(1000);
    p2.textSize(15);
    p2.textAlign(p2.CENTER, p2.CENTER);
    // p.frameRate(10);
  };

  p2.draw = function () {
    p2.background(0);
    //reiniciar temps al finalitzar
    time = (p2.millis() - millisrestar) / 1000;
    p2.text("Temps: " + parseInt(time), p2.width - 100, 10);
    p2.text("Punts: " + pacman?.punts ?? 0, p2.width - 200, 10);
    p2.text("Vides: " + pacman?.vides ?? 0, p2.width - 300, 10);
  };

  p2.windowResized = function () {
    p2.resizeCanvas(p2.windowWidth - 10, p2.windowHeight - 10);
  };
}

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

    switch (pacman.direction) {
      case 0: comecocos = comecocosdreta; break;
      case 1: comecocos = comecocosesquerra; break;
      case 2: comecocos = comecocosamunt; break;
      case 3: comecocos = comecocosabaix; break;
    }

    if (pos_anterior.x != pacman.x || pos_anterior.y != pacman.y) {
      if (!chomp.isPlaying()) {
        chomp.setVolume(0.5);
        chomp.play();
      }
      var index_menjar = mapa.menjar.findIndex(m => m.x == pacman.x && m.y == pacman.y);
      if (index_menjar > -1) {
        pacman.punts = pacman.punts + 1;
        var menjarobj = mapa.menjar.splice(index_menjar, 1);
        eatfruit.setVolume(0.5);
        eatfruit.play();
      }
    } else {
      if (pacman.paret) {
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

    if (guanyar || perdre) {
      p.noLoop();
      if (perdre) {
        death.setVolume(0.5);
        death.play();
      }
      if (confirm((guanyar ? "Has guanyat" : "Has perdut") + ", Vols tornar a jugar?")) {
        IniciarJoc(p);
        p.loop();
        millisrestar += canvasp52.millis();
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
  canvasp5 = new p5(s, 'pacman');
  canvasp52 = new p5(s2, 'puntuacio');
  new p5(s3, 'menu');
});