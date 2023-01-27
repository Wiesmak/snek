import Field from './field.js'
import Util from "../config/util.js";
import Snake from "./snake.js";
import Img from "../config/img.js";

export default class Board extends HTMLElement {
    width
    height

    constructor(dimensions
    ) {
        super()
        this.width = dimensions.width
        this.height = dimensions.height
        this.classList.add('board')
        this.init()
    }

    init = () => {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.appendChild(new Field({x: i, y: j}))
            }
        }
    }

    update = (snake) => {
        this.querySelectorAll('.field').forEach(field => {
            field.classList.remove('snake')
            // @ts-ignore
            field.style.backgroundImage = ''
            //field.classList.remove('food')
        })
        snake.body.forEach(field => {
            Util.childWhere(
                this.children,
                (e) => e.coordinates.x === field.x && e.coordinates.y === field.y
            ).classList.add('snake')
        })

        this.setHead(snake)
        this.setInner(snake)
        this.setTail(snake)
    }

    setHead = (snake) => {
        let head = snake.body.at(0)
        const direction = snake.direction
        const headField = Util.childWhere(
            this.children,
            (e) => e.coordinates.x === head.x && e.coordinates.y === head.y
        )
        switch (direction) {
            case Snake.directions.RIGHT:
                headField.style.backgroundImage = Img.head.right
                break
            case Snake.directions.LEFT:
                headField.style.backgroundImage = Img.head.left
                break
            case Snake.directions.UP:
                headField.style.backgroundImage = Img.head.up
                break
            case Snake.directions.DOWN:
                headField.style.backgroundImage = Img.head.down
                break
        }
    }

    setTail = (snake) => {
        let tail = snake.body.at(-1)
        const tailField = Util.childWhere(
            this.children,
            (e) => e.coordinates.x === tail.x && e.coordinates.y === tail.y
        )
        // get the field before the tail
        let beforeTail = snake.body.at(-2)
        if (beforeTail.x === tail.x) {
            if (beforeTail.y > tail.y) tailField.style.backgroundImage = Img.tail.left
            else if (beforeTail.y < tail.y) tailField.style.backgroundImage = Img.tail.right
        } else if (beforeTail.y === tail.y) {
            if (beforeTail.x > tail.x) tailField.style.backgroundImage = Img.tail.up
            else if (beforeTail.x < tail.x) tailField.style.backgroundImage = Img.tail.down
        }
    }

    setInner = (snake) => {
        snake.body.forEach((field, index) => {
            if (index === 0 || index === snake.body.length - 1) return

            const fieldElement = Util.childWhere(
                this.children,
                (e) => e.coordinates.x === field.x && e.coordinates.y === field.y
            )

            let beforeField = snake.body.at(index - 1)
            let afterField = snake.body.at(index + 1)

            if (beforeField.x === field.x) {
                if (beforeField.y > field.y) {
                    if (afterField.x === field.x) {
                        if (afterField.y > field.y) fieldElement.style.backgroundImage = Img.body.vertical
                        else if (afterField.y < field.y) fieldElement.style.backgroundImage = Img.body.horizontal
                    } else if (afterField.y === field.y) {
                        if (afterField.x > field.x) fieldElement.style.backgroundImage = Img.body.rightDown
                        else if (afterField.x < field.x) fieldElement.style.backgroundImage = Img.body.rightUp
                    }
                } else if (beforeField.y < field.y) {
                    if (afterField.x === field.x) {
                        if (afterField.y > field.y) fieldElement.style.backgroundImage = Img.body.horizontal
                        else if (afterField.y < field.y) fieldElement.style.backgroundImage = Img.body.vertical
                    } else if (afterField.y === field.y) {
                        if (afterField.x > field.x) fieldElement.style.backgroundImage = Img.body.leftDown
                        else if (afterField.x < field.x) fieldElement.style.backgroundImage = Img.body.leftUp
                    }
                }
            } else if (beforeField.y === field.y) {
                if (beforeField.x > field.x) {
                    if (afterField.x === field.x) {
                        if (afterField.y > field.y) fieldElement.style.backgroundImage = Img.body.rightDown
                        else if (afterField.y < field.y) fieldElement.style.backgroundImage = Img.body.leftDown
                    } else if (afterField.y === field.y) {
                        if (afterField.x > field.x) fieldElement.style.backgroundImage = Img.body.horizontal
                        else if (afterField.x < field.x) fieldElement.style.backgroundImage = Img.body.vertical
                    }
                } else if (beforeField.x < field.x) {
                    if (afterField.x === field.x) {
                        if (afterField.y > field.y) fieldElement.style.backgroundImage = Img.body.rightUp
                        else if (afterField.y < field.y) fieldElement.style.backgroundImage = Img.body.leftUp
                    } else if (afterField.y === field.y) {
                        if (afterField.x > field.x) fieldElement.style.backgroundImage = Img.body.vertical
                        else if (afterField.x < field.x) fieldElement.style.backgroundImage = Img.body.horizontal
                    }
                }
            }
        })
    }

    setFood = (food) => {
        this.querySelector('.food')?.classList.remove('food')
        Util.childWhere(
            this.children,
            (e) =>
                e.coordinates.x === food.coordinates.x &&
                e.coordinates.y === food.coordinates.y
        ).classList.add('food')
    }

    updateSpeed = (speed) => {
        this.querySelector('.speed')?.classList.remove('speed')
        if (speed.coordinates != null){
            Util.childWhere(
                this.children,
                (e) =>
                    e.coordinates.x === speed.coordinates.x &&
                    e.coordinates.y === speed.coordinates.y
            ).classList.add('speed')
        }
    }
}
