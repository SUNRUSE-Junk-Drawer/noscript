import * as path from "path"
import CommandLineBuildStage from "./../commandLineBuildStage"
import metadata from "./../metadata"
import resource from "./resource"
import createDistDirectory from "./createDistDirectory"
import generateMetadataHeader from "./../generateMetadataHeader"

export default new CommandLineBuildStage(
  `win32/compile`,
  `i686-w64-mingw32-gcc`,
  () => [`-mwindows`, path.join(`src`, `main.c`), path.join(`temp`, `win32`, `win32.res`), `-o`, path.join(`dist`, `win32`, `${metadata.json.applicationName}.exe`)],
  [resource, createDistDirectory, generateMetadataHeader]
)
