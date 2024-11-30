import { ResultMessageView } from "./ResultMessageView";

export class ResultMessage {
  private _scene: Phaser.Scene;
  private _view: ResultMessageView;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._scene = scene;

    this._view = new ResultMessageView(scene, x, y);
  }

  showWinText() {
    this._view.showWinText();
  }

  showLoseText() {
    this._view.showLoseText();
  }

  clearAllText() {
    this._view.clearAllText();
  }
}
