import * as fs from "fs"
import * as path from "path"
import BuildStage from "./buildStage"

class MetadataBuildStage extends BuildStage {
  constructor() {
    super(`metadata`, [], false)
  }

  performStart() {
    const metadataPath = path.join(`src`, `metadata.json`)
    this.log(`Reading "${metadataPath}"...`)
    fs.readFile(metadataPath, { encoding: `utf8` }, (error, metadataText) => this.handle(error, () => {
      this.log(`Parsing JSON...`)
      this.json = JSON.parse(metadataText)

      this.done()
    }))
  }
}

export default new MetadataBuildStage()
