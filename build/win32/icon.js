import WriteFileBuildStage from "./../writeFileBuildStage"

import favicons from "./../favicons"
import createTempDirectory from "./createTempDirectory"

export default new WriteFileBuildStage(
  `win32/icon`,
  () => [`temp`, `win32`, `logo.ico`],
  () => favicons.response.images.find(image => image.name == `win32.ico`).contents,
  [favicons, createTempDirectory]
)
