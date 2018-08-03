import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import HtmlBuildStage from "./htmlBuildStage"
import BootloaderBuildStage from "./bootloaderBuildStage"

export default (game, metadata, createDistDirectory) => {
  const createWasmDistDirectory = new CreateDirectoryBuildStage(
    game,
    `wasm/createDistDirectory`,
    () => [`games`, game.name, `dist`, `wasm`],
    [createDistDirectory]
  )

  new HtmlBuildStage(game, metadata, createWasmDistDirectory)
  new BootloaderBuildStage(game, createWasmDistDirectory)
}
