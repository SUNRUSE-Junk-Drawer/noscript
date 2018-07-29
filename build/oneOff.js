import forEachGame from "./forEachGame"
import Game from "./game"

forEachGame(name => new Game(name, true))
