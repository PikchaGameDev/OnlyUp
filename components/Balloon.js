export class Balloon {
  _scene;

  constructor(scene) {
    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this.build();
  }

  build() {
    const { width, height } = this.CONFIG;

    this._balloon = this._scene.add.sprite(0, 0, "balloon").setOrigin(0.5);

    this._balloon.setScale(0.1, 0.1);
    this._balloon.setPosition(width / 2, height - 200);

    this._contentContainer = this._scene.add.container(0, 0, [this._balloon]);
  }

  destroy() {}
}
