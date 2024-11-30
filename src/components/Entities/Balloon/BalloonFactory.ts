import { Balloon } from "./Balloon.js";
import { BalloonView } from "./BalloonView.js";

export default class BalloonFactory {
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  create(x: number, y: number) {
    const balloonView = new BalloonView(this._scene, x, y);

    const balloon = new Balloon(balloonView);

    balloon.x = x;
    balloon.y = y;

    return balloon;
  }
}
