import { Constants } from '~/util/Constants'

export class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over')
  }

  create() {
    const gameOverText = this.add.text(0, 0, 'Game Over', {
      fontSize: '50px',
    })
    gameOverText.setPosition(
      Constants.GAME_WIDTH / 2 - gameOverText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - gameOverText.displayHeight / 2
    )
  }
}
