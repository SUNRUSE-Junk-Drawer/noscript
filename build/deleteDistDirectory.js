import rimraf from "rimraf"
import BuildStage from "./buildStage"

import metadata from "./metadata"

class DeleteDistDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`deleteDistDirectory`, [metadata], false)
  }

  performStart() {
    rimraf(`dist`, error => this.handle(error, () => this.done()))
  }
}

export default new DeleteDistDirectoryBuildStage()
