//

export default class Field extends HTMLElement {
    snake
    food
    coordinates
    constructor(coordinates) {
        super()
        this.classList.add('field')
        this.snake = false
        this.food = false
        this.coordinates = coordinates
    }

    setSnake = () => {
        this.snake = true
        this.classList.add('snake')
    }

    setFood = () => {
        this.food = true
        this.classList.add('food')
    }
}
