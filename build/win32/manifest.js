import xmlEscape from "xml-escape"
import WriteFileBuildStage from "./../writeFileBuildStage"

import metadata from "./../metadata"
import createTempDirectory from "./createTempDirectory"

export default new WriteFileBuildStage(
  `win32/manifest`,
  () => [`temp`, `win32`, `win32.manifest`],
  () => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
    <assemblyIdentity
        version="1.0.0.0"
        processorArchitecture="*"
        name="${xmlEscape(metadata.json.companyId)}.${xmlEscape(metadata.json.productId)}.${xmlEscape(metadata.json.applicationId)}"
        type="win32"
    />
    <description>${xmlEscape(metadata.json.description)}</description>
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
  </assembly>`,
  [createTempDirectory]
)
