import Column from "./column"

export default class StringColumn extends Column {
  constructor(parent, name, required, minimumLength, maximumLength) {
    super(parent, name, required)
    this.minimum = minimumLength
    this.maximum = maximumLength
  }
}
