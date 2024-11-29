export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  init() {
    this.URL = this.sys.game.URL;
  }

  preload() {
    this.load.setPath(this.URL + "assets/img");

    this.load.image("preloadBackground", "PreloadBackground.png");
  }

  create() {
    this.scene.start("Preload");
  }
}
