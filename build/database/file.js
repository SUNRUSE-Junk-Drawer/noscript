export const All = []

export default class File {
  constructor(name) {
    this.name = name
    this.lists = []
    this.columns = []
    All.push(this)
  }
}
