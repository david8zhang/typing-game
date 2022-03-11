import { Constants } from '~/util/Constants'

export class Start extends Phaser.Scene {
  constructor() {
    super('start')
  }

  create() {
    const titleText = this.add.text(0, 0, 'Book Master', {
      fontSize: '50px',
    })
    titleText.setPosition(
      Constants.GAME_WIDTH / 2 - titleText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - titleText.displayHeight / 2 - 100
    )

    const subtitleText = this.add.text(0, 0, 'Press enter to start', {
      fontSize: '20px',
    })
    subtitleText.setPosition(
      Constants.GAME_WIDTH / 2 - subtitleText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - subtitleText.displayHeight / 2
    )

    this.input.keyboard.on('keydown', (e) => {
      if (e.code === 'Enter') {
        this.scene.start('game')
      }
    })
  }
}
