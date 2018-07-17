import rimraf from "rimraf"
import BuildStage from "./buildStage"

import metadata from "./metadata"

class DeleteTempDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`deleteTempDirectory`, [metadata], false)
  }

  performStart() {
    rimraf(`temp`, error => this.handle(error, () => this.done()))
  }
}

export default new DeleteTempDirectoryBuildStage()
