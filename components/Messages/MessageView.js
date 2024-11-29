export class MessageView extends Phaser.GameObjects.Container {
  _scene;
  _winText;
  _loseText;

  constructor(scene, x, y) {
    super(scene, x, y);

    this._scene = scene;

    this.build(x, y);
  }

  build(x, y) {
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

    this.addedToScene([this._winText, this._loseText]);
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
    this._balloon.destroy();
  }
}
