class Fantasma extends GameObject {
    constructor(x,y) {
      super(x, y);
    }
  
    Moure = function(arr) {
        if (arr[this.x + 1][this.y] !== 1)
        {
            this.x = x + 1;
        } else if (arr[this.x - 1][this.y] !== 1)
        {
            this.x = x - 1;
        } else if (arr[this.x][this.y + 1] !== 1)
        {
            this.y = y + 1;
        } else if (arr[this.x][this.y - 1] !== 1)
        {
            this.y = y - 1;
        }
    };

  }