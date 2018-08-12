import GroupBuildStage from "./groupBuildStage"
import javaScriptCompressors from "./javaScriptCompressors"

export default class JavaScriptCombineBuildStage extends GroupBuildStage {
  constructor(parent, javaScriptCompressor, javaScriptParsers) {
    super(parent, javaScriptCompressor, javaScriptParsers)
    this.javaScriptCompressor = javaScriptCompressor
    this.javaScriptParsers = javaScriptParsers
  }

  performStart() {
    const allParsed = []
    this.javaScriptParsers.forEach(javaScriptParser => {
      for (const key in javaScriptParser.parsed) {
        allParsed.push(javaScriptParser.parsed[key][this.javaScriptCompressor])
      }
    })
    javaScriptCompressors[this.javaScriptCompressor].combine(
      allParsed,
      combined => {
        this.combined = combined
        this.done()
      },
      error => this.handle(error)
    )
  }
}
