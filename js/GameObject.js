class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }

  // ComprovarParets = function (anterior, mapa) {
  //   let paret = mapa.Maze[this.y][this.x] == 1;
  //   if (paret) {
  //     posthis = new Posicio(anterior.row, anterior.column);
  //     esquerra = dreta = amunt = abaix = false;
  //   }
  //   if (this.y >= mapa.Rows) {
  //     posthis = new Posicio(anterior.row, anterior.column);
  //     esquerra = dreta = amunt = abaix = false;
  //   } else if (this.y < 0) {
  //     esquerra = dreta = amunt = abaix = false;
  //     posthis = new Posicio(anterior.row, anterior.column);
  //   }
  //   if (this.x >= mapa.Columns) {
  //     posthis = new Posicio(anterior.row, anterior.column);
  //     esquerra = dreta = amunt = abaix = false;
  //   } else if (this.x < 0) {
  //     esquerra = dreta = amunt = abaix = false;
  //     posthis = new Posicio(anterior.row, anterior.column);
  //   }
  //   return paret;
  // }

}