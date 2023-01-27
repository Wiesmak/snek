export default class Score extends HTMLElement {
    constructor() {
        super()
        this.classList.add('score')
        this.innerHTML = '0'
        this.score = 0
    }
    set = (score) => {
        this.score = score
        this.innerHTML = score.toString()
    }

    add = () => {
        this.score++
        this.innerHTML = this.score.toString()
    }
}
