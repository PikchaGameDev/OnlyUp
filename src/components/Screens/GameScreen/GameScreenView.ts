export class GameScreenView extends Phaser.GameObjects.Container {
  private _scene: Phaser.Scene;
  private _backgroundScaleWidthRatio: number;

  public backgroundGround: Phaser.GameObjects.Image;
  public backgroundAir: Phaser.GameObjects.Image;
  public backgroundClouds: Phaser.GameObjects.Image;
  public backgroundNlo: Phaser.GameObjects.Image;
  public backgroundSpace: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this._scene = scene;

    this.build();
  }

  build() {
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

    this.setBackgroundScaleWidthRatio(this.backgroundGround.width);

    this.createGroundLevel();
    this.createAirLevel();
    this.createCloudsLevel();
    this.createNloLevel();
    this.createSpaceLevel();

    this.add([
      this.backgroundGround,
      this.backgroundAir,
      this.backgroundClouds,
      this.backgroundNlo,
      this.backgroundSpace,
    ]);
  }

  setBackgroundScaleWidthRatio(backgroundWidth: number) {
    const { width } = this._scene.sys.game.config;

    this._backgroundScaleWidthRatio = (+width * 3) / backgroundWidth;
    this._backgroundScaleWidthRatio =
      this._backgroundScaleWidthRatio < 1 ? 1 : this._backgroundScaleWidthRatio;
  }

  createGroundLevel() {
    const { width, height } = this._scene.sys.game.config;

    this.backgroundGround.setScale(this._backgroundScaleWidthRatio, 1);
    this.backgroundGround.setPosition(
      (-this.backgroundGround.width * this._backgroundScaleWidthRatio) / 2 +
        +width / 2,
      -this.backgroundGround.height + +height
    );
  }

  createAirLevel() {
    const { width } = this._scene.sys.game.config;

    this.backgroundAir.setScale(this._backgroundScaleWidthRatio, 1);
    this.backgroundAir.setPosition(
      (-this.backgroundAir.width * this._backgroundScaleWidthRatio) / 2 +
        +width / 2,
      this.backgroundGround.y - this.backgroundAir.height
    );
  }

  createCloudsLevel() {
    const { width } = this._scene.sys.game.config;

    this.backgroundClouds.setScale(this._backgroundScaleWidthRatio, 1);

    this.backgroundClouds.setPosition(
      (-this.backgroundClouds.width * this._backgroundScaleWidthRatio) / 2 +
        +width / 2,
      this.backgroundAir.y - this.backgroundClouds.height
    );
  }

  createNloLevel() {
    const { width } = this._scene.sys.game.config;

    this.backgroundNlo.setScale(this._backgroundScaleWidthRatio, 1);

    this.backgroundNlo.setPosition(
      (-this.backgroundNlo.width * this._backgroundScaleWidthRatio) / 2 +
        +width / 2,
      this.backgroundClouds.y - this.backgroundNlo.height
    );
  }

  createSpaceLevel() {
    const { width } = this._scene.sys.game.config;

    this.backgroundSpace.setScale(this._backgroundScaleWidthRatio, 1);

    this.backgroundSpace.setPosition(
      (-this.backgroundSpace.width * this._backgroundScaleWidthRatio) / 2 +
        +width / 2,
      this.backgroundNlo.y - this.backgroundSpace.height
    );
  }
}
