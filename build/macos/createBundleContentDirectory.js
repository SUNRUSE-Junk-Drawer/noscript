import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import metadata from "./../metadata"
import createDistDirectory from "./../createDistDirectory"

export default new CreateDirectoryBuildStage(
  `macos/createBundleContentDirectory`,
  () => [`dist`, `macos`, `${metadata.json.applicationName}.app`, `Contents`],
  [createDistDirectory]
)
