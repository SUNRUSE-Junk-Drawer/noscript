import Constraint from "./constraint"

export default class ForeignKeyConstraint extends Constraint {
  constructor(column, toColumn) {
    super(column)
    this.toColumn = toColumn
  }
}
