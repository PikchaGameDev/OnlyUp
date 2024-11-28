import { PreloadScreenView } from "./PreloadScreenView.js";

export class PreloadScreen {
  _scene;
  _view;

  constructor(scene, x, y) {
    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this._view = new PreloadScreenView(scene, x, y);

    scene.add.container(0, 0, this._view);

    this._scene.load.on("progress", this.onProgress.bind(this));
  }

  onProgress(value) {
    this._view.progressBar.clear();
    this._view.progressBar.fillStyle("0xB72FAE", 1);
    this._view.progressBar.fillRect(0, 0, 141 * value, 5);
  }

  destroy() {
    this._scene.load.removeAllListeners("progress");
  }
}
