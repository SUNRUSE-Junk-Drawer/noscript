import * as buildStage from "./buildStage"
import FileListBuildStage from "./fileListBuildStage"
import GameBuildStage from "./gameBuildStage"
import WatchableBuildStage from "./watchableBuildStage"
import addGraphsBuildStages from "./addGraphsBuildStages"

export default class BuildProcessBuildStage extends WatchableBuildStage {
  constructor(isOneOff) {
    super(null, `buildProcess`)
    this.isOneOff = isOneOff

    const games = new FileListBuildStage(
      this,
      `games`,
      [],
      false,
      instanceName => new GameBuildStage(games, instanceName),
      () => [`games`]
    )
    this.watchInstanced(`games`, games, null, 0, null)

    addGraphsBuildStages(this, games)

    buildStage.handleBuildStageChanges()
  }

  oneOff() {
    return this.isOneOff
  }
}
