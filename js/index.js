import Game from './modules/game.js'
import Elements from './config/elements.js'
import Keyboard from './modules/keyboard.js'

Elements.register()

const main = document.querySelector('#main')

const game = new Game()

Keyboard.init()

main.appendChild(game.board)
main.appendChild(game.score)

game.start()
