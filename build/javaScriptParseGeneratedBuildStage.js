import BuildStage from "./buildStage"
import GroupBuildStage from "./groupBuildStage"
import javaScriptCompressors from "./javaScriptCompressors"

class GenerateBuildStage extends BuildStage {
  constructor(parent, dependencies, fileContentFactory) {
    super(parent, `generate`, dependencies, false)
    this.fileContentFactory = fileContentFactory
  }

  performStart() {
    this.generated = this.fileContentFactory()
    this.done()
  }
}

class ParseBuildStage extends BuildStage {
  constructor(parent, javaScriptCompressor, generate, fileName) {
    super(parent, javaScriptCompressor, [generate], false)
    this.javaScriptCompressor = javaScriptCompressor
    this.generate = generate
    this.fileName = fileName
  }

  performStart() {
    javaScriptCompressors[this.javaScriptCompressor].parse(
      this.generate.generated,
      parsed => {
        this.parent.parsed[this.fileName][this.javaScriptCompressor] = parsed
        this.done()
      },
      error => this.handle(error)
    )
  }
}

export default class JavaScriptParseGeneratedBuildStage extends GroupBuildStage {
  constructor(parent, name, dependencies, fileName, fileContentFactory) {
    super(parent, name, [], false)

    this.parsed = {}
    this.parsed[fileName] = {}

    const generate = new GenerateBuildStage(this, dependencies, fileContentFactory)
    for (const javaScriptCompressor in javaScriptCompressors) {
      new ParseBuildStage(this, javaScriptCompressor, generate, fileName)
    }
  }

  done() {
    this.log(Object.keys(this.parsed))
    super.done()
  }
}
