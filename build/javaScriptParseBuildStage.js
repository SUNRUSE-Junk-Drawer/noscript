import BuildStage from "./buildStage"
import FileSearchBuildStage from "./fileSearchBuildStage"
import GroupBuildStage from "./groupBuildStage"
import ReadTextBuildStage from "./readTextBuildStage"
import javaScriptCompressors from "./javaScriptCompressors"

class ParseBuildStage extends BuildStage {
  constructor(parent, javaScriptCompressor, read) {
    super(parent, javaScriptCompressor, [read], false)
    this.javaScriptCompressor = javaScriptCompressor
    this.read = read
  }

  performStart() {
    javaScriptCompressors[this.javaScriptCompressor].parse(
      this.read.text,
      parsed => {
        this.parent.parsed[this.javaScriptCompressor] = parsed
        this.done()
      },
      error => this.handle(error)
    )
  }
}

class InstanceBuildStage extends GroupBuildStage {
  constructor(parent, name, dependencies, disabled) {
    super(parent, name, dependencies, disabled)

    this.parsed = {}
    parent.parsed[name] = this.parsed

    const read = new ReadTextBuildStage(this, `read`, () => [name], [])
    for (const javaScriptCompressor in javaScriptCompressors) {
      new ParseBuildStage(this, javaScriptCompressor, read)
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
      searchPathFactory,
      `js`
    )
    this.parsed = {}
  }
}
