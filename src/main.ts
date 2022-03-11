import Phaser from 'phaser'
import BookFinished from './scenes/BookFinished'

import Game from './scenes/Game'
import { GameOver } from './scenes/GameOver'
import { Start } from './scenes/Start'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Start, Game, BookFinished, GameOver],
}

export default new Phaser.Game(config)
