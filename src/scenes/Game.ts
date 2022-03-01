import Phaser from 'phaser'
import { Constants } from '~/util/Constants'

export default class Game extends Phaser.Scene {
  private lettersTyped: string[] = []
  private lettersToType: Phaser.GameObjects.Text[] = []
  private textCorpus: String[] = Constants.TEXT.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(
    ' '
  )
  private textCorpusIndex: number = 0

  constructor() {
    super('game')
  }

  create() {
    this.displayWord()
    this.handleInput()
  }

  displayWord() {
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
        this.textCorpusIndex++
        this.lettersTyped = []
        this.displayWord()
      }
    })
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
