import CreateDirectoryBuildStage from "../createDirectoryBuildStage"
import IcnsBuildStage from "./icnsBuildStage"

export default (game, metadata, favicons, createDistDirectory) => {
  const createBundleContentDirectory = new CreateDirectoryBuildStage(
    game,
    `macos/createBundleContentDirectory`,
    () => [`games`, game.name, `dist`, `macos`, `${metadata.json.applicationName}.app`, `Contents`],
    [createDistDirectory]
  )

  const createBundleResourcesDirectory = new CreateDirectoryBuildStage(
    game,
    `macos/createBundleResourcesDirectory`,
    () => [`games`, game.name, `dist`, `macos`, `${metadata.json.applicationName}.app`, `Contents`, `Resources`],
    [createBundleContentDirectory]
  )

  new IcnsBuildStage(game, metadata, favicons, createBundleResourcesDirectory)
}
