import Phaser from "phaser";

export class Boot extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  preload() {
    this.load.setPath("assets");

    console.log("aaaaaaaaa2");

    this.load.image("preloadBackground", "PreloadBackground.png");
  }

  create() {
    console.log("aaaaaaaaa1");

    this.scene.start("Preload");
  }
}
