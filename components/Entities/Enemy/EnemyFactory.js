import { Enemy } from "./Enemy.js";
import { EnemyView } from "./EnemyView.js";

export default class EnemyFactory {
  _scene;

  constructor(scene) {
    this._scene = scene;
  }

  create(x, y, currentLevel) {
    const enemyView = new EnemyView(this._scene, x, y, currentLevel);

    const enemy = new Enemy(enemyView);

    enemy.x = x;
    enemy.y = y;

    return enemy;
  }
}
