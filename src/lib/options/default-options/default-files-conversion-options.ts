import { Delimiter } from '../../generators/code-snippet-generators';
import { FilesConversionOptions, SVG_TO_TS_COMPILATION_OUTPUT } from '../conversion-options/files-conversion-options';

export const DEFAULT_FILES_CONVERSION_OPTIONS: FilesConversionOptions = {
  tsx: false,
  interfaceName: 'MyIcon',
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
  completeIconSetName: 'complete-icon-set',
  compilationOutput: SVG_TO_TS_COMPILATION_OUTPUT.ESM,
  verbose: false,
  barrelFileName: 'index',
  delimiter: Delimiter.SNAKE
};
