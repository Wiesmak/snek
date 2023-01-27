import Elements from './config/elements.js'
import Setup from './config/setup.js'
import Keyboard from './modules/keyboard.js'

Elements.register()

new Setup(document.querySelector('#main'))

Keyboard.init()
