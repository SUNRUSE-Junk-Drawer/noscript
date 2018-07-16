import * as fs from "fs"
import * as path from "path"
import xmlEscape from "xml-escape"
import BuildStage from "./buildStage"

import metadata from "./../metadata"
import createTempDirectory from "./createTempDirectory"

class ManifestBuildStage extends BuildStage {
  constructor() {
    super(`manifest`, [createTempDirectory], false)
  }

  performStart() {
    const metadataJson = metadata.json
    fs.writeFile(path.join(`temp`, `win32`, `win32.manifest`), `
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
      </assembly>`, error => this.handle(error, () => this.done()))
  }
}

export default new ManifestBuildStage()
