import BalloonFactory from "../components/Entities/Balloon/BalloonFactory.js";
import EnemyFactory from "../components/Entities/Enemy/EnemyFactory.js";
import { GameScreen } from "../components/Screens/GameScreen/GameScreen.js";
import Physics from "../utils/physics.js";
import { Message } from "../components/Messages/Message.js";
import { Timer } from "../components/Timers/Timer.js";
import { Swipe } from "../utils/swipe.js";
import { getRandomInt } from "../utils/utils.js";

export class Game extends Phaser.Scene {
  _balloonFactory;
  _enemyFactory;
  _messagesBox;
  _timer;
  _currentLevel = 0;
  _enemies = [];
  _isGamePaused = false;
  _balloon;
  _spawnTimer;
  _waitingAfterGameTimer;

  constructor() {
    super({ key: "Game", active: false });

    this._balloonFactory = new BalloonFactory(this);

    this._enemyFactory = new EnemyFactory(this);
  }

  init() {
    this.URL = this.sys.game.URL;
    this.CONFIG = this.sys.game.CONFIG;

    this._backgroundSpeed = 1;
    this._currentLevel = 1;
  }

  create() {
    const { width, height } = this.CONFIG;

    this._gameScreen = new GameScreen(this, 0, 0);

    this._messagesBox = new Message(this, width / 2, height / 2);
    this._timer = new Timer(this, width / 2, height / 2);

    this._balloon = this._balloonFactory.create(width / 2, height - 200);

    new Swipe(this, {
      swipeDetectedCallback: this.handleSwipe.bind(this),
    });

    this.startSpawnEnemies();
  }

  handleSwipe(direction) {
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
  }

  update() {
    if (this._balloon.isDead || this._isGamePaused) {
      return;
    }

    if (!this._isGamePaused) {
      this.updateGameScreen();
    } else {
    }
  }

  startSpawnEnemies() {
    const { width, height } = this.CONFIG;
    const x_coords = [0, width / 4, width / 2];

    this._spawnTimer = setInterval(() => {
      this.setCurrentLevel();

      const newYForEnemy = -(this._gameScreen.y + 200) / 2;

      if (newYForEnemy > -11052 + height) {
        const newEnemy = this._enemyFactory.create(
          x_coords[getRandomInt(0, x_coords.length)],
          newYForEnemy,
          this._currentLevel
        );

        this._gameScreen.addEntityOnScreen(newEnemy);

        this._enemies.push(newEnemy);
      }
    }, 2500);
  }

  clearLevel() {
    const { width, height } = this.CONFIG;

    clearInterval(this._spawnTimer);

    this._enemies.forEach((enemy) => {
      enemy.destroy();
    });

    this._enemies = [];

    this._balloon = this._balloonFactory.create(width / 2, height - 200);

    this._gameScreen.updateGameScreenPosition(0, 0);

    this._isGamePaused = true;
  }

  checkDamage(entity) {
    const { width } = this.CONFIG;

    for (let damager of this._enemies) {
      if (
        Physics.isCheckIntersection(
          {
            width: entity.collisionBox.width,
            height: entity.collisionBox.height,
            x:
              (this._gameScreen.x - width / 2) * -1 -
              entity.collisionBox.width / 2,
            y: -(this._gameScreen.y - entity.collisionBox.y),
          },
          {
            width: damager.collisionBox.width,
            height: damager.collisionBox.height,
            x: damager.collisionBox.x * 2 + damager.collisionBox.width / 2,
            y: damager.collisionBox.y * 2 + damager.collisionBox.height / 2,
          }
        )
      ) {
        entity.dead();

        this._messagesBox.showLoseText();

        this.startWaitingTimer();

        break;
      }
    }
  }

  startWaitingTimer() {
    this._waitingAfterGameTimer = setTimeout(() => {
      this.clearLevel();

      this.startSpawnEnemies();

      this._messagesBox.clearAllText();

      this._timer.startTimer(3, 1, () => {
        this._isGamePaused = false;
      });
    }, 3000);
  }

  setCurrentLevel() {
    if (this._gameScreen.isGroundLevel()) {
      this._currentLevel = 0;
      return;
    }

    if (this._gameScreen.isAirLevel()) {
      this._currentLevel = 1;
      return;
    }

    if (this._gameScreen.isCloudsLevel()) {
      this._currentLevel = 2;
      return;
    }

    if (this._gameScreen.isNloLevel()) {
      this._currentLevel = 3;
      return;
    }

    if (this._gameScreen.isSpaceLevel()) {
      this._currentLevel = 4;
      return;
    }
  }

  updateGameScreen() {
    if (this._gameScreen.y === 11052 - this.CONFIG.height) {
      this._isGamePaused = true;

      this._messagesBox.showWinText();

      this.startWaitingTimer();

      return;
    }

    this._gameScreen.update(this._backgroundSpeed);

    this.checkDamage(this._balloon);
  }

  destroy() {
    clearTimeout(this._waitingAfterGameTimer);

    this.destroy();
  }
}
