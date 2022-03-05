import Phaser from 'phaser'
import { FanMeter } from '~/core/FanMeter'
import { Healthbar } from '~/core/Health'
import { InputHandler } from '~/core/InputHandler'
import { Constants } from '~/util/Constants'

export default class Game extends Phaser.Scene {
  private inputHandler!: InputHandler
  private fanMeter!: FanMeter
  constructor() {
    super('game')
  }

  create() {
    this.inputHandler = new InputHandler(this)
    this.fanMeter = new FanMeter(this)
    this.inputHandler.addOnNextWordHandler((isCorrect: boolean) => {
      if (isCorrect) {
        this.fanMeter.decreasePoints(Constants.CORRECT_WORD_SCORE)
      }
    })
    this.inputHandler.addOnFinishedBookHandler((wordsTyped: string[], textCorpus: string[]) => {
      this.scene.start('book-finished', {
        wordsTyped,
        textCorpus,
      })
    })
  }

  update() {
    this.inputHandler.update()
  }
}
