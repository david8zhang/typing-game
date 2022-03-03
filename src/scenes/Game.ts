import Phaser from 'phaser'
import { Constants } from '~/util/Constants'

export default class Game extends Phaser.Scene {
  private lettersTyped: string[] = []
  private lettersToType: Phaser.GameObjects.Text[] = []
  private textCorpus: string[] = Constants.TEXT.replace(/[.,\/#'?!$%\^&\*;:{}=\-_`~()]/g, '').split(
    ' '
  )
  private textCorpusIndex: number = 0
  private previousWord: Phaser.GameObjects.Text | null = null
  private nextWord!: Phaser.GameObjects.Text

  constructor() {
    super('game')
  }

  create() {
    this.updateCurrWord()
    this.updateNextWord()
    this.handleInput()
  }

  updateCurrWord() {
    const word = this.textCorpus[this.textCorpusIndex].toUpperCase()
    if (!word) {
      return
    }
    this.lettersToType.forEach((l) => l.destroy())
    this.lettersToType = []
    const letters = word.split('')
    let totalWidth = 0
    letters.forEach((l, index) => {
      const letterObj = this.add
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
      const nextWordToType = this.textCorpus[this.textCorpusIndex + 1].toUpperCase()
      if (!this.nextWord) {
        this.nextWord = this.add.text(0, 0, nextWordToType, {
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
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((k) => `Key${k}`)
    this.input.keyboard.on('keydown', (e) => {
      const keyPressed = e.code.split('Key')[1]
      if (keyPressed) {
        this.lettersTyped.push(keyPressed)
      }
      if (e.code == 'Backspace') {
        this.lettersTyped.pop()
      }
      if (this.lettersTyped.length === this.lettersToType.length) {
        this.gotoNextWord()
      }
    })
  }

  updatePrevWord(prevWordTyped: string) {
    if (this.textCorpusIndex > 0) {
      const firstLetter = this.lettersToType[0]
      const spacingOffset = 50
      const prevWord = this.textCorpus[this.textCorpusIndex - 1].toUpperCase()
      if (!this.previousWord) {
        this.previousWord = this.add
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
    const prevWordTyped = this.lettersTyped.join('')
    this.textCorpusIndex++
    this.lettersTyped = []
    if (this.textCorpusIndex < this.textCorpus.length) {
      this.updateCurrWord()
      this.updateNextWord()
      this.updatePrevWord(prevWordTyped)
    }
  }

  highlightWordToType() {
    this.lettersToType.forEach((letter, index) => {
      const typed = this.lettersTyped[index]
      if (typed) {
        letter.setTintFill(letter.text == typed.toUpperCase() ? 0x00ff00 : 0xff0000)
      } else {
        letter.setTintFill(0xffffff)
      }
    })
  }

  update() {
    this.highlightWordToType()
  }
}
