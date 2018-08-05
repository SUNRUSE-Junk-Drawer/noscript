import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import HtmlBuildStage from "./htmlBuildStage"
import BootloaderBuildStage from "./bootloaderBuildStage"

export default (parent, metadata, createDistDirectory) => {
  const createWasmDistDirectory = new CreateDirectoryBuildStage(
    parent,
    `wasm/createDistDirectory`,
    () => [`games`, parent.name, `dist`, `wasm`],
    [createDistDirectory]
  )

  new HtmlBuildStage(parent, metadata, createWasmDistDirectory)
  new BootloaderBuildStage(parent, createWasmDistDirectory)
}
