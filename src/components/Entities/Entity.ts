import { Collider } from "../../utils/physics";

export interface IEntityView extends Phaser.GameObjects.Container {
  collisionBox: Collider;
}

export class Entity {
  private _view: IEntityView;
  protected _isDead: boolean;

  constructor(view: IEntityView) {
    this._view = view;
  }

  get x() {
    return this._view.x;
  }

  get view() {
    return this._view;
  }

  set x(value) {
    this._view.setX(value);
  }

  setVisible(isVisible: boolean) {
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
    return this._isDead;
  }

  destroy() {
    this._view.destroy();
  }

  dead() {
    this._isDead = true;
  }
}
