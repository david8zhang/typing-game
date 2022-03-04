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
      length: Constants.GAME_WIDTH - 50,
      width: 25,
      position: {
        x: Constants.GAME_WIDTH / 2,
        y: 25,
      },
    })
  }
}
