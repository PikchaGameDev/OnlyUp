export class GameScreen {
  _scene;

  constructor(scene) {
    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this._gameScreenSwipeVelocity = 4;
    this._currentDirection = 0;

    this.build();
  }

  build() {
    const { width, height } = this.CONFIG;

    this._background = this._scene.add.sprite(0, 0, "background").setOrigin(0);

    const backgroundScaleWidthRatio = (width * 3) / this._background.width;

    this._background.setScale(backgroundScaleWidthRatio, 1);

    this._background.setPosition(
      (-this._background.width * backgroundScaleWidthRatio) / 2 + width / 2,
      -this._background.height + height
    );

    this._contentContainer = this._scene.add.container(0, 0, [
      this._background,
    ]);
  }

  updateGameScreenPosition(x, y) {
    this._contentContainer.setPosition(x, y);
  }

  update() {
    const { width } = this.CONFIG;

    if (!this._currentDirection) {
      return;
    }

    if (this._currentDirection === 1 && this._contentContainer.x === width) {
      return;
    }

    if (this._currentDirection === -1 && this._contentContainer.x === -width) {
      return;
    }

    const newX =
      this._contentContainer.x +
      this._gameScreenSwipeVelocity * this._currentDirection;

    if (newX <= -width || newX >= width || newX === 0) {
      newX !== 0
        ? this._contentContainer.setX(width * this._currentDirection)
        : this._contentContainer.setX(0);
      this._currentDirection = 0;
    } else {
      this._contentContainer.setX(newX);
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
    return this._contentContainer.x;
  }

  get y() {
    return this._contentContainer.y;
  }
}
