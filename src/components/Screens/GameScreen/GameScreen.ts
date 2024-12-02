import {
  BALLOON_STARTED_OFFSET,
  SWIPE_DIRECTIONS,
  SWIPE_VELOCITY,
} from "../../../constants";
import { Entity } from "../../Entities/Entity";
import { GameScreenView } from "./GameScreenView";

export class GameScreen {
  private _scene: Phaser.Scene;
  private _view: GameScreenView;
  private _gameScreenSwipeVelocity: number = SWIPE_VELOCITY;
  private _currentDirection = SWIPE_DIRECTIONS.NONE;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._scene = scene;

    this._view = new GameScreenView(scene, x, y);

    scene.add.container(x, y, this._view);
  }

  updateGameScreenPosition(x: number, y: number) {
    if (!x && !y) {
      this._currentDirection = SWIPE_DIRECTIONS.NONE;
    }

    this._view.setPosition(x, y);
  }

  isGroundLevel() {
    return (
      this.y < Math.abs(this._view.backgroundGround.y - BALLOON_STARTED_OFFSET)
    );
  }

  isAirLevel() {
    return (
      this.y > Math.abs(this._view.backgroundGround.y) &&
      this.y <= Math.abs(this._view.backgroundAir.y)
    );
  }

  isCloudsLevel() {
    return (
      this.y > Math.abs(this._view.backgroundAir.y) &&
      this.y <= Math.abs(this._view.backgroundClouds.y)
    );
  }

  isNloLevel() {
    return (
      this.y > Math.abs(this._view.backgroundClouds.y) &&
      this.y <= Math.abs(this._view.backgroundNlo.y)
    );
  }

  isSpaceLevel() {
    return (
      this.y > Math.abs(this._view.backgroundNlo.y) &&
      this.y <= Math.abs(this._view.backgroundSpace.y)
    );
  }

  update(backgroundSpeed: number) {
    const { width } = this._scene.sys.game.config;

    this.updateGameScreenPosition(this.x, this.y + backgroundSpeed);

    if (
      !this._currentDirection ||
      (this._currentDirection === SWIPE_DIRECTIONS.LEFT &&
        this._view.x === +width / 2) ||
      (this._currentDirection === SWIPE_DIRECTIONS.RIGHT &&
        this._view.x === -width / 2)
    ) {
      return;
    }

    let newX =
      this._view.x + this._gameScreenSwipeVelocity * this._currentDirection;

    if (
      Math.abs(newX) + Math.abs(this._view.x) ===
        this._gameScreenSwipeVelocity &&
      newX !== 0 &&
      this._view.x !== 0
    ) {
      newX = 0;
    }

    if (newX <= -width / 2 || newX >= +width / 2 || newX === 0) {
      newX !== 0
        ? this._view.setX((+width / 2) * this._currentDirection)
        : this._view.setX(0);
      this._currentDirection = SWIPE_DIRECTIONS.NONE;
    } else {
      this._view.setX(newX);
    }
  }

  addEntityOnScreen(enemy: Entity) {
    this._view.add(enemy.view);
  }

  moveToLeft() {
    this._currentDirection = SWIPE_DIRECTIONS.LEFT;
  }

  moveToRight() {
    this._currentDirection = SWIPE_DIRECTIONS.RIGHT;
  }

  get x() {
    return this._view.x;
  }

  get y() {
    return this._view.y;
  }
}
