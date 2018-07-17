import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import metadata from "./../metadata"
import createBundleContentDirectory from "./createBundleContentDirectory"

export default new CreateDirectoryBuildStage(
  `macos/createBundleResourcesDirectory`,
  () => [`dist`, `macos`, `${metadata.json.applicationName}.app`, `Contents`, `Resources`],
  [createBundleContentDirectory]
)
