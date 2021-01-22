class Fantasma extends GameObject {
    dir = -1;
    tipus = -1;
    constructor(x, y, t) {
        super(x, y);
        this.tipus = t;
    }

    Moure (mapa) {
        try {

            let anterior = new Posicio(this.y, this.x);
            let antjson = JSON.stringify(anterior);

            if (this.dir == -1) this.dir = Math.floor((Math.random() * 4) + 1);

            this.y = this.y + (this.dir == 1 ? 1 : this.dir == 2 ? -1 : 0);
            if (this.y < 0) this.y = 0;
            else if (this.y > mapa.Rows - 1) this.y = mapa.Rows - 1;
            if (this.x < 0) this.x = 0;
            else if (this.x > mapa.Columns - 1)
                this.x = mapa.Columns - 1;
            this.x = this.x + (this.dir == 3 ? -1 : this.dir == 4 ? 1 : 0);
            try {
                 if (!this.ComprovarParets(anterior, mapa)) {
                    // mapa.Maze[anterior.row][anterior.column] = -1;
                    // mapa.Maze[this.y][this.x] = 4;
                    this.dir = -1;
                    return this;
                } else {
                    debugger;
                    this.x = anterior.column;
                    this.y = anterior.row;
                    this.dir = -1;
                    return this;
                }
            } catch { }
        }
        catch (e) {
            debugger;
        }
        return this;
    };

    ComprovarParets (anterior, mapa) {
        let paret = mapa.Maze[this.y][this.x] == 1;
        let posthis;
        if (paret) {
            debugger;
            posthis = new Posicio(anterior.row, anterior.column);
            this.dir = -1;
        }
        if (this.y >= mapa.Rows) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.dir = -1;
        } else if (this.y < 0) {
            this.dir = -1;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (this.x >= mapa.Columns) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.dir = -1;
        } else if (this.x < 0) {
            this.dir = -1;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (posthis !== undefined) 
        {
            this.x = posthis.column;
            this.y = posthis.row;
        }
        return paret;
    };

}