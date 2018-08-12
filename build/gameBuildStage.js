import * as path from "path"
import BuildStage from "./buildStage"
import ReadJsonBuildStage from "./readJsonBuildStage"
import DeleteDirectoryBuildStage from "./deleteDirectoryBuildStage"
import CreateDirectoryBuildStage from "./createDirectoryBuildStage"
import WatchableBuildStage from "./watchableBuildStage"
import JavaScriptParseBuildStage from "./javaScriptParseBuildStage"
import javaScriptCompressors from "./javaScriptCompressors"
import zipCompressors from "./zipCompressors"
import WriteFileBuildStage from "./writeFileBuildStage"
import JavaScriptCombineBuildStage from "./javaScriptCombineBuildStage"

class HtmlGeneratorBuildStage extends BuildStage {
  constructor(parent, name, javaScriptCombiner) {
    super(parent, name, [javaScriptCombiner], false)
    this.javaScriptCombiner = javaScriptCombiner
  }

  performStart() {
    this.html = `<script>${this.javaScriptCombiner.combined}</script>`
    this.done()
  }
}

export default class GameBuildStage extends WatchableBuildStage {
  constructor(parent, name, engine) {
    super(parent, name, [], false)
    this.watches = []

    const metadata = new ReadJsonBuildStage(
      this,
      `metadata`,
      () => [`games`, name, `metadata.json`],
      []
    )

    this.watch(path.join(`games`, name, `metadata.json`), metadata, null)

    const createSrcDirectory = new CreateDirectoryBuildStage(this, `createSrcDirectory`, () => [`games`, name, `src`], [])

    const javaScriptParse = new JavaScriptParseBuildStage(this, `src`, [createSrcDirectory], false, () => [`games`, name, `src`])

    const zipCompressorInstances = []
    const htmlGeneratorInstances = []

    for (const javaScriptCompressor in javaScriptCompressors) {
      const combiner = new JavaScriptCombineBuildStage(this, javaScriptCompressor, [engine, javaScriptParse])
      const htmlGenerator = new HtmlGeneratorBuildStage(this, `generateHtmlFrom${javaScriptCompressor.slice(0, 1).toUpperCase()}${javaScriptCompressor.slice(1)}`, combiner)
      htmlGeneratorInstances.push(htmlGenerator)
      for (const zipCompressor in zipCompressors) {
        zipCompressorInstances.push(new zipCompressors[zipCompressor](this, javaScriptCompressor, htmlGenerator))
      }
    }

    const deleteDistDirectory = new DeleteDirectoryBuildStage(
      this,
      `deleteDistDirectory`,
      () => [`games`, name, `dist`],
      zipCompressorInstances.concat([metadata])
    )

    const createDistDirectory = new CreateDirectoryBuildStage(
      this,
      `createDistDirectory`,
      () => [`games`, name, `dist`],
      [deleteDistDirectory]
    )

    if (!this.oneOff()) {
      new WriteFileBuildStage(
        this,
        `writeHtml`,
        () => [`games`, name, `dist`, `index.html`],
        () => {
          let best = htmlGeneratorInstances[0]
          htmlGeneratorInstances.forEach(htmlGeneratorInstance => {
            if (htmlGeneratorInstance.html.length > best.html.length) {
              return
            }
            best = htmlGeneratorInstance
          })
          this.log(`Selected "${best.name}", writing...`)
          return best.html
        }, [createDistDirectory])
    }

    new WriteFileBuildStage(
      this,
      `writeZip`,
      () => [`games`, name, `dist`, `${metadata.json.applicationName}.zip`],
      () => {
        let best = zipCompressorInstances[0]
        zipCompressorInstances.forEach(zipCompressorInstance => {
          if (zipCompressorInstance.zipped.byteLength > best.zipped.byteLength) {
            return
          }
          best = zipCompressorInstance
        })
        this.log(`Selected "${best.name}", writing...`)
        return best.zipped
      }, [createDistDirectory])

    this.watchInstanced(path.join(`games`, name, `src`), javaScriptParse, `read`, null)
  }
}
