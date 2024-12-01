import Phaser from "phaser";

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("preloadBackground", "PreloadBackground.png");
  }

  create() {
    this.scene.start("Preload");
  }
}
