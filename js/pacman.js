class Pacman extends GameObject {
    direction = -1;
    constructor(x, y) {
        super(x, y);
        this.paret = false;
        this.vides = 50;
        this.punts = 0;
    }

    Moure (mapa) {
        try {
            let anterior = new Posicio(this.y, this.x);
            this.y = this.y + (this.direction == 0 ? 1 : this.direction == 1 ? -1 : 0);
            if (this.y < 0) this.y = 0;
            else if (this.y > mapa.Rows - 1) this.y = mapa.Rows - 1;
            if (this.x < 0) this.x = 0;
            else if (this.x > mapa.Columns - 1)
                this.x = mapa.Columns - 1;
            this.x = this.x + (this.direction == 2 ? -1 : this.direction == 3 ? 1 : 0);
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

    ComprovarParets (anterior, mapa) {
        this.paret = mapa.Maze[this.y][this.x] == 1;
        let posthis;
        if (this.paret) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.direction = -1;
        }
        if (this.y >= mapa.Rows) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.direction = -1;
        } else if (this.y < 0) {
            this.direction = -1;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (this.x >= mapa.Columns) {
            posthis = new Posicio(anterior.row, anterior.column);
            this.direction = -1;
        } else if (this.x < 0) {
            this.direction = -1;
            posthis = new Posicio(anterior.row, anterior.column);
        }
        if (posthis !== undefined) 
        {
            this.x = posthis.column;
            this.y = posthis.row;
        }
        return this.paret;
    }

}

class Posicio {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}