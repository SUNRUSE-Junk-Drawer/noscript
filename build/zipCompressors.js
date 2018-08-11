import archiver from "archiver"
import bl from "bl"
import BuildStage from "./buildStage"

export default {
  archiver: class ArchiverBuildStage extends BuildStage {
    constructor(parent, javaScriptCompressor, htmlGenerator) {
      super(parent, `archiver${javaScriptCompressor.slice(0, 1).toUpperCase()}${javaScriptCompressor.slice(1)}`, [htmlGenerator], false)
      this.htmlGenerator = htmlGenerator
    }

    performStart() {
      const archive = archiver(`zip`)
      archive.append(Buffer.from(this.htmlGenerator.html, `utf8`), { name: `index.html` })
      archive.pipe(bl((error, data) => this.handle(error, () => {
        this.zipped = data
        this.done()
      })))
      archive.finalize()
    }
  }
}
