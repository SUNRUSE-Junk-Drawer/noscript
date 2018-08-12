import * as chokidar from "chokidar"
import GroupBuildStage from "./groupBuildStage"

export default class WatchableBuildStage extends GroupBuildStage {
  constructor(parent, name) {
    super(parent, name, [], false)
    this.watches = []
  }

  watch(path, buildStage, depth) {
    if (!this.oneOff()) {
      this.watches.push(chokidar
        .watch(path, { ignoreInitial: true, depth })
        .on(`error`, error => this.criticalStop(error))
        .on(`all`, (event, path) => {
          this.log(`Starting build stage "${buildStage.fullName}" affected by ${event} of "${path}"...`)
          buildStage.start()
        }))
    }
  }

  watchInstanced(path, buildStage, childName, depth) {
    if (!this.oneOff()) {
      this.watches.push(chokidar
        .watch(path, { ignoreInitial: true, depth })
        .on(`error`, error => this.criticalStop(error))
        .on(`all`, (event, path) => {
          const pathToStart = [path]
          if (childName) {
            pathToStart.push(childName)
          }
          const toStart = buildStage.get(pathToStart) || buildStage
          this.log(`Starting build stage "${toStart.fullName}" affected by ${event} of "${path}"...`)
          toStart.start()
        })
      )
    }
  }

  stop() {
    super.stop()
    this.watches.forEach(watch => watch.close())
  }
}
