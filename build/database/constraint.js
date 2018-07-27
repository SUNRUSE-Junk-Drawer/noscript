export default class Constraint {
  constructor(column) {
    this.column = column
    column.constraints.push(this)
  }
}
