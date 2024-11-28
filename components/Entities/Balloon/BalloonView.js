export class BalloonView extends Phaser.GameObjects.Container {
  _scene;

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x, y) {
    this._balloon = this._scene.add.sprite(x, y, "balloon").setOrigin(0.5);

    this._balloon.setScale(0.1, 0.1);

    this.addedToScene([this._balloon]);

    this.setPosition(x, y);
  }
}
