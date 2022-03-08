import randomWords from 'random-words'

export class TextGenerator {
  static generateText(length: number): string[] {
    return randomWords(length)
  }
}
