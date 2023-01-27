import Food from "./food.js"

export default class Apple extends Food{
    constructor() {
        super()
        this.coordinates = {x: 0, y: 0}
    }
}
