import InstancedBuildStage from "./instancedBuildStage"

export default class ElementAttributeValueBuildStage extends InstancedBuildStage {
  constructor(parent, name, dependencies, disabled, instanceFactory, analyzeHtml, elementName, attributeName) {
    super(parent, name, dependencies, disabled, instanceFactory)
    this.analyzeHtml = analyzeHtml
    this.elementName = elementName
    this.attributeName = attributeName
  }

  getInstanceNames() {
    this.gotInstanceNames(
      Object.prototype.hasOwnProperty.call(this.analyzeHtml.valuesByAttributeByElement, this.elementName)
        && Object.prototype.hasOwnProperty.call(this.analyzeHtml.valuesByAttributeByElement[this.elementName], this.attributeName)
        ? this.analyzeHtml.valuesByAttributeByElement[this.elementName][this.attributeName]
        : []
    )
  }
}
