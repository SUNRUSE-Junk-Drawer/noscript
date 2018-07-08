import * as fs from "fs"
import * as path from "path"
import mkdirp from "mkdirp"
import xmlEscape from "xml-escape"
import BuildStage from "./buildStage"

import metadata from "./../metadata"
import deletePreviousBuilds from "./../deletePreviousBuilds"

class ManifestBuildStage extends BuildStage {
  constructor() {
    super(`manifest`, [metadata, deletePreviousBuilds])
  }

  performStart() {
    const metadataJson = metadata.json
    const tempPath = path.join(`temp`, `win32`)

    this.log(`Creating temp path "${tempPath}"...`)
    mkdirp(tempPath, error => {
      this.handle(error)

      const manifestPath = path.join(tempPath, `win32.manifest`)
      this.log(`Writing to "${manifestPath}"...`)
      fs.writeFile(manifestPath, `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
          <assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
          <assemblyIdentity
              version="1.0.0.0"
              processorArchitecture="*"
              name="${xmlEscape(metadataJson.companyId)}.${xmlEscape(metadataJson.productId)}.${xmlEscape(metadataJson.applicationId)}"
              type="win32"
          />
          <description>${xmlEscape(metadataJson.description)}</description>
          <dependency>
              <dependentAssembly>
                  <assemblyIdentity
                      type="win32"
                      name="Microsoft.Windows.Common-Controls"
                      version="6.0.0.0"
                      processorArchitecture="*"
                      publicKeyToken="6595b64144ccf1df"
                      language="*"
                  />
              </dependentAssembly>
          </dependency>
        </assembly>`, error => {
          this.handle(error)
          this.done()
        })
    })
  }
}

export default new ManifestBuildStage()
