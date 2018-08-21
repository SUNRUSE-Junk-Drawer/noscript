import * as path from "path"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import ReadTextBuildStage from "./readTextBuildStage"
import WriteFileBuildStage from "./writeFileBuildStage"
import WatchableBuildStage from "./watchableBuildStage"

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
      () => [`games`, name, `index.html`],
      []
    )
    this.watch(path.join(`games`, name, `index.html`), readIndexHtml, null)
    
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
