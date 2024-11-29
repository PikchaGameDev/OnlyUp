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

  setVisible(isVisible) {
    this._view.setVisible(isVisible);
  }

  get y() {
    return this._view.y;
  }
  set y(value) {
    this._view.setY(value);
  }

  get width() {
    return this._view.width;
  }

  get height() {
    return this._view.height;
  }

  get collisionBox() {
    return this._view.collisionBox;
  }

  get isDead() {
    return this.#isDead;
  }

  destroy() {
    this._view.destroy();
  }

  dead() {
    this.#isDead = true;
  }
}
