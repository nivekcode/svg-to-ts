export const DEFAULT_OPTIONS = {
  fileName: 'my-icons',
  interfaceName: 'MyIcon',
  objectName: 'icons',
  outputDirectory: './dist',
  prefix: 'myIcon',
  srcFiles: ['*.svg'],
  typeName: 'myIcons',
  enumName: 'MyIcons',
  generateType: true,
  generateTypeObject: false,
  generateEnum: false,
  additionalModelOutputPath: null,
  modelFileName: 'my-icons.model',
  iconsFolderName: 'build',
  compileSources: false,
  exportCompleteIconSet: false,
  verbose: false,
  barrelFileName: 'index',
  svgoConfig: {
    plugins: [
      {
        cleanupAttrs: true
      },
      {
        removeDoctype: true
      },
      {
        removeXMLProcInst: true
      },
      {
        removeComments: true
      },
      {
        removeMetadata: true
      },
      {
        removeTitle: true
      },
      {
        removeDesc: true
      },
      {
        removeUselessDefs: true
      },
      {
        removeEditorsNSData: true
      },
      {
        removeEmptyAttrs: true
      },
      {
        removeHiddenElems: true
      },
      {
        removeEmptyText: true
      },
      {
        removeEmptyContainers: true
      },
      {
        removeViewBox: false
      },
      {
        cleanupEnableBackground: true
      },
      {
        convertStyleToAttrs: true
      },
      {
        convertColors: true
      },
      {
        convertPathData: true
      },
      {
        convertTransform: true
      },
      {
        removeUnknownsAndDefaults: true
      },
      {
        removeNonInheritableGroupAttrs: true
      },
      {
        removeUselessStrokeAndFill: true
      },
      {
        removeUnusedNS: true
      },
      {
        cleanupIDs: true
      },
      {
        cleanupNumericValues: true
      },
      {
        moveElemsAttrsToGroup: true
      },
      {
        moveGroupAttrsToElems: true
      },
      {
        collapseGroups: true
      },
      {
        removeRasterImages: false
      },
      {
        mergePaths: true
      },
      {
        convertShapeToPath: true
      },
      {
        sortAttrs: true
      },
      {
        removeDimensions: true
      },
      {
        prefixIds: true
      }
    ]
  }
};
