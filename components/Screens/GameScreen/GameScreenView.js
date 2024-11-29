export class GameScreenView extends Phaser.GameObjects.Container {
  _scene;

  backgroundGround;
  backgroundAir;
  backgroundClouds;
  backgroundNlo;
  backgroundSpace;

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this.build();
  }

  build() {
    const { width, height } = this.CONFIG;

    this.backgroundGround = this._scene.add
      .image(0, 0, "backgroundGround")
      .setOrigin(0);
    this.backgroundAir = this._scene.add
      .image(0, 0, "backgroundAir")
      .setOrigin(0);
    this.backgroundClouds = this._scene.add
      .image(0, 0, "backgroundClouds")
      .setOrigin(0);
    this.backgroundNlo = this._scene.add
      .image(0, 0, "backgroundNlo")
      .setOrigin(0);
    this.backgroundSpace = this._scene.add
      .image(0, 0, "backgroundSpace")
      .setOrigin(0);

    const backgroundWidth = this.backgroundGround.width;
    let backgroundScaleWidthRatio = (width * 3) / backgroundWidth;
    backgroundScaleWidthRatio =
      backgroundScaleWidthRatio < 1 ? 1 : backgroundScaleWidthRatio;

    this.backgroundGround.setScale(backgroundScaleWidthRatio, 1);
    this.backgroundAir.setScale(backgroundScaleWidthRatio, 1);
    this.backgroundClouds.setScale(backgroundScaleWidthRatio, 1);
    this.backgroundNlo.setScale(backgroundScaleWidthRatio, 1);
    this.backgroundSpace.setScale(backgroundScaleWidthRatio, 1);

    this.backgroundGround.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      -this.backgroundGround.height + height
    );
    this.backgroundAir.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this.backgroundGround.y - this.backgroundAir.height
    );
    this.backgroundClouds.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this.backgroundAir.y - this.backgroundClouds.height
    );
    this.backgroundNlo.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this.backgroundClouds.y - this.backgroundNlo.height
    );
    this.backgroundSpace.setPosition(
      (-backgroundWidth * backgroundScaleWidthRatio) / 2 + width / 2,
      this.backgroundNlo.y - this.backgroundSpace.height
    );

    this.add([
      this.backgroundGround,
      this.backgroundAir,
      this.backgroundClouds,
      this.backgroundNlo,
      this.backgroundSpace,
    ]);
  }
}
