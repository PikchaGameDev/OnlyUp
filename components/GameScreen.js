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

    this._backgroundGround = this._scene.add
      .image(0, 0, "background", "background-ground")
      .setOrigin(0);
    this._backgroundAir = this._scene.add
      .image(0, 0, "background", "background-air")
      .setOrigin(0);
    this._backgroundClouds = this._scene.add
      .image(0, 0, "background", "background-clouds")
      .setOrigin(0);
    this._backgroundNlo = this._scene.add
      .image(0, 0, "background", "background-nlo")
      .setOrigin(0);
    this._backgroundSpace = this._scene.add
      .image(0, 0, "background", "background-space")
      .setOrigin(0);

    console.log(this._backgroundGround.width);

    const backgroundWidth = this._backgroundGround.width;
    const backgroundScaleWidthRatio = (width * 3) / backgroundWidth;

    this._backgroundGround.setScale(backgroundScaleWidthRatio, 1);
    this._backgroundAir.setScale(backgroundScaleWidthRatio, 1);
    this._backgroundClouds.setScale(backgroundScaleWidthRatio, 1);
    this._backgroundNlo.setScale(backgroundScaleWidthRatio, 1);
    this._backgroundSpace.setScale(backgroundScaleWidthRatio, 1);

    this._backgroundGround.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      -this._backgroundGround.height + height
    );
    this._backgroundAir.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this._backgroundGround.y - this._backgroundAir.height
    );
    this._backgroundClouds.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this._backgroundAir.y - this._backgroundClouds.height
    );
    this._backgroundNlo.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this._backgroundClouds.y - this._backgroundNlo.height
    );
    this._backgroundSpace.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this._backgroundNlo.y - this._backgroundSpace.height
    );

    this._contentContainer = this._scene.add.container(0, 0, [
      this._backgroundGround,
      this._backgroundAir,
      this._backgroundClouds,
      this._backgroundNlo,
      this._backgroundSpace,
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
