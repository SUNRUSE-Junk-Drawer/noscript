import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

import deleteTempDirectory from "./deleteTempDirectory"

class CreateTempDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`createTempDirectory`, [deleteTempDirectory], false)
  }

  performStart() {
    mkdirp(`temp`, error => this.handle(error, () => this.done()))
  }
}

export default new CreateTempDirectoryBuildStage()
