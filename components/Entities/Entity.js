export default class Entity {
  _view;
  #isDead;

  constructor(view) {
    this._view = view;
  }

  get x() {
    return this._view.x;
  }

  set x(value) {
    this._view.setX(value);
  }

  get y() {
    return this._view.y;
  }
  set y(value) {
    this._view.setY(value);
  }

  get collisionBox() {
    return this._view.collisionBox;
  }

  get isDead() {
    return this.#isDead;
  }

  dead() {
    this.#isDead = true;
  }
}
