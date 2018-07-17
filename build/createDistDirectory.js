import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

import deleteDistDirectory from "./deleteDistDirectory"

class CreateDistDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`createDistDirectory`, [deleteDistDirectory], false)
  }

  performStart() {
    mkdirp(`dist`, error => this.handle(error, () => this.done()))
  }
}

export default new CreateDistDirectoryBuildStage()
