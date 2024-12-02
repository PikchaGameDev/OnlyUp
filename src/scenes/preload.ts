import Phaser from "phaser";
import {
  IPreloadScreen,
  PreloadScreen,
} from "../components/Screens/PreloadScreen/PreloadScreen";
import { LEVEL_ASSETS } from "../constants";

export class Preload extends Phaser.Scene {
  private _loadedLevels: number = 0;
  private _preloadScreen: IPreloadScreen;

  constructor() {
    super({ key: "Preload", active: false });
  }

  init() {
    this._loadedLevels = 0;
  }

  preload() {
    this.load.setPath("assets");

    this._preloadScreen = new PreloadScreen(this, 0, 0);

    this.loadingAdditionalAssets(this._loadedLevels++);
    this.loadingAdditionalAssets(this._loadedLevels++);
  }

  create() {
    this.scene.start("Game");

    this.load.reset();

    while (this._loadedLevels < LEVEL_ASSETS.length) {
      this.loadingAdditionalAssets(this._loadedLevels++);
    }

    this.load.start();

    this.events.on(Phaser.Scenes.Events.DESTROY, this.destroy.bind(this));
  }

  loadingAdditionalAssets(assetsIndex: number) {
    this.load.setPath("assets");

    LEVEL_ASSETS[assetsIndex].forEach((texture) =>
      this.load.image(texture.key, texture.path)
    );
  }

  destroy() {
    this._preloadScreen.destroy();
  }
}
