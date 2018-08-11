import * as buildStage from "./buildStage"
import FileListBuildStage from "./fileListBuildStage"
import GameBuildStage from "./gameBuildStage"
import WatchableBuildStage from "./watchableBuildStage"
import JavaScriptParseBuildStage from "./javaScriptParseBuildStage"

export default class BuildProcessBuildStage extends WatchableBuildStage {
  constructor(isOneOff) {
    super(null, `buildProcess`)
    this.isOneOff = isOneOff

    const engine = new JavaScriptParseBuildStage(this, `engine`, [], false, () => [`engine`])
    this.watchInstanced(`engine`, engine, null)

    const games = new FileListBuildStage(
      this,
      `games`,
      [],
      false,
      instanceName => new GameBuildStage(games, instanceName, engine),
      () => [`games`]
    )
    this.watchInstanced(`games`, games, 0)

    buildStage.handleBuildStageChanges()
  }

  oneOff() {
    return this.isOneOff
  }
}
