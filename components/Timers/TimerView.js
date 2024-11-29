export class TimerView extends Phaser.GameObjects.Container {
  _scene;
  _timerText;

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x, y) {
    this._timerText = this.scene.add
      .text(x, y, "", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 30,
      })
      .setOrigin(0.5);

    this._timerText.setVisible(false);

    this.addedToScene([this._timerText]);
  }

  setTimerText(text) {
    this._timerText.setText(text);
  }

  setTimerVisible(isVisible) {
    this._timerText.setVisible(isVisible);
  }

  destroy() {
    this._timerText.destroy();
  }
}
