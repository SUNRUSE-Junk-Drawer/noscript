export default class File {
  constructor(game, name) {
    this.game = game
    this.name = name
    this.lists = []
    this.columns = []
    game.files.push(this)
  }
}
