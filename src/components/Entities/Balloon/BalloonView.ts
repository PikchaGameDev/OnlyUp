import { BALLOON_SCALE } from "../../../constants";
import { IEntityView } from "../Entity";

export class BalloonView
  extends Phaser.GameObjects.Container
  implements IEntityView
{
  private _scene: Phaser.Scene;
  private _balloon: Phaser.GameObjects.Image;

  private _collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x: number, y: number) {
    this._balloon = this._scene.add.image(x, y, "balloon").setOrigin(0.5);

    this._balloon.setScale(BALLOON_SCALE, BALLOON_SCALE);

    this._collisionBox.width = this._balloon.width * BALLOON_SCALE;
    this._collisionBox.height = this._balloon.height * BALLOON_SCALE;

    this.addedToScene();
  }

  get collisionBox() {
    this._collisionBox.x = this._balloon.x - this._collisionBox.width / 2;
    this._collisionBox.y = this._balloon.y - this._collisionBox.height / 2;

    return this._collisionBox;
  }

  get scaledWidth() {
    return this._balloon.width * BALLOON_SCALE;
  }

  get scaledHeight() {
    return this._balloon.height * BALLOON_SCALE;
  }

  destroy() {
    this._balloon.destroy();
  }
}
