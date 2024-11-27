import { PreloadScreen } from "../components/PreloadScreen.js";

const LevelObjects = [
  [
    { key: "background", path: "Background.png" },
    { key: "balloon", path: "Balloon.png" },
    { key: "leaf", path: "Leaf.png" },
    { key: "leaf1", path: "Leaf1.png" },
  ],
  [
    { key: "leaf2", path: "Leaf2.png" },
    { key: "leaf3", path: "Leaf3.png" },
    { key: "leaf4", path: "Leaf4.png" },
    { key: "bird1", path: "Bird1.png" },
    { key: "bird2", path: "Bird2.png" },
    { key: "bird3", path: "Bird3.png" },
  ],
  [
    { key: "dog", path: "Dog.png" },
    { key: "plane", path: "Plane.png" },
    { key: "package", path: "Package.png" },
    { key: "nlo", path: "NLO.png" },
  ],
  [
    { key: "nlo2", path: "NLO2.png" },
    { key: "saturn", path: "Saturn.png" },
    { key: "moon", path: "Moon.png" },
    { key: "frog", path: "Frog.png" },
    { key: "comet", path: "Comet.png" },
  ],
];

export class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload", active: false });
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;

    this._loadedLevels = 0;
  }

  preload() {
    this.load.setPath(this.URL + "assets/img");

    this._preloadScreen = new PreloadScreen(this);

    this.loadingAdditionalAssets(this._loadedLevels++);
  }

  create() {
    this.scene.start("Game");

    this.load.reset();

    while (this._loadedLevels < LevelObjects.length) {
      this.loadingAdditionalAssets(this._loadedLevels++);
    }

    this.load.start();

    this.events.on(Phaser.Scenes.Events.DESTROY, this.destroy.bind(this));
  }

  loadingAdditionalAssets(assetsIndex) {
    this.load.setPath(this.URL + "assets/img");

    LevelObjects[assetsIndex].forEach((texture) =>
      this.load.image(texture.key, texture.path)
    );
  }

  destroy() {
    this._preloadScreen.destroy();
  }
}
