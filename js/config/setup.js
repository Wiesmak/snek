import Game from "../modules/game.js";

export default class Setup {
    main
    constructor(main) {
        this.main = main
        document.querySelector('#start').addEventListener('click', () => {
            this.main.innerHTML = ''
            this.launch()
        })
    }

    launch() {
        const game = new Game()
        this.main.appendChild(game.board)
        this.main.appendChild(game.score)
        game.start()
    }

    static reset() {
        const main = document.querySelector('#main')
        main.innerHTML = ''
        const text = document.createElement('h1')
        text.innerText = 'Game Over'
        text.setAttribute('id', 'text')
        const button = document.createElement('button')
        button.innerText = 'Restart'
        button.setAttribute('id', 'start')
        main.appendChild(text)
        main.appendChild(button)
        new Setup(main)
    }
}
