export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  init() {
    this.URL = this.sys.game.URL;
  }

  preload() {
    this.load.setPath(this.URL + "assets/img");

    this.load.spritesheet("preloadBackground", "PreloadBackground.png", {
      frameWidth: 375,
      frameHeight: 812,
    });
  }

  create() {
    this.scene.start("Preload");
  }
}
