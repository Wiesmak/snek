export default class Config {
    static boardWidth = 15
    static boardHeight = 15
    static spawnPoint = {
        x: 8,
        y: 8
    }
    static updateInterval = 200

    static turbo = 50

    static keys = Object.freeze({
        // LEFT: 37,
        // UP: 38,
        // RIGHT: 39,
        // DOWN: 40
        LEFT: 38,
        UP: 39,
        RIGHT: 40,
        DOWN: 37
    })
}
