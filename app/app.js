import { Game } from "./game"

export class App
{
    constructor()
    {
        this.name = "App"
        this.game = new Game()
    }

    pause () {
        this.game.pause()
    }

    resume () {
        this.game.resume()
    }
}

let app = new App()