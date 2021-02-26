class PowerUp extends GameObject {
    direction = -1;
    constructor(x, y) {
        super(x, y);
        this.tipus = getRandomArbitrary(0, 1);
    }
}