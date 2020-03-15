import { Delimiter } from '../generators/code-snippet-generators';

const DEFAULT_OUTPUT_PATH = './dist';

export const DEFAULT_OPTIONS = {
  fileName: 'my-icons',
  delimiter: Delimiter.SNAKE,
  interfaceName: 'MyIcon',
  outputDirectory: DEFAULT_OUTPUT_PATH,
  prefix: 'myIcon',
  srcFiles: ['*.svg'],
  typeName: 'myIcons',
  optimizeForLazyLoading: false,
  modelOutputPath: DEFAULT_OUTPUT_PATH,
  modelFileName: 'my-icons.model',
  iconsFolderName: 'build',
  preCompileSources: false
};
