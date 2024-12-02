import { PRELOAD_BAR_WIDTH } from "../../../constants";
import { PreloadScreenView } from "./PreloadScreenView";

export interface IPreloadScreen {
  onProgress(value: number): void;
  destroy(): void;
}

export class PreloadScreen {
  private _scene: Phaser.Scene;
  private _view: PreloadScreenView;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._scene = scene;

    this._view = new PreloadScreenView(scene, x, y);

    scene.add.container(0, 0, this._view);

    this._scene.load.on("progress", this.onProgress.bind(this));
  }

  onProgress(value: number) {
    this._view.progressBar.clear();
    this._view.progressBar.fillStyle(0xb72fae, 1);
    this._view.progressBar.fillRect(0, 0, PRELOAD_BAR_WIDTH * value, 5);
  }

  destroy() {
    this._scene.load.removeAllListeners("progress");
  }
}
