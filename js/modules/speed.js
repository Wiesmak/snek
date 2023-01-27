import Food from "./food.js"

export default class Speed extends Food {
    eaten = false
    constructor() {
        super()
        this.eaten = false
    }

    remove = () => {
        this.coordinates = null
    }
}
