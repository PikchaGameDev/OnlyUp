import { Balloon } from "../components/Balloon.js";
import { GameScreen } from "../components/GameScreen.js";
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
    this._gameScreen = new GameScreen(this);
    this._balloon = new Balloon(this);

    new Swipe(this, {
      swipeDetectedCallback: (direction) => {
        console.log(direction);

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
    if (this._gameScreen.y === 11052 - this.cameras.main.height) {
      return;
    }

    this._gameScreen.updateGameScreenPosition(
      this._gameScreen.x,
      this._gameScreen.y + this._backSpeed
    );

    this._gameScreen.update();
  }
}
