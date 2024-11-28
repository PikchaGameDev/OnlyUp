import BalloonFactory from "../components/Entities/Balloon/BalloonFactory.js";
import { GameScreen } from "../components/Screens/GameScreen/GameScreen.js";
import { Swipe } from "../utils/swipe.js";

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game", active: false });
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;

    this._backSpeed = 1;
    this._currentLevel = 1;
  }

  create() {
    const { width, height } = this.CONFIG;

    this._gameScreen = new GameScreen(this, 0, 0);

    this._balloon = new BalloonFactory(this, width / 2, height - 200);

    new Swipe(this, {
      swipeDetectedCallback: (direction) => {
        switch (direction) {
          case "RIGHT":
            this._gameScreen.moveToRight();
            break;
          case "LEFT":
            this._gameScreen.moveToLeft();
            break;

          default:
            break;
        }
      },
    });
  }

  update() {
    this.updateGameScreen();
  }

  updateGameScreen() {
    if (this._gameScreen.y === 11052 - this.CONFIG.height) {
      return;
    }

    this._gameScreen.updateGameScreenPosition(
      this._gameScreen.x,
      this._gameScreen.y + this._backSpeed
    );

    this._gameScreen.update();
  }
}
