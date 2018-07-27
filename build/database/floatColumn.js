import Column from "./column"

export default class FloatColumn extends Column {
  constructor(parent, name, required, minimum, maximum) {
    super(parent, name, required)
    this.minimum = minimum
    this.maximum = maximum
  }
}
