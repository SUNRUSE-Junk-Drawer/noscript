export default class Column {
  constructor(parent, name, required) {
    this.parent = parent
    this.name = name
    this.required = required
    this.constraints = []
    parent.columns.push(this)
  }
}
