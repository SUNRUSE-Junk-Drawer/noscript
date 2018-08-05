import WriteFileBuildStage from "./writeFileBuildStage"

export default class GenerateMetadataHeaderBuildStage extends WriteFileBuildStage {
  constructor(parent, metadata, createTempDirectory) {
    super(
      parent,
      `generateMetadataHeader`,
      () => [`games`, parent.name, `temp`, `metadata.h`],
      () => `
        #define SE_METADATA_APPLICATION_ID ${JSON.stringify(metadata.json.applicationId)}
        #define SE_METADATA_APPLICATION_NAME ${JSON.stringify(metadata.json.applicationName)}
        #define SE_METADATA_PRODUCT_ID ${JSON.stringify(metadata.json.productId)}
        #define SE_METADATA_PRODUCT_NAME ${JSON.stringify(metadata.json.productName)}
        #define SE_METADATA_COMPANY_ID ${JSON.stringify(metadata.json.companyId)}
        #define SE_METADATA_COMPANY_NAME ${JSON.stringify(metadata.json.companyName)}
        #define SE_METADATA_DESCRIPTION ${JSON.stringify(metadata.json.description)}
      `,
      [createTempDirectory])
  }
}
