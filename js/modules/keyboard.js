import Config from "../config/config.js"

export default class Keyboard {
    static keyDown = false
    static key = null
    static keys = Config.keys

    static init = () => {
        document.addEventListener('keydown', this.onKeyDown)
    }

    static onKeyDown = (e) => {
        this.keyDown = true
        this.key = e.keyCode
    }

    static onKeyUp = (e) => {
        this.keyDown = false
    }
}
