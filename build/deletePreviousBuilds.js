import rimraf from "rimraf"
import BuildStage from "./buildStage"

class DeletePreviousBuildsBuildStage extends BuildStage {
  constructor() {
    super(`metadata`, [])
  }

  performStart() {
    const directories = [`temp`, `dist`]
    this.log(`Deleting ${directories.map(directory => `"${directory}"`).join(`, `)}...`)

    let remaining = directories.length

    if (!remaining) {
      this.done()
    }

    directories.forEach(directory => rimraf(directory, error => {
      this.handle(error)

      this.log(`Deleted "${directory}"`)

      remaining--
      if (!this.remaining) {
        this.done()
      }
    }))
  }
}

export default new DeletePreviousBuildsBuildStage()
