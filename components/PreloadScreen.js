export class PreloadScreen {
  _scene;

  constructor(scene) {
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

    this._progressBar = this._scene.add.graphics({ x: 110, y: 571 });
    this._progressBorder = this._scene.add.graphics({ x: 110, y: 571 });

    this._progressBorder.fillStyle("0x38366D", 1);
    this._progressBorder.fillRect(0, 0, 141, 5);

    this._contentContainer = this._scene.add
      .container(0, 0, [this._progressBorder, this._progressBar])
      .setSize(width, height);

    this._scene.load.on("progress", this.onProgress.bind(this));
  }

  onProgress(value) {
    this._progressBar.clear();
    this._progressBar.fillStyle("0xB72FAE", 1);
    this._progressBar.fillRect(0, 0, 141 * value, 5);
  }

  destroy() {
    this._scene.load.removeAllListeners("progress");
  }
}
