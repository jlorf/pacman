class Pacman extends GameObject {
    constructor(x, y) {
        super(x, y);
    }

    Moure = function (mapa, dreta, esquerra, amunt, abaix) {
        try {
            let anterior = new Posicio(this.y, this.x);
            this.y = this.y + (dreta ? 1 : esquerra ? -1 : 0);
            if (this.y < 0) this.y = 0;
            else if (this.y > mapa.Rows - 1) this.y = mapa.Rows - 1;
            if (this.x < 0) this.x = 0;
            else if (this.x > mapa.Columns - 1)
                this.x = mapa.Columns - 1;
            this.x = this.x + (amunt ? -1 : abaix ? 1 : 0);
            try {
                if (
                    anterior.row != this.y ||
                    this.x != anterior.column
                ) {
                    if (!this.ComprovarParets(anterior, mapa)) {
                        // mapa.Maze[anterior.row][anterior.column] = -1;
                        // mapa.Maze[this.y][this.x] = 4;
                        return this;
                    }
                }
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
            esquerra = dreta = amunt = abaix = false;
        }
        if (this.y >= mapa.Rows) {
            posthis = new Posicio(anterior.row, anterior.column);
            esquerra = dreta = amunt = abaix = false;
        } else if (this.y < 0) {
            esquerra = dreta = amunt = abaix = false;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (this.x >= mapa.Columns) {
            posthis = new Posicio(anterior.row, anterior.column);
            esquerra = dreta = amunt = abaix = false;
        } else if (this.x < 0) {
            esquerra = dreta = amunt = abaix = false;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (posthis !== undefined) 
        {
            this.x = posthis.column;
            this.y = posthis.row;
        }
        return paret;
    }

}

class Posicio {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}