import * as buildStage from "./buildStage"
import FileListBuildStage from "./fileListBuildStage"
import GameBuildStage from "./gameBuildStage"
import WatchableBuildStage from "./watchableBuildStage"

export default class BuildProcessBuildStage extends WatchableBuildStage {
  constructor(isOneOff) {
    super(null, `buildProcess`)
    this.isOneOff = isOneOff

    const games = new FileListBuildStage(
      this,
      `games`,
      [],
      false,
      instanceName => new GameBuildStage(this, instanceName),
      () => [`games`]
    )

    this.watchInstanced(`games`, games, 0)

    buildStage.handleBuildStageChanges()
  }

  oneOff() {
    return this.isOneOff
  }
}
