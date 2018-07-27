export default class List {
  constructor(parent, name) {
    this.parent = parent
    this.name = name
    this.lists = []
    this.columns = []
    parent.lists.push(this)
  }
}
