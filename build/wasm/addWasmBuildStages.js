import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import HtmlBuildStage from "./htmlBuildStage"
import BootloaderBuildStage from "./bootloaderBuildStage"
import FaviconsBuildStage from "./faviconsBuildStage"

export default (game, metadata, favicons, createDistDirectory) => {
  const createWasmDistDirectory = new CreateDirectoryBuildStage(
    game,
    `wasm/createDistDirectory`,
    () => [`games`, game.name, `dist`, `wasm`],
    [createDistDirectory]
  )

  new HtmlBuildStage(game, metadata, favicons, createWasmDistDirectory)
  new BootloaderBuildStage(game, createWasmDistDirectory)
  new FaviconsBuildStage(game, favicons, createWasmDistDirectory)
}
