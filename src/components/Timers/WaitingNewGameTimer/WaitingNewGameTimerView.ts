export interface IWaitingNewGameTimerView {
  build(x: number, y: number): void;
  setTimerText(text: string): void;
  setTimerVisible(isVisible: boolean): void;
  destroy(): void;
}

export class WaitingNewGameTimerView
  extends Phaser.GameObjects.Container
  implements IWaitingNewGameTimerView
{
  private _scene: Phaser.Scene;
  private _timerText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x: number, y: number) {
    this._timerText = this._scene.add
      .text(x, y, "", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 30,
      })
      .setOrigin(0.5);

    this._timerText.setVisible(false);
  }

  setTimerText(text: string) {
    this._timerText.setText(text);
  }

  setTimerVisible(isVisible: boolean) {
    this._timerText.setVisible(isVisible);
  }

  destroy() {
    this._timerText.destroy();
  }
}
