class Fantasma extends GameObject {
    dir = -1;
    dretaf = false;
    esquerraf = false;
    amuntf = false;
    abaixf = false;
    tipus = -1;
    constructor(x, y, t) {
        super(x, y);
        this.tipus = t;
    }

    Moure = function (mapa) {
        try {

            let anterior = new Posicio(this.y, this.x);

            if (this.dir == -1) this.dir = Math.floor((Math.random() * 4) + 1);

            switch (this.dir) {
                case -1:
                    this.dretaf = false;
                    this.esquerraf = false;
                    this.amuntf = false;
                    this.abaixf = false;
                    break;
                case 1:
                    this.dretaf = true;
                    this.esquerraf = false;
                    this.amuntf = false;
                    this.abaixf = false;
                    break;
                case 2:
                    this.dretaf = false;
                    this.esquerraf = true;
                    this.amuntf = false;
                    this.abaixf = false;
                    break;
                case 3:
                    this.dretaf = false;
                    this.esquerraf = false;
                    this.amuntf = true;
                    this.abaixf = false;
                    break;
                case 4:
                    this.dretaf = false;
                    this.esquerraf = false;
                    this.amuntf = false;
                    this.abaixf = true;
                    break;

            }

            this.y = this.y + (this.dretaf ? 1 : this.esquerraf ? -1 : 0);
            if (this.y < 0) this.y = 0;
            else if (this.y > mapa.Rows - 1) this.y = mapa.Rows - 1;
            if (this.x < 0) this.x = 0;
            else if (this.x > mapa.Columns - 1)
                this.x = mapa.Columns - 1;
            this.x = this.x + (this.amuntf ? -1 : this.abaixf ? 1 : 0);
            try {
                if (anterior.row != this.y || this.x != anterior.column)
                 {
                    if (!this.ComprovarParets(anterior, mapa)) {
                        // mapa.Maze[anterior.row][anterior.column] = -1;
                        // mapa.Maze[this.y][this.x] = 4;
                        this.dir = -1;
                        return this;
                    }
                } else this.dir = -1;
            } catch { }
        }
        catch (e) {
            debugger;
        }
        return this;
    };

    ComprovarParets = function (anterior, mapa) {
        let paret = mapa.Maze[this.y][this.x] == 1;
        let posthis;
        if (paret) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.esquerraf = this.dretaf = this.amuntf = this.abaixf = false;
            this.dir = -1;
        }
        if (this.y >= mapa.Rows) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.esquerraf = this.dretaf = this.amuntf = this.abaixf = false;
        } else if (this.y < 0) {
            this.esquerraf = this.dretaf = this.amuntf = this.abaixf = false;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (this.x >= mapa.Columns) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.esquerraf = this.dretaf = this.amuntf = this.abaixf = false;
        } else if (this.x < 0) {
            this.esquerraf = this.dretaf = this.amuntf = this.abaixf = false;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (posthis !== undefined) {
            this.x = posthis.column;
            this.y = posthis.row;
        }

        // if (anterior?.row == posthis?.row && anterior?.column == posthis?.column) {
        //     this.dir = -1;
        // }

        return paret;
    };

}