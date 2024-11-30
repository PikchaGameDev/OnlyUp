import { Boot } from "./scenes/boot";
import { Preload } from "./scenes/preload";
import { Game } from "./scenes/game";
import Phaser from "phaser";

export class App {
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

    new Phaser.Game(config);
  }
}
