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

  const bootloader = new BootloaderBuildStage(parent, createWasmDistDirectory)
  new HtmlBuildStage(parent, metadata, createWasmDistDirectory, bootloader)
}
