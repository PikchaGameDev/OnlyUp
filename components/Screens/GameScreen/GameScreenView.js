export class GameScreenView extends Phaser.GameObjects.Container {
  _scene;

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this.build();
  }

  build() {
    const { width, height } = this.CONFIG;

    this._backgroundGround = this._scene.add
      .image(0, 0, "backgroundGround")
      .setOrigin(0);
    this._backgroundAir = this._scene.add
      .image(0, 0, "backgroundAir")
      .setOrigin(0);
    this._backgroundClouds = this._scene.add
      .image(0, 0, "backgroundClouds")
      .setOrigin(0);
    this._backgroundNlo = this._scene.add
      .image(0, 0, "backgroundNlo")
      .setOrigin(0);
    this._backgroundSpace = this._scene.add
      .image(0, 0, "backgroundSpace")
      .setOrigin(0);

    const backgroundWidth = this._backgroundGround.width;
    let backgroundScaleWidthRatio = (width * 3) / backgroundWidth;
    backgroundScaleWidthRatio =
      backgroundScaleWidthRatio < 1 ? 1 : backgroundScaleWidthRatio;

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

    this.add([
      this._backgroundGround,
      this._backgroundAir,
      this._backgroundClouds,
      this._backgroundNlo,
      this._backgroundSpace,
    ]);
  }
}
