import * as uglifyJs from "uglify-js"
import BuildStage from "./buildStage"

class CombineBuildStage extends BuildStage {
  constructor(parent, javaScriptCompressor, javaScriptParseBuildStages) {
    super(parent, `combine${javaScriptCompressor.slice(0, 1).toUpperCase()}${javaScriptCompressor.slice(1)}`, javaScriptParseBuildStages, false)
    this.javaScriptCompressor = javaScriptCompressor
    this.javaScriptParseBuildStages = javaScriptParseBuildStages
  }

  getAllParsed() {
    const allParsed = []
    this.javaScriptParseBuildStages.forEach(javaScriptParseBuildStage => {
      for (const filename in javaScriptParseBuildStage.parsed) {
        allParsed.push(javaScriptParseBuildStage.parsed[filename][this.javaScriptCompressor])
      }
    })
    return allParsed
  }
}

export default {
  uglifyJs: {
    parser: class UglifyJsParseBuildStage extends BuildStage {
      constructor(parent, read) {
        super(parent, `parseUglifyJs`, [read], false)
        this.read = read
      }

      performStart() {
        const parsed = uglifyJs.minify(this.read.text, {
          parse: {},
          compress: false,
          mangle: false,
          output: {
            ast: true,
            code: false
          }
        })
        this.handle(parsed.error, () => {
          this.parent.parsed.uglifyJs = parsed.ast
          this.done()
        })
      }
    },
    combiner: class UglifyJsCombineBuildStage extends CombineBuildStage {
      constructor(parent, javaScriptParseBuildStages) {
        super(parent, `uglifyJs`, javaScriptParseBuildStages)
      }

      performStart() {
        let parsed = this.getAllParsed()

        parsed = parsed.map(item => item.clone(true))

        const combined = parsed[0]

        parsed.slice(1).forEach(item => {
          combined.body = combined.body.concat(item.body)
          combined.end = item.end
        })

        const minified = uglifyJs.minify(combined, {
          mangle: {
            toplevel: true
          },
          toplevel: true,
          output: {
            ast: false,
            code: true
          }
        })

        this.handle(minified.error, () => {
          this.combined = minified.code
          this.done()
        })
      }
    }
  }
}
