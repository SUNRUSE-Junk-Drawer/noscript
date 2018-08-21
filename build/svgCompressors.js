import Svgo from "svgo"

export default {
  svgo(svg, onSuccess, onError) {
    new Svgo({
      plugins: [{
        cleanupAttrs: true
      }, {
        inlineStyles: true
      }, {
        removeDoctype: true
      }, {
        removeXMLProcInst: true
      }, {
        removeComments: true
      }, {
        removeMetadata: true
      }, {
        removeTitle: true
      }, {
        removeDesc: true
      }, {
        removeUselessDefs: true
      }, {
        removeXMLNS: true
      }, {
        removeEditorsNSData: true
      }, {
        removeEmptyAttrs: true
      }, {
        removeHiddenElems: true
      }, {
        removeEmptyText: true
      }, {
        removeEmptyContainers: true
      }, {
        removeViewBox: false
      }, {
        cleanupEnableBackground: true
      }, {
        minifyStyles: true
      }, {
        convertStyleToAttrs: true
      }, {
        convertColors: true
      }, {
        convertPathData: true
      }, {
        convertTransform: true
      }, {
        removeUnknownsAndDefaults: true
      }, {
        removeNonInheritableGroupAttrs: true
      }, {
        removeUselessStrokeAndFill: true
      }, {
        removeUnusedNS: true
      }, {
        cleanupIDs: true
      }, {
        cleanupNumericValues: true
      }, {
        cleanupListOfValues: {
          floatPrecision: 0,
          leadingZero: true,
          defaultPx: true,
          convertToPx: true
        }
      }, {
        moveElemsAttrsToGroup: true
      }, {
        moveGroupAttrsToElems: true
      }, {
        collapseGroups: true
      }, {
        removeRasterImages: true
      }, {
        mergePaths: true
      }, {
        convertShapeToPath: true
      }, {
        sortAttrs: true
      }, {
        removeDimensions: true
      }, {
        removeStyleElement: true
      }, {
        removeScriptElement: true
      }]
    })
      .optimize(svg)
      .catch(e => onError(e))
      .then(onSuccess)
  }
}
