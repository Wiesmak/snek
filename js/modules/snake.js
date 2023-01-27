import Keyboard from "./keyboard.js";

export default class Snake {
    body = []
    static directions = Object.freeze({
        UP: {d: 1, p: [3, 4]},
        DOWN: {d: 2, p: [3, 4]},
        LEFT: {d: 3, p: [1, 2]},
        RIGHT: {d: 4, p: [1, 2]}
    })

    constructor() {
        this.direction = Snake.directions.UP
    }

    spawn = ({x, y}) => this.body.push({x, y})

    move = () => {
        let head = this.body[0]
        let newHead = {x: head.x, y: head.y}
        switch (this.direction) {
            case Snake.directions.UP:
                newHead.y++
                break
            case Snake.directions.DOWN:
                newHead.y--
                break
            case Snake.directions.LEFT:
                newHead.x--
                break
            case Snake.directions.RIGHT:
                newHead.x++
                break
        }
        this.body.unshift(newHead)
        this.body.pop()
    }

    turn = (direction) => {
        if (this.direction.d === direction.d) return
        if (!this.direction.p.includes(direction.d)) return
        this.direction = direction
    }

    changeDirection = () => {
        const key = Keyboard.key
        switch (key) {
            case Keyboard.keys.LEFT:
                this.turn(Snake.directions.LEFT)
                break
            case Keyboard.keys.UP:
                this.turn(Snake.directions.UP)
                break
            case Keyboard.keys.RIGHT:
                this.turn(Snake.directions.RIGHT)
                break
            case Keyboard.keys.DOWN:
                this.turn(Snake.directions.DOWN)
                break
        }
    }
}
