import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./buildStage"

import deletePreviousBuilds from "./deletePreviousBuilds"

class BuildStageGraphStage extends BuildStage {
  constructor() {
    super(`buildStageGraph`, [deletePreviousBuilds])
  }

  performStart() {
    const buildStages = []

    const recurse = buildStage => {
      if (buildStages.indexOf(buildStage) != -1) {
        return
      }

      buildStages.push(buildStage)

      buildStage.dependencies.forEach(recurse)
      buildStage.dependents.forEach(recurse)
    }

    recurse(this)

    const distPath = path.join(`dist`, `graphs`)

    this.log(`Creating dist path "${distPath}"...`)
    mkdirp(distPath, error => {
      this.handle(error)

      const graphPath = path.join(distPath, `buildStages.nomnoml`)
      this.log(`Writing to "${graphPath}"...`)
      fs.writeFile(graphPath, buildStages
        .map(buildStage => buildStage.dependents
          .map(dependent => `[${buildStage.name}] -> [${dependent.name}]`)
          .join(`\n`)
        ).join(`\n`), error => {
          this.handle(error)
          this.done()
        })
    })
  }
}

export default new BuildStageGraphStage()
