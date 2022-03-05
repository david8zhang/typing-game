import { Constants } from '~/util/Constants'

export class InputHandler {
  private game: Phaser.Scene
  private lettersTyped: Phaser.GameObjects.Text[] = []
  private lettersToType: Phaser.GameObjects.Text[] = []
  private textCorpus: string[] = []
  private textCorpusIndex: number = 0
  private previousWord: Phaser.GameObjects.Text | null = null
  private nextWord!: Phaser.GameObjects.Text
  private onNextWordHandlers: Function[] = []

  private didGoToNextWord: boolean = false

  constructor(game: Phaser.Scene) {
    this.game = game
    this.textCorpus = Constants.TEXT.split(' ')
    this.updateCurrWord()
    this.updateNextWord()
    this.handleInput()
  }

  addOnNextWordHandler(fn: Function) {
    this.onNextWordHandlers.push(fn)
  }

  updateCurrWord() {
    const word = this.textCorpus[this.textCorpusIndex]
    if (!word) {
      return
    }
    this.lettersToType.forEach((l) => l.destroy())
    this.lettersToType = []
    const letters = word.split('')
    let totalWidth = 0
    letters.forEach((l) => {
      const letterObj = this.game.add
        .text(0, 0, l, {
          fontSize: '40px',
        })
        .setDepth(100)
      this.lettersToType.push(letterObj)
      totalWidth += letterObj.width
    })
    this.lettersToType.forEach((obj, index) => {
      obj.setPosition(Constants.GAME_WIDTH / 2 - totalWidth / 2 + obj.displayWidth * index, 100)
    })
  }

  getCurrWordWidth() {
    return this.lettersToType.reduce((acc, curr) => {
      return acc + curr.displayWidth
    }, 0)
  }

  updateNextWord() {
    if (this.textCorpusIndex + 1 < this.textCorpus.length) {
      const widthOfCurrWord = this.getCurrWordWidth()
      const firstLetter = this.lettersToType[0]
      const spacingOffset = 50
      const nextWordToType = this.textCorpus[this.textCorpusIndex + 1]
      if (!this.nextWord) {
        this.nextWord = this.game.add.text(0, 0, nextWordToType, {
          fontSize: '30px',
        })
        this.nextWord.setPosition(firstLetter.x + widthOfCurrWord + spacingOffset, 105)
      } else {
        this.nextWord.setText(nextWordToType)
        this.nextWord.setPosition(firstLetter.x + widthOfCurrWord + spacingOffset, 105)
      }
    } else {
      this.nextWord.setText('')
    }
  }

  handleInput() {
    this.game.input.keyboard.on('keydown', (e) => {
      const keyPressed = e.key
      if (keyPressed.length == 1 && keyPressed != ' ') {
        this.didGoToNextWord = false
        this.addTypedLetter(keyPressed)
      }
      if (e.code == 'Backspace') {
        this.removeTypedLetter()
      }
      if (e.code == 'Space' && !this.didGoToNextWord) {
        this.didGoToNextWord = true
        this.gotoNextWord()
      }
    })
  }

  addTypedLetter(letter: string) {
    const letterObj = this.game.add
      .text(0, 0, letter, {
        fontSize: '40px',
      })
      .setDepth(100)
    this.lettersTyped.push(letterObj)
    const totalWidth = this.lettersTyped.reduce((acc, curr) => {
      return acc + curr.displayWidth
    }, 0)
    this.lettersTyped.forEach((obj, index) => {
      obj.setPosition(
        Constants.GAME_WIDTH / 2 - totalWidth / 2 + obj.displayWidth * index,
        Constants.GAME_HEIGHT / 2 - 100
      )
    })
  }

  removeTypedLetter() {
    const letterToDelete = this.lettersTyped.pop()
    if (letterToDelete) {
      letterToDelete?.destroy()
      const totalWidth = this.lettersTyped.reduce((acc, curr) => {
        return acc + curr.displayWidth
      }, 0)
      this.lettersTyped.forEach((obj, index) => {
        obj.setPosition(
          Constants.GAME_WIDTH / 2 - totalWidth / 2 + obj.displayWidth * index,
          Constants.GAME_HEIGHT / 2 - 100
        )
      })
    }
  }

  updatePrevWord(prevWordTyped: string) {
    if (this.textCorpusIndex > 0) {
      const firstLetter = this.lettersToType[0]
      const spacingOffset = 50
      const prevWord = this.textCorpus[this.textCorpusIndex - 1]
      if (!this.previousWord) {
        this.previousWord = this.game.add
          .text(0, 0, prevWord, {
            fontSize: '30px',
          })
          .setTintFill(prevWordTyped === prevWord ? 0x00ff00 : 0xff0000)
        this.previousWord.setPosition(
          firstLetter.x - this.previousWord.displayWidth - spacingOffset,
          105
        )
      } else {
        this.previousWord
          .setText(prevWord)
          .setPosition(firstLetter.x - this.previousWord.displayWidth - spacingOffset, 105)
          .setTintFill(prevWordTyped === prevWord ? 0x00ff00 : 0xff0000)
      }
    }
  }

  gotoNextWord() {
    const prevWordToType = this.lettersToType.reduce((acc, curr) => {
      return acc + curr.text
    }, '')
    const prevWordTyped = this.lettersTyped.reduce((acc, curr) => {
      return acc + curr.text
    }, '')
    this.textCorpusIndex++
    this.lettersToType.forEach((o) => o.destroy())
    this.lettersTyped.forEach((o) => o.destroy())
    this.lettersToType = []
    this.lettersTyped = []
    if (this.textCorpusIndex < this.textCorpus.length) {
      this.updateCurrWord()
      this.updateNextWord()
      this.updatePrevWord(prevWordTyped)
      this.onNextWordHandlers.forEach((handler) => {
        handler(prevWordToType === prevWordTyped)
      })
    }
  }

  highlightWordToType() {
    this.lettersToType.forEach((letter, index) => {
      const typed = this.lettersTyped[index]
      if (typed) {
        letter.setTintFill(letter.text == typed.text ? 0x00ff00 : 0xff0000)
      } else {
        letter.setTintFill(0xffffff)
      }
    })
  }

  update() {
    this.highlightWordToType()
  }
}
