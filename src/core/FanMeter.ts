import Game from '~/scenes/Game'
import { Constants } from '~/util/Constants'
import { Healthbar } from './Health'

export class FanMeter {
  private game: Game
  private frustrationBar: Healthbar
  constructor(game: Game) {
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
    this.game.time.addEvent({
      repeat: -1,
      callback: () => {
        this.frustrationBar.increaseHealth(Constants.HEALTH_DECREASE_RATE)
      },
      delay: 250,
    })
    this.frustrationBar.setOnLoseAllHealthHandler(() => {
      this.game.onGameOver()
    })
  }

  decreasePoints(points: number) {
    this.frustrationBar.decreaseHealth(points)
  }
}
