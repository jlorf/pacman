const ROWSconst = 4;
const COLUMNSconst = 4;
const SIZE_IMAGEconst = 32;
//const MAZEconst  = [];

class Mapa {
    // ROWS = 4;
    // COLUMNS = 4;
    // SIZE_IMAGE = 32;
    // MAZE = [];

    constructor(rows, columns, imagesize) {
        if (arguments?.length === 0) {
            this.ROWS = ROWSconst;
            this.COLUMNS = COLUMNSconst;
            this.SIZE_IMAGE = imagesize;
        } else if (arguments?.length === 2) {
            this.ROWS = rows;
            this.COLUMNS = columns;
            this.SIZE_IMAGE = SIZE_IMAGEconst;
        } else if (arguments?.length === 3) {
            this.ROWS = rows;
            this.COLUMNS = columns;
            this.SIZE_IMAGE = imagesize;
        }
        this.MAZE = this.CrearArray(this.ROWS, this.COLUMNS);
        this.MAZE = this.OmplirMapa(this.MAZE);
    }

    CrearArray(x, y) {
        var arrayBidimensional = new Array(x);
        for (var i = 0; i < x; i++) {
            // arrayBidimensional[i] = new Array(y);
            arrayBidimensional[i] = [];
            for (var i2 = 0; i2 < y; i2++) {
                arrayBidimensional[i].push(1);
            }
        }
        return arrayBidimensional;
    }

    OmplirMapa(mapa) {
        let cells = generateEllerMaze(mapa);
        let j = 1;
        function OmplirArray() {
            if (cells[j] !== null && cells[j] !== undefined) {
                cells[j].forEach(c => {
                    if (c) {
                        // mapa[c.x][c.y] = 1;
                        // var splited = c.set.split("|");
                        // mapa[splited[0]][splited[1]] = 1;
                        // mapa[c.x][c.y] = 1;
                        mapa[c.x][c.y] = 0;
                        if (c.connections.right) {
                            mapa[c.x + 1][c.y] = 0;
                        }
                        if (c.connections.down) {
                            mapa[c.x][c.y + 1] = 0;
                        }
                        if (c.connections.up) {
                            mapa[c.x][c.y - 1] = 0;
                        }
                        if (c.connections.left) {
                            mapa[c.x - 1][c.y] = 0;
                        }
                    }
                });
            }
            j += 2;
            if (j < cells.length) {
                OmplirArray();
            }
        }
        OmplirArray();
        j = 0;
        OmplirArray();
        return mapa;
    }

    get Rows() {
        return this.ROWS;
    }

    get Columns() {
        return this.COLUMNS;
    }

    get Maze() {
        return this.MAZE;
    }

}