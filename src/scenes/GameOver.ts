import { Constants } from '~/util/Constants'

export class GameOver extends Phaser.Scene {
  private booksFinished: number = 0
  constructor() {
    super('game-over')
  }

  init(data) {
    this.booksFinished = data.booksFinished
  }

  create() {
    const gameOverText = this.add.text(0, 0, 'Game Over', {
      fontSize: '50px',
    })
    gameOverText.setPosition(
      Constants.GAME_WIDTH / 2 - gameOverText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - gameOverText.displayHeight / 2 - 50
    )

    const scoreText = this.add.text(0, 0, `You finished ${this.booksFinished} books`, {
      fontSize: '20px',
    })
    scoreText.setPosition(
      Constants.GAME_WIDTH / 2 - scoreText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - scoreText.displayHeight / 2 + 50
    )

    const subtitle = this.add.text(0, 0, 'Press enter to restart', {
      fontSize: '20px',
    })
    subtitle.setPosition(
      Constants.GAME_WIDTH / 2 - subtitle.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - subtitle.displayHeight / 2 + 100
    )
  }
}
