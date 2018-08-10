import * as path from "path"
import ReadJsonBuildStage from "./readJsonBuildStage"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import ZipDirectoryBuildStage from "./zipDirectoryBuildStage"
import addWasmBuildStages from "./wasm/addWasmBuildStages"
import WatchableBuildStage from "./watchableBuildStage"

export default class GameBuildStage extends WatchableBuildStage {
  constructor(parent, name) {
    super(parent, name, [], false)
    this.watches = []

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
        this.get([`wasm/bootloader`])
      ]
    )

    this.watch(path.join(`games`, name, `metadata.json`), metadata)
    this.watch(`build/wasm/bootloader.js`, this.get([`wasm/bootloader`]))
  }
}
