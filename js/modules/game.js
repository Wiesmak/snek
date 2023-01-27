import Board from './board.js'
import Config from '../config/config.js'
import Snake from './snake.js'
import Apple from "./apple.js";
import Score from './score.js';
import Speed from './speed.js';
import Setup from '../config/setup.js';

export default class Game {
    board
    snake
    score
    playing = false
    mph = Config.updateInterval
    constructor() {
        this.board = new Board({
            width: Config.boardWidth,
            height: Config.boardHeight,
        })
        this.score = new Score()
    }

    start = () => {
        this.playing = true
        this.score.set(0)
        this.mph = Config.updateInterval
        this.snake = new Snake()
        this.snake.spawn({
            x: Config.spawnPoint.x - 1,
            y: Config.spawnPoint.y - 1
        })
        this.snake.body.push({x: this.snake.body[0].x, y: this.snake.body[0].y - 1})
        this.food = new Apple()
        this.food.spawn(this.snake.body)
        this.speed = new Speed()
        this.setSpeed()
        this.board.setFood(this.food)
        this.board.update(this.snake)
        this.loop()
    }

    checkCollision = () => {
        let head = this.snake.body[0]
        if (head.x < 0 || head.x >= this.board.width || head.y < 0 || head.y >= this.board.height) {
            return true
        }
        for (let i = 1; i < this.snake.body.length; i++) {
            if (head.x === this.snake.body[i].x && head.y === this.snake.body[i].y) {
                return true
            }
        }
        return false
    }

    eat = () => {
        let head = this.snake.body[0]
        if (head.x === this.food.coordinates.x && head.y === this.food.coordinates.y) {
            this.snake.body.push({x: head.x, y: head.y})
            this.score.add()
            if (this.score.score === this.board.width * this.board.height) {
                this.playing = false
                alert('Zwycięstwo!')
            }
            this.food.spawn(this.snake.body)
            this.board.setFood(this.food)
        }
    }

    eatSpeed = () => {
        let head = this.snake.body[0]
        if (head.x === this.speed.coordinates.x && head.y === this.speed.coordinates.y) {
            console.log('speed')
            this.speed.eaten = true
            this.mph = Config.turbo
            this.speed.remove()
            this.board.updateSpeed(this.speed)
            setTimeout(() => {
                this.mph = Config.updateInterval
                this.speed.eaten = false
            }, 5000)
        }
    }

    update = () => {
        this.snake.changeDirection()
        this.snake.move()
        if (this.checkCollision()) {
            alert('Przegrałeś!')
            this.playing = false
            Setup.reset()
            return
        }
        this.board.update(this.snake)
        this.eat()
        if (this.speed.coordinates != null) this.eatSpeed()
    }

    setSpeed = () => {
        if (this.playing) {
            if (this.speed.coordinates == null && this.speed.eaten === false) {
                setInterval(() => {
                    this.speed.spawn(this.snake.body)
                    this.board.updateSpeed(this.speed)
                    setTimeout(() => {
                        this.speed.remove()
                        this.board.updateSpeed(this.speed)
                    }, 5000)
                }, Math.random() * 40000)
            }
        }
    }

    loop = () => {
        this.update()
        if (this.playing) setTimeout(this.loop, this.mph)
    }
}
