import { WaitingNewGameTimerView } from "./WaitingNewGameTimerView";

export interface IWaitingNewGameTimer {
  startTimer(
    timerLength: number,
    timerStartNumber: number,
    timerStopCallback: () => void
  ): void;
  runNewTick(currentTick: number): void;
  isTimerRunning(): boolean;
  stopTimer(): void;
}

export class WaitingNewGameTimer implements IWaitingNewGameTimer {
  private _scene: Phaser.Scene;
  private _view: WaitingNewGameTimerView;
  private _timer: ReturnType<typeof setTimeout>;
  private _timerLength: number;
  private _timerStopCallback: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._scene = scene;

    this._view = new WaitingNewGameTimerView(scene, x, y);
  }

  startTimer(
    timerLength: number,
    timerStartNumber: number,
    timerStopCallback: () => void
  ) {
    this._timerLength = timerLength;
    this._timerStopCallback = timerStopCallback;

    this._view.setTimerVisible(true);

    this.runNewTick(timerStartNumber);
  }

  runNewTick(currentTick: number) {
    this._view.setTimerText(String(currentTick));

    if (currentTick >= 1) {
      this._timer = setTimeout(() => {
        this.runNewTick(currentTick - 1);
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

    this._timer = 0;

    this._view.setTimerVisible(false);

    this._view.setTimerText("");

    this._timerStopCallback();
  }
}
