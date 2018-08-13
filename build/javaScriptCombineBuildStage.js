import * as path from "path"
import GroupBuildStage from "./groupBuildStage"
import javaScriptCompressors from "./javaScriptCompressors"

export default class JavaScriptCombineBuildStage extends GroupBuildStage {
  constructor(parent, javaScriptCompressor, javaScriptParsers, sortOrderFactory) {
    super(parent, javaScriptCompressor, javaScriptParsers)
    this.javaScriptCompressor = javaScriptCompressor
    this.javaScriptParsers = javaScriptParsers
    this.sortOrderFactory = sortOrderFactory
  }

  performStart() {
    const allParsed = []
    this.sortOrderFactory().forEach(factory => {
      const toSort = path.join.apply(path, factory)
      this.javaScriptParsers.forEach(javaScriptParser => {
        if (Object.prototype.hasOwnProperty.call(javaScriptParser.parsed, toSort)) {
          allParsed.push(javaScriptParser.parsed[toSort][this.javaScriptCompressor])
        }
      })
    })
    this.javaScriptParsers.forEach(javaScriptParser => {
      for (const key in javaScriptParser.parsed) {
        const toPush = javaScriptParser.parsed[key][this.javaScriptCompressor]
        if (allParsed.indexOf(toPush) == -1) {
          allParsed.push(toPush)
        }
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
