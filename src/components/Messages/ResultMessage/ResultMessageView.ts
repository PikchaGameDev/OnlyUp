export class ResultMessageView extends Phaser.GameObjects.Container {
  private _scene: Phaser.Scene;
  private _winText: Phaser.GameObjects.Text;
  private _loseText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x: number, y: number) {
    this._winText = this.scene.add
      .text(x, y, "Ты победил!", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 40,
        color: "#00FF00",
      })
      .setOrigin(0.5);

    this._loseText = this.scene.add
      .text(x, y, "Ты проиграл!", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 40,
        color: "#FF0000",
      })
      .setOrigin(0.5);

    this.clearAllText();
  }

  showWinText() {
    this._winText.setVisible(true);
  }

  showLoseText() {
    this._loseText.setVisible(true);
  }

  clearAllText() {
    this._winText.setVisible(false);
    this._loseText.setVisible(false);
  }

  destroy() {
    this._winText.destroy();
    this._loseText.destroy();
  }
}
