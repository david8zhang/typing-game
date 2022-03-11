import Game from '~/scenes/Game'
import { Constants } from '~/util/Constants'
import { Healthbar } from './Health'

export class FanMeter {
  private game: Game
  private frustrationBar: Healthbar
  private frustrationEvent: Phaser.Time.TimerEvent

  constructor(game: Game, booksFinished: number) {
    this.game = game
    this.frustrationBar = new Healthbar(this.game, {
      maxHealth: 100,
      currHealth: 0,
      length: Constants.GAME_WIDTH - 50,
      width: 25,
      position: {
        x: Constants.GAME_WIDTH / 2,
        y: 25,
      },
    })
    this.frustrationEvent = this.game.time.addEvent({
      repeat: -1,
      callback: () => {
        const increaseAmt = Math.max(1, Math.round(Math.log2(booksFinished + 1)))
        this.frustrationBar.increaseHealth(increaseAmt)
      },
      delay: Math.max(25, 250 - booksFinished * 10),
    })
    this.frustrationBar.setOnLoseAllHealthHandler(() => {
      this.game.onGameOver()
    })
  }

  decreasePoints(points: number) {
    this.frustrationBar.decreaseHealth(points)
  }
}
