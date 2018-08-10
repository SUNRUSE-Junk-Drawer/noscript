import * as chokidar from "chokidar"
import * as buildStage from "./buildStage"
import FileListBuildStage from "./fileListBuildStage"
import GameBuildStage from "./gameBuildStage"

export default class BuildProcessBuildStage extends FileListBuildStage {
  constructor(isOneOff) {
    super(null, `games`, [], false, instanceName => new GameBuildStage(this, instanceName), () => [`games`])
    this.isOneOff = isOneOff

    if (!isOneOff) {
      chokidar
        .watch(`games`, { ignoreInitial: true, depth: 0 })
        .on(`error`, error => { throw error })
        .on(`all`, (event, path) => {
          console.log(`Restarting "${this.fullName}" following ${event} of "${path}"...`)
          this.start()
        })
    }

    buildStage.handleBuildStageChanges()
  }

  oneOff() {
    return this.isOneOff
  }
}
