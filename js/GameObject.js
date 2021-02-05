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

  Show(p, img, size) {
    p.image(img, this.y * size, this.x * size);
  }

}