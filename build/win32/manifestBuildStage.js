import xmlEscape from "xml-escape"
import WriteFileBuildStage from "./../writeFileBuildStage"

export default class ManifestBuildStage extends WriteFileBuildStage {
  constructor(game, metadata, createWin32TempDirectory) {
    super(
      game,
      `win32/manifest`,
      () => [`games`, game.name, `temp`, `win32`, `manifest.manifest`],
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
      [createWin32TempDirectory]
    )
  }
}
