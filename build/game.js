import ReadJsonBuildStage from "./readJsonBuildStage"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import GenerateMetadataHeaderBuildStage from "./generateMetadataHeaderBuildStage"
import FaviconsBuildStage from "./faviconsBuildStage"
import addGraphsBuildStages from "./graphs/addGraphsBuildStages"
import addMacosBuildStages from "./macos/addMacosBuildStages"
import addWin32BuildStages from "./win32/addWin32BuildStages"
import addLinuxBuildStages from "./linux/addLinuxBuildStages"
import addWasmBuildStages from "./wasm/addWasmBuildStages"

export default class Game {
  constructor(name, oneOff) {
    this.name = name
    this.oneOff = oneOff
    this.buildStages = []

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

    const favicons = new FaviconsBuildStage(
      this,
      `favicons`,
      metadata,
      () => [`games`, name, `logo.svg`]
    )

    addGraphsBuildStages(this, createDistDirectory)
    addMacosBuildStages(this, metadata, favicons, createDistDirectory)
    addWin32BuildStages(this, metadata, favicons, createDistDirectory, createTempDirectory, generateMetadataHeader)
    addLinuxBuildStages(this, metadata, createDistDirectory, createTempDirectory, generateMetadataHeader)
    addWasmBuildStages(this, metadata, favicons, createDistDirectory)

    this.handleBuildStageChanges()
  }

  handleBuildStageChanges() {
    console.log(`Performing state check...`)
    this.buildStages.forEach(buildStage => buildStage.checkState())
    console.log(`Done.`)
  }
}
