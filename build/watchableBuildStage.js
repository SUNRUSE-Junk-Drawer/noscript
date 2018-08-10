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
        .on(`error`, error => { throw error })
        .on(`all`, (event, path) => {
          console.log(`Starting build stage "${buildStage.fullName}" affected by ${event} of "${path}"...`)
          buildStage.start()
        }))
    }
  }

  watchInstanced(path, buildStage, depth) {
    if (!this.oneOff()) {
      this.watches.push(chokidar
        .watch(path, { ignoreInitial: true, depth })
        .on(`error`, error => { throw error })
        .on(`all`, (event, path) => {
          const toStart = buildStage.get([path]) || buildStage
          console.log(`Starting build stage "${toStart.fullName}" affected by ${event} of "${path}"...`)
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
