import { GameScreenView } from "./GameScreenView.js";

export class GameScreen {
  _view;

  constructor(scene, x, y) {
    this.CONFIG = scene.sys.game.CONFIG;

    this._gameScreenSwipeVelocity = 5;
    this._currentDirection = 0;

    this._view = new GameScreenView(scene, x, y);

    scene.add.container(x, y, this._view);
  }

  updateGameScreenPosition(x, y) {
    if (!x && !y) {
      this._currentDirection = 0;
    }

    this._view.setPosition(x, y);
  }

  isGroundLevel() {
    return this.y < Math.abs(this._view.backgroundGround.y);
  }

  isAirLevel() {
    return (
      this.y > Math.abs(this._view.backgroundGround.y) &&
      this.y <= Math.abs(this._view.backgroundAir.y)
    );
  }

  isCloudsLevel() {
    return (
      this.y > Math.abs(this._view.backgroundAir.y) &&
      this.y <= Math.abs(this._view.backgroundClouds.y)
    );
  }

  isNloLevel() {
    return (
      this.y > Math.abs(this._view.backgroundClouds.y) &&
      this.y <= Math.abs(this._view.backgroundNlo.y)
    );
  }

  isSpaceLevel() {
    return (
      this.y > Math.abs(this._view.backgroundNlo.y) &&
      this.y <= Math.abs(this._view.backgroundSpace.y)
    );
  }

  update(backgroundSpeed) {
    const { width } = this.CONFIG;

    this.updateGameScreenPosition(this.x, this.y + backgroundSpeed);

    if (
      !this._currentDirection ||
      (this._currentDirection === 1 && this._view.x === width / 2) ||
      (this._currentDirection === -1 && this._view.x === -width / 2)
    ) {
      return;
    }

    let newX =
      this._view.x + this._gameScreenSwipeVelocity * this._currentDirection;

    if (
      Math.abs(newX) + Math.abs(this._view.x) ===
        this._gameScreenSwipeVelocity &&
      newX !== 0 &&
      this._view.x !== 0
    ) {
      newX = 0;
    }

    if (newX <= -width / 2 || newX >= width / 2 || newX === 0) {
      newX !== 0
        ? this._view.setX((width / 2) * this._currentDirection)
        : this._view.setX(0);
      this._currentDirection = 0;
    } else {
      this._view.setX(newX);
    }
  }

  addEntityOnScreen(enemy) {
    this._view.add(enemy._view);
  }

  moveToLeft() {
    this._currentDirection = 1;
  }

  moveToRight() {
    this._currentDirection = -1;
  }

  get x() {
    return this._view.x;
  }

  get y() {
    return this._view.y;
  }
}
