import Phaser from "phaser";
import BalloonFactory from "../components/Entities/Balloon/BalloonFactory";
import { Enemy } from "../components/Entities/Enemy/Enemy";
import EnemyFactory from "../components/Entities/Enemy/EnemyFactory";
import { Entity } from "../components/Entities/Entity";
import { ResultMessage } from "../components/Messages/ResultMessage/ResultMessage";
import { GameScreen } from "../components/Screens/GameScreen/GameScreen";
import { WaitingNewGameTimer } from "../components/Timers/WaitingNewGameTimer/WaitingNewGameTimer";
import { LEVELS } from "../constants";
import Physics from "../utils/physics";
import { DIRECTIONS, Swipe } from "../utils/swipe";
import { getRandomInt } from "../utils/utils";

export class Game extends Phaser.Scene {
  private _balloonFactory: BalloonFactory;
  private _enemyFactory: EnemyFactory;

  private _resultMessagesBox: ResultMessage;
  private _waitingNewGameTimer: WaitingNewGameTimer;
  private _balloon: Entity;
  private _gameScreen: GameScreen;

  private _currentLevel = LEVELS.GROUND;

  private _spawnTimer: ReturnType<typeof setInterval>;
  private _waitingAfterGameTimer: ReturnType<typeof setTimeout>;

  private _enemies: Enemy[] = [];
  private _isGamePaused = false;
  private _backgroundSpeed = 1;

  constructor() {
    super({ key: "Game", active: false });

    this._balloonFactory = new BalloonFactory(this);

    this._enemyFactory = new EnemyFactory(this);
  }

  create() {
    const { width, height } = this.sys.game.config;

    this._gameScreen = new GameScreen(this, 0, 0);

    this._resultMessagesBox = new ResultMessage(this, +width / 2, +height / 2);
    this._waitingNewGameTimer = new WaitingNewGameTimer(
      this,
      +width / 2,
      +height / 2
    );

    this._balloon = this._balloonFactory.create(+width / 2, +height - 200);

    new Swipe(this, {
      swipeDetectedCallback: this.handleSwipe.bind(this),
    });

    this.startSpawnEnemies();
  }

  handleSwipe(direction: DIRECTIONS) {
    switch (direction) {
      case DIRECTIONS.RIGHT:
        this._gameScreen.moveToRight();
        break;
      case DIRECTIONS.LEFT:
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
    const { width, height } = this.sys.game.config;
    const x_coords = [0, +width / 4, +width / 2];

    this._spawnTimer = setInterval(() => {
      this.setCurrentLevel();

      const newYForEnemy = -(this._gameScreen.y + 200) / 2;

      if (newYForEnemy > -11052 + +height) {
        const newEnemy = this._enemyFactory.create(
          x_coords[getRandomInt(0, x_coords.length)],
          newYForEnemy,
          this._currentLevel
        );

        this._gameScreen.addEntityOnScreen(newEnemy);

        this._enemies.push(newEnemy);
      }
    }, 3000);
  }

  clearLevel() {
    const { width, height } = this.sys.game.config;

    clearInterval(this._spawnTimer);

    this._enemies.forEach((enemy) => {
      enemy.destroy();
    });

    this._enemies = [];

    this._balloon = this._balloonFactory.create(+width / 2, +height - 200);

    this._gameScreen.updateGameScreenPosition(0, 0);

    this._isGamePaused = true;
  }

  checkDamage(entity: Entity) {
    const { width } = this.sys.game.config;

    for (let damager of this._enemies) {
      if (
        Physics.isCheckIntersection(
          {
            width: entity.collisionBox.width,
            height: entity.collisionBox.height,
            x:
              (this._gameScreen.x - +width / 2) * -1 -
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

        this._resultMessagesBox.showLoseText();

        this.startWaitingTimer();

        break;
      }
    }
  }

  startWaitingTimer() {
    this._waitingAfterGameTimer = setTimeout(() => {
      this.clearLevel();

      this.startSpawnEnemies();

      this._resultMessagesBox.clearAllText();

      this._waitingNewGameTimer.startTimer(3, 1, () => {
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
    const { height } = this.sys.game.config;

    if (this._gameScreen.y === 11052 - +height) {
      this._isGamePaused = true;

      this._resultMessagesBox.showWinText();

      this.startWaitingTimer();

      return;
    }

    this._gameScreen.update(this._backgroundSpeed);

    this.checkDamage(this._balloon);
  }

  destroy() {
    clearTimeout(this._waitingAfterGameTimer);
    clearInterval(this._spawnTimer);
    this._waitingNewGameTimer.stopTimer();

    this.destroy();
  }
}
