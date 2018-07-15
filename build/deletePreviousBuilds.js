import rimraf from "rimraf"
import BuildStage from "./buildStage"

import metadata from "./metadata"

class DeletePreviousBuildsBuildStage extends BuildStage {
  constructor() {
    super(`deletePreviousBuilds`, [metadata], false)
  }

  performStart() {
    const directories = [`temp`, `dist`]
    this.log(`Deleting ${directories.map(directory => `"${directory}"`).join(`, `)}...`)

    let remaining = directories.length

    if (!remaining) {
      this.done()
    }

    directories.forEach(directory => rimraf(directory, error => this.handle(error, () => {
      this.log(`Deleted "${directory}"`)

      remaining--
      if (!remaining) {
        this.done()
      }
    })))
  }
}

export default new DeletePreviousBuildsBuildStage()
