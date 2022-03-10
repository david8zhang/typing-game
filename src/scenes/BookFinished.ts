import { Constants } from '~/util/Constants'

export default class BookFinished extends Phaser.Scene {
  private accuracy: number = 0
  private wordsPerMinute: number = 0

  constructor() {
    super('book-finished')
  }

  init(data) {
    const { wordsTyped, textCorpus, secondsPassed } = data
    let numCorrect = 0
    wordsTyped.forEach((word, index) => {
      if (word == textCorpus[index]) {
        numCorrect++
      }
    })
    this.accuracy = Math.round((numCorrect / textCorpus.length) * 100)
    const minutes = secondsPassed / 60
    this.wordsPerMinute = Math.round(wordsTyped.length / minutes)
  }

  create() {
    const bookFinishedText = this.add.text(0, 0, 'Book Finished!', {
      fontSize: '40px',
    })
    bookFinishedText.setPosition(
      Constants.GAME_WIDTH / 2 - bookFinishedText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 - bookFinishedText.displayHeight / 2
    )
    const accuracyText = this.add.text(0, 0, `Accuracy ${this.accuracy}%`, {
      fontSize: '20px',
    })
    accuracyText.setPosition(
      Constants.GAME_WIDTH / 2 - accuracyText.displayWidth / 2,
      Constants.GAME_HEIGHT / 2 + accuracyText.displayHeight
    )

    const wordsPerMinuteText = this.add.text(0, 0, `Words per minute: ${this.wordsPerMinute}`, {
      fontSize: '20px',
    })
    wordsPerMinuteText.setPosition(
      Constants.GAME_WIDTH / 2 - wordsPerMinuteText.displayWidth / 2,
      accuracyText.y + wordsPerMinuteText.displayHeight
    )

    const inputText = this.add.text(0, 0, 'Press Space to Continue', {
      fontSize: '20px',
    })
    inputText.setPosition(
      Constants.GAME_WIDTH / 2 - inputText.displayWidth / 2,
      wordsPerMinuteText.y + inputText.displayHeight
    )

    this.input.keyboard.on('keydown', (e) => {
      if (e.code === 'Space') {
        this.scene.start('game', {
          bookFinished: 1,
        })
      }
    })
  }
}
