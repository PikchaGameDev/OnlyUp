export class PreloadScreenView extends Phaser.GameObjects.Container {
  private _scene: Phaser.Scene;

  public progressBar: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this._scene = scene;

    this.build();
  }

  build() {
    const { width, height } = this._scene.sys.game.config;

    const background = this._scene.add
      .image(0, 0, "preloadBackground")
      .setOrigin(0);

    background.setScale(+width / background.width, +height / background.height);

    this.progressBar = this._scene.add.graphics({
      x: +width / 2 - 141 / 2,
      y: (+height * 3) / 4,
    });
    const progressBorder = this._scene.add.graphics({
      x: +width / 2 - 141 / 2,
      y: (+height * 3) / 4,
    });

    progressBorder.fillStyle(0x38366d, 1);
    progressBorder.fillRect(0, 0, 141, 5);

    this.add([progressBorder, this.progressBar]);

    this.setSize(+width, +height);
  }
}
