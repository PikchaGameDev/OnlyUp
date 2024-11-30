import { LEVELS, LIST_OF_ENEMIES_BY_LEVEL } from "../../../constants";
import { IEntityView } from "../Entity";

export class EnemyView
  extends Phaser.GameObjects.Container
  implements IEntityView
{
  private _scene: Phaser.Scene;
  private _enemy: Phaser.GameObjects.Image;

  private _collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(scene: Phaser.Scene, x: number, y: number, currentLevel: LEVELS) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y, currentLevel);
  }

  build(x: number, y: number, currentLevel: LEVELS) {
    const enemyList = LIST_OF_ENEMIES_BY_LEVEL[currentLevel];

    const enemyName = enemyList[Math.floor(Math.random() * enemyList.length)];

    this._enemy = this._scene.add.image(x, y, enemyName).setOrigin(0.5);

    this._enemy.setScale(0.4, 0.4);

    this._collisionBox.width = this._enemy.width * 0.4;
    this._collisionBox.height = this._enemy.height * 0.4;

    this.add([this._enemy]);
  }

  destroy() {
    this._enemy.destroy();
  }

  get collisionBox() {
    this._collisionBox.x = this._enemy.x - this._collisionBox.width / 2;
    this._collisionBox.y = this._enemy.y - this._collisionBox.height / 2;

    return this._collisionBox;
  }

  get scaledWidth() {
    return this._enemy.width * 0.09;
  }

  get scaledHeight() {
    return this._enemy.height * 0.09;
  }
}
