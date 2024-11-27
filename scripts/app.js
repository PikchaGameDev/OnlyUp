import { Boot } from "../scenes/boot.js";
import { Preload } from "../scenes/preload.js";
import { Game } from "../scenes/game.js";

export class App {
  constructor() {
    this.VERSION = "0.0.1";
  }

  start() {
    let scenes = [];

    scenes.push(new Boot());
    scenes.push(new Preload());
    scenes.push(new Game());

    const config = {
      title: "OnlyUp",
      width: window.innerWidth,
      height: window.innerHeight,
      scene: scenes,
      pixelArt: true,
      parent: "root",
      backgroundColor: 0xffffff,
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      audio: { noAudio: true },
      disableContextMenu: true,
      loader: { maxParallelDownloads: 20 },
      banner: false,
      dom: {
        createContainer: true,
      },
    };

    let game = new Phaser.Game(config);

    game.URL = "";

    game.CONFIG = {
      type: Phaser.CANVAS,
      width: config.width,
      height: config.height,
      centerX: Math.round(0.5 * config.width),
      centerY: Math.round(0.5 * config.height),
      tile: 16,
    };
  }
}
