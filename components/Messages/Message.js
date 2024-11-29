import { MessageView } from "./MessageView.js";

export class Message {
  _scene;
  _view;

  constructor(scene, x, y) {
    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this._view = new MessageView(scene, x, y);
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
