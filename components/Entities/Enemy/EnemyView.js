const LIST_OF_ENEMIES_BY_LEVEL = [
  ["leaf", "leaf1"],
  ["leaf2", "leaf3", "leaf4", "bird1", "bird2", "bird3"],
  ["dog", "plane", "package"],
  ["nlo"],
  ["comet", "frog", "moon", "saturn", "nlo2"],
];

export class EnemyView extends Phaser.GameObjects.Container {
  _scene;
  _enemy;

  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(scene, x, y, currentLevel) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y, currentLevel);
  }

  build(x, y, currentLevel) {
    const enemyList = LIST_OF_ENEMIES_BY_LEVEL[currentLevel];

    const enemyName = enemyList[Math.floor(Math.random() * enemyList.length)];

    this._enemy = this._scene.add.image(x, y, enemyName).setOrigin(0.5);

    this._enemy.setScale(0.4, 0.4);

    this.#collisionBox.width = this._enemy.width * 0.4;
    this.#collisionBox.height = this._enemy.height * 0.4;

    this.add([this._enemy]);
  }

  destroy() {
    this._enemy.destroy();
  }

  get collisionBox() {
    this.#collisionBox.x = this._enemy.x - this.#collisionBox.width / 2;
    this.#collisionBox.y = this._enemy.y - this.#collisionBox.height / 2;

    return this.#collisionBox;
  }

  get width() {
    return this._enemy.width * 0.09;
  }

  get height() {
    return this._enemy.height * 0.09;
  }
}
