import ReadJsonBuildStage from "./readJsonBuildStage"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import ZipDirectoryBuildStage from "./zipDirectoryBuildStage"
import GenerateMetadataHeaderBuildStage from "./generateMetadataHeaderBuildStage"
import addGraphsBuildStages from "./graphs/addGraphsBuildStages"
import addWasmBuildStages from "./wasm/addWasmBuildStages"

export default class Game {
  constructor(name, oneOff) {
    this.name = name
    this.oneOff = oneOff
    this.buildStages = []
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

    const generateMetadataHeader = new GenerateMetadataHeaderBuildStage(
      this,
      metadata,
      createTempDirectory
    )

    addGraphsBuildStages(this, createDistDirectory)
    addWasmBuildStages(this, metadata, createDistDirectory)

    new ZipDirectoryBuildStage(
      this,
      `wasm/zip`,
      () => [`games`, name, `dist`, `wasm`],
      () => [`dist`, `${metadata.json.applicationName}.zip`],
      [
        this.buildStage(`wasm/html`),
        this.buildStage(`wasm/bootloader`),
      ]
    )

    this.handleBuildStageChanges()
  }

  handleBuildStageChanges() {
    console.log(`Performing state check...`)
    this.buildStages.forEach(buildStage => buildStage.checkState())
    console.log(`Done.`)
  }

  buildStage(name) {
    return this.buildStages.find(buildStage => buildStage.name == name)
  }
}
