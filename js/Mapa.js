const ROWSconst = 4;
const COLUMNSconst  = 4;
const SIZE_IMAGEconst  = 32;
//const MAZEconst  = [];

class Mapa {
    // ROWS = 4;
    // COLUMNS = 4;
    // SIZE_IMAGE = 32;
    // MAZE = [];

    static CrearArray(x, y){
        var arrayBidimensional= new Array(x);
        for (var i = 0; i < x; i++) {
            arrayBidimensional[i] = new Array(y);
        }
        return arrayBidimensional;
    }

    constructor(rows, columns, imagesize) {
      this.ROWS = rows;
      this.COLUMNS = columns;
      this.SIZE_IMAGE = imagesize;
      this.MAZE = Mapa.CrearArray(this.ROWS, this.COLUMNS);
    }

    get Rows(){
        return this.ROWS;
    }

    get Columns(){
        return this.COLUMNS;
    }

    get Maze(){
        return this.MAZE;
    }

  }