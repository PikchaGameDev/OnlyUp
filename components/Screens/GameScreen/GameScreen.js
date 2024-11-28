import { GameScreenView } from "./GameScreenView.js";

export class GameScreen {
  _view;

  constructor(scene, x, y) {
    this.CONFIG = scene.sys.game.CONFIG;

    this._gameScreenSwipeVelocity = 4;
    this._currentDirection = 0;

    this._view = new GameScreenView(scene, x, y);

    scene.add.container(0, 0, this._view);
  }

  updateGameScreenPosition(x, y) {
    this._view.setPosition(x, y);
  }

  update() {
    const { width } = this.CONFIG;

    if (
      !this._currentDirection ||
      (this._currentDirection === 1 && this._view.x === width) ||
      (this._currentDirection === -1 && this._view.x === -width)
    ) {
      return;
    }

    const newX =
      this._view.x + this._gameScreenSwipeVelocity * this._currentDirection;

    if (newX <= -width || newX >= width || newX === 0) {
      newX !== 0
        ? this._view.setX(width * this._currentDirection)
        : this._view.setX(0);
      this._currentDirection = 0;
    } else {
      this._view.setX(newX);
    }
  }

  moveToLeft() {
    this._currentDirection = 1;
  }

  moveToRight() {
    this._currentDirection = -1;
  }

  destroy() {}

  get x() {
    return this._view.x;
  }

  get y() {
    return this._view.y;
  }
}
