import { TimerView } from "./TimerView.js";

export class Timer {
  _scene;
  _view;
  _timer;
  _timerLength;
  _timerStopCallback;

  constructor(scene, x, y) {
    this._scene = scene;

    this.CONFIG = this._scene.sys.game.CONFIG;

    this._view = new TimerView(scene, x, y);
  }

  startTimer(timerLength, timerStartNumber, timerStopCallback) {
    this._timerLength = timerLength;
    this._timerStopCallback = timerStopCallback;

    this._view.setTimerVisible(true);

    this.runNewTick(timerStartNumber);
  }

  runNewTick(currentTick) {
    this._view.setTimerText(String(currentTick));

    if (currentTick <= this._timerLength) {
      this._timer = setTimeout(() => {
        this.runNewTick(currentTick + 1);
      }, 1000);
    } else {
      this.stopTimer();
    }
  }

  isTimerRunning() {
    return Boolean(this._timer);
  }

  stopTimer() {
    clearTimeout(this._timer);

    this._view.setTimerVisible(false);

    this._view.setTimerText("");

    this._timerStopCallback();
  }
}
