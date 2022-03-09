import Phaser from 'phaser'
import { FanMeter } from '~/core/FanMeter'
import { InputHandler } from '~/core/InputHandler'
import { TextGenerator } from '~/core/TextGenerator'
import { Constants } from '~/util/Constants'

export default class Game extends Phaser.Scene {
  private inputHandler!: InputHandler
  private fanMeter!: FanMeter
  private booksFinished: number = 0

  constructor() {
    super('game')
  }

  init(data) {
    if (data.bookFinished) {
      this.booksFinished += data.bookFinished
      console.log(this.booksFinished)
    }
  }

  create() {
    this.inputHandler = new InputHandler(this, TextGenerator.generateText(10))
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

  onGameOver() {
    this.scene.start('game-over')
  }

  update() {
    this.inputHandler.update()
  }
}
