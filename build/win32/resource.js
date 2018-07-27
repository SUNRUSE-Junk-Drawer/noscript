import * as path from "path"
import CommandLineBuildStage from "./../commandLineBuildStage"
import icon from "./icon"
import manifest from "./manifest"

export default new CommandLineBuildStage(
  `win32/resource`,
  [`windres`, `i686-w64-mingw32-windres`],
  () => [path.join(`src`, `platforms`, `win32.rc`), `-O`, `coff`, `-o`, path.join(`temp`, `win32`, `win32.res`)],
  [icon, manifest]
)
