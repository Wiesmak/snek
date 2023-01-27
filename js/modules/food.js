import Config from "../config/config.js"

export default class Food {
    ccoordinates = null

    constructor() {
        this.coordinates = null

    }

    spawn = (snake) => {
        do {
            this.coordinates = {
                x: Math.floor(Math.random() * Config.boardWidth),
                y: Math.floor(Math.random() * Config.boardHeight)
            }
        } while (snake.some(segment => segment.x === this.coordinates.x && segment.y === this.coordinates.y))
    }
}
