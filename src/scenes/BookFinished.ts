import { Constants } from '~/util/Constants'

export default class BookFinished extends Phaser.Scene {
  private accuracy: number = 0

  constructor() {
    super('book-finished')
  }

  init(data) {
    const { wordsTyped, textCorpus } = data
    let numCorrect = 0
    wordsTyped.forEach((word, index) => {
      if (word == textCorpus[index]) {
        numCorrect++
      }
    })
    this.accuracy = Math.round((numCorrect / textCorpus.length) * 100)
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
  }
}
