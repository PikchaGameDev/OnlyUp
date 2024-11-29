import { Balloon } from "./Balloon.js";
import { BalloonView } from "./BalloonView.js";

export default class BalloonFactory {
  _scene;

  constructor(scene) {
    this._scene = scene;
  }

  create(x, y) {
    const balloonView = new BalloonView(this._scene, x, y);

    const balloon = new Balloon(balloonView);

    balloon.x = x;
    balloon.y = y;

    return balloon;
  }
}
