import * as buildStage from "./buildStage"
import GroupBuildStage from "./groupBuildStage"
import ReadJsonBuildStage from "./readJsonBuildStage"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import ZipDirectoryBuildStage from "./zipDirectoryBuildStage"
import addWasmBuildStages from "./wasm/addWasmBuildStages"

export default class Game extends GroupBuildStage {
  constructor(parent, name, isOneOff) {
    super(parent, name, [], false)
    this.isOneOff = isOneOff
    this.files = []

    const metadata = new ReadJsonBuildStage(
      this,
      `metadata`,
      () => [`games`, name, `metadata.json`],
      []
    )

    const deleteTempDirectory = new DeleteDirectoryBuildStage(
      this,
      `deleteTempDirectory`,
      () => [`games`, name, `temp`],
      [metadata]
    )

    const createTempDirectory = new CreateDirectoryBuildStage(
      this,
      `createTempDirectory`,
      () => [`games`, name, `temp`],
      [deleteTempDirectory]
    )

    const deleteDistDirectory = new DeleteDirectoryBuildStage(
      this,
      `deleteDistDirectory`,
      () => [`games`, name, `dist`],
      [metadata]
    )

    const createDistDirectory = new CreateDirectoryBuildStage(
      this,
      `createDistDirectory`,
      () => [`games`, name, `dist`],
      [deleteDistDirectory]
    )

    addWasmBuildStages(this, metadata, createDistDirectory)

    new ZipDirectoryBuildStage(
      this,
      `wasm/zip`,
      () => [`games`, name, `dist`, `wasm`],
      () => [`dist`, `${metadata.json.applicationName}.zip`],
      [
        this.get([`wasm/html`]),
        this.get([`wasm/bootloader`]),
      ]
    )

    metadata.start()
  }

  oneOff() {
    return this.isOneOff
  }
}
