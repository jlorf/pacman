const ROWSconst = 4;
const COLUMNSconst = 4;
const SIZE_IMAGEconst = 32;
//const MAZEconst  = [];

const Cell = Object.freeze({
    'visited': -1,
    'empty': 0,
    'start': 1,
    'obstacle': 2,
    'end': 3,
    'path': 4,
});

class Mapa {
    // ROWS = 4;
    // COLUMNS = 4;
    // SIZE_IMAGE = 32;
    // MAZE = [];

    constructor(rows, columns, imagesize, p5var) {
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
        } else if (arguments?.length === 4) {
            this.ROWS = rows;
            this.COLUMNS = columns;
            this.SIZE_IMAGE = imagesize;
            this.p5 = p5var;
        }
        // this.CrearArray(this.ROWS, this.COLUMNS);
        // this.MAZE = this.OmplirMapa(this.MAZE);
        this.roques = [];
        this.menjar = [];
        this.MAZE = this.generarMapa();
    }

    CrearArray(x, y) {
        this.MAZE = new Array(x);
        for (var i = 0; i < x; i++) {
            // arrayBidimensional[i] = new Array(y);
            this.MAZE[i] = [];
            for (var i2 = 0; i2 < y; i2++) {
                this.MAZE[i].push(1);
            }
        }
        // return arrayBidimensional;
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
        // j = 0;
        // OmplirArray();
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

    boardInit() {
        this.MAZE = new Array(this.ROWS);
        for (let i = 0; i < this.ROWS; i++) {
            this.MAZE[i] = new Array(this.COLUMNS).fill(0);
        }
        return this.MAZE;
    }

    generarMapa() {
        var board = this.boardInit();

        // Make walls
        for (let i = 0; i < this.ROWS; i += 2) {
            for (let j = 0; j < this.COLUMNS; j++) {
                board[i][j] = Cell.obstacle;
            }
        }

        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLUMNS; j += 2) {
                board[i][j] = Cell.obstacle;
            }
        }

        // Choose start point
        let sy = 1;
        let sx = 1;

        board[sy][sx] = Cell.visited;

        let stack = [];
        stack.push({ x: sx, y: sy });

        while (stack.length > 0) {
            let current = stack.pop();

            let validNeighbors = [];
            let straightMoves = [[0, -2], [0, 2], [-2, 0], [2, 0]];

            for (let move of straightMoves) {
                let newNodePosition = {
                    x: current.x + move[0],
                    y: current.y + move[1]
                };

                if (!this.isOnBoard(newNodePosition) || board[newNodePosition.y][newNodePosition.x] === Cell.visited) {
                    continue;
                }

                validNeighbors.push(newNodePosition);
            }

            // If we have available neighbor(s), we choose a random neighbor
            // and remove the wall(obstacle cell) between these two cell.
            if (validNeighbors.length > 0) {
                stack.push(current);
                let randNeighbor = this.p5.random(validNeighbors);

                if (randNeighbor.y === current.y) { // Same row
                    if (randNeighbor.x > current.x) {
                        board[current.y][current.x + 1] = Cell.empty;
                    } else {
                        board[current.y][current.x - 1] = Cell.empty;
                    }
                } else { // Same column
                    if (randNeighbor.y > current.y) {
                        board[current.y + 1][current.x] = Cell.empty;
                    } else {
                        board[current.y - 1][current.x] = Cell.empty;
                    }
                }

                board[randNeighbor.y][randNeighbor.x] = Cell.visited;
                stack.push(randNeighbor);
            }
        }

        // Cells were marked as visited. Mark them as empty again.
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLUMNS; j++) {
                if (board[i][j] === Cell.obstacle) {
                    board[i][j] = 1;
                    this.roques.push(new Roca(j, i));
                } else if (board[i][j] === Cell.visited){
                    let rnd = getRandomArbitrary(0, 1);
                    if (rnd == 1) rnd = -1;
                    if (rnd == 0) {                        
                        this.menjar.push(new Menjar(j, i));
                    }
                    board[i][j] = rnd;
                }
            }
        }
        return board;
    }

    isOnBoard(nodePosition) {
        return !(nodePosition.y > (this.ROWS - 1) ||
            nodePosition.y < 0 ||
            nodePosition.x > (this.COLUMNS - 1) ||
            nodePosition.x < 0);
    }

}