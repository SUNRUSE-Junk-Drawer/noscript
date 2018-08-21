import * as path from "path"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import ReadTextBuildStage from "./readTextBuildStage"
import WriteFileBuildStage from "./writeFileBuildStage"
import WatchableBuildStage from "./watchableBuildStage"
import AnalyzeHtmlBuildStage from "./analyzeHtmlBuildStage"

export default class GameBuildStage extends WatchableBuildStage {
  constructor(parent, name) {
    super(parent, name, [], false)

    const createSrcDirectory = new CreateDirectoryBuildStage(
      this,
      `createSrcDirectory`,
      () => [`games`, name, `src`],
      []
    )

    const deleteDistDirectory = new DeleteDirectoryBuildStage(
      this,
      `deleteDistDirectory`,
      () => [`games`, name, `dist`],
      []
    )

    const createDistDirectory = new CreateDirectoryBuildStage(
      this,
      `createDistDirectory`,
      () => [`games`, name, `dist`],
      [deleteDistDirectory]
    )

    const readIndexHtml = new ReadTextBuildStage(
      this,
      `readIndexHtml`,
      () => [`games`, name, `src`, `index.html`],
      [createSrcDirectory]
    )
    this.watch(path.join(`games`, name, `src`, `index.html`), readIndexHtml, null)

    const analyzeHtml = new AnalyzeHtmlBuildStage(
      this,
      `analyzeIndexHtml`,
      [readIndexHtml],
      () => readIndexHtml.text
    )

    if (!this.oneOff()) {
      new WriteFileBuildStage(
        this,
        `writeIndexHtml`,
        () => [`games`, name, `dist`, `index.html`],
        () => readIndexHtml.text,
        [createDistDirectory, readIndexHtml]
      )
    }
  }
}
