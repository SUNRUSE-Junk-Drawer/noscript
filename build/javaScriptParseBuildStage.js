import FileSearchBuildStage from "./fileSearchBuildStage"
import GroupBuildStage from "./groupBuildStage"
import ReadTextBuildStage from "./readTextBuildStage"
import javaScriptCompressors from "./javaScriptCompressors"

class InstanceBuildStage extends GroupBuildStage {
  constructor(parent, name, dependencies, disabled) {
    super(parent, name, dependencies, disabled)

    this.parsed = {}
    parent.parsed[name] = this.parsed

    const read = new ReadTextBuildStage(this, `read`, () => [name], [])
    for (const javaScriptCompressor in javaScriptCompressors) {
      new javaScriptCompressors[javaScriptCompressor].parser(this, read)
    }
  }

  stop() {
    super.stop()
    delete this.parent.parsed[this.name]
  }
}

export default class JavaScriptParseBuildStage extends FileSearchBuildStage {
  constructor(parent, name, dependencies, disabled, searchPathFactory) {
    super(
      parent,
      name,
      dependencies,
      disabled,
      instanceName => new InstanceBuildStage(this, instanceName, [], false),
      searchPathFactory
    )
    this.parsed = {}
  }
}
