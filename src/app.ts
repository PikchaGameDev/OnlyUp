import { Boot } from "./scenes/boot";
import { Preload } from "./scenes/preload";
import { Game } from "./scenes/game";
import Phaser from "phaser";
import { MAX_GAME_WIDTH } from "./constants";

export class App {
  start() {
    let scenes = [];

    scenes.push(new Boot());
    scenes.push(new Preload());
    scenes.push(new Game());

    const config = {
      title: "OnlyUp",
      type: Phaser.CANVAS,
      width:
        window.innerWidth > MAX_GAME_WIDTH ? MAX_GAME_WIDTH : window.innerWidth,
      height: window.innerHeight,
      scene: scenes,
      pixelArt: true,
      parent: "root",
      audio: { noAudio: true },
      disableContextMenu: true,
      loader: { maxParallelDownloads: 20 },
      banner: false,
      dom: {
        createContainer: true,
      },
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    new Phaser.Game(config);
  }
}
