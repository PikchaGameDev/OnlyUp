export class BalloonView extends Phaser.GameObjects.Container {
  _scene;
  _balloon;

  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x, y) {
    this._balloon = this._scene.add.image(x, y, "balloon").setOrigin(0.5);

    this._balloon.setScale(0.09, 0.09);

    this.#collisionBox.width = this._balloon.width * 0.09;
    this.#collisionBox.height = this._balloon.height * 0.09;

    this.addedToScene([this._balloon]);
  }

  get collisionBox() {
    this.#collisionBox.x = this._balloon.x - this.#collisionBox.width / 2;
    this.#collisionBox.y = this._balloon.y - this.#collisionBox.height / 2;

    return this.#collisionBox;
  }

  get width() {
    return this._balloon.width * 0.09;
  }

  get height() {
    return this._balloon.height * 0.09;
  }

  destroy() {
    this._balloon.destroy();
  }
}
