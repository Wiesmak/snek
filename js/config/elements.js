//

import Board from '../modules/board.js'
import Field from '../modules/field.js'
import Score from '../modules/score.js'

export default class Elements {
    static elements = {
        'board': Board,
        'field': Field,
        'score': Score,
    }

    static registerElement = (name, element) => window.customElements.define('snek-' + name, element)

    static register = () => {
        for (let name in Elements.elements) {
            Elements.registerElement(name, Elements.elements[name])
        }
    }
}
