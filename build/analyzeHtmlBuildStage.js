import * as htmlParser from "html-parser"
import BuildStage from "./buildStage"

export default class AnalyzeHtmlBuildStage extends BuildStage {
  constructor(parent, name, dependencies, htmlFactory) {
    super(parent, name, dependencies, false)
    this.htmlFactory = htmlFactory
  }

  performStart() {
    const html = this.htmlFactory()
    let currentElement = null
    this.valuesByAttributeByElement = {}

    htmlParser.parse(html, {
      openElement: name => currentElement = name,
      attribute: (name, value) => {
        if (!Object.prototype.hasOwnProperty.call(this.valuesByAttributeByElement, currentElement)) {
          this.valuesByAttributeByElement[currentElement] = {}
        }

        if (!Object.prototype.hasOwnProperty.call(this.valuesByAttributeByElement[currentElement], name)) {
          this.valuesByAttributeByElement[currentElement][name] = []
        }

        if (this.valuesByAttributeByElement[currentElement][name].indexOf(value) == -1) {
          this.valuesByAttributeByElement[currentElement][name].push(value)
        }
      }
    })

    this.done()
  }
}
