export class PreloadScreenView extends Phaser.GameObjects.Container {
  _scene;

  progressBar;

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this.build();
  }

  build() {
    const { width, height } = this.CONFIG;

    this._background = this._scene.add
      .sprite(0, 0, "preloadBackground")
      .setOrigin(0);

    this._background.setScale(
      width / this._background.width,
      height / this._background.height
    );

    this.progressBar = this._scene.add.graphics({ x: 110, y: 571 });
    this._progressBorder = this._scene.add.graphics({ x: 110, y: 571 });

    this._progressBorder.fillStyle("0x38366D", 1);
    this._progressBorder.fillRect(0, 0, 141, 5);

    this.add([this._progressBorder, this.progressBar]);

    this.setSize(width, height);
  }
}
