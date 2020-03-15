import { Delimiter } from '../generators/code-snippet-generators';

export const DEFAULT_OPTIONS = {
  fileName: 'my-icons',
  delimiter: Delimiter.SNAKE,
  interfaceName: 'MyIcon',
  outputDirectory: './dist',
  prefix: 'myIcon',
  srcFiles: ['*.svg'],
  typeName: 'myIcons',
  optimizeForLazyLoading: false,
  additionalModelOutputPath: null,
  modelFileName: 'my-icons.model',
  iconsFolderName: 'build',
  preCompileSources: false
};
