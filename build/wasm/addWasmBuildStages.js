import CreateDirectoryBuildStage from "./../createDirectoryBuildStage"
import HtmlBuildStage from "./htmlBuildStage"
import BootloaderBuildStage from "./bootloaderBuildStage"
import FaviconsBuildStage from "./faviconsBuildStage"
import LoadingScreenBuildStage from "./loadingScreenBuildStage"

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
  new LoadingScreenBuildStage(game, createWasmDistDirectory)
}
