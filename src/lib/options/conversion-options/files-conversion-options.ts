import { Delimiter } from '../../generators/code-snippet-generators';

export enum SVG_TO_TS_COMPILATION_OUTPUT {
  ESM = 'ESM',
  UMD = 'UMD',
  ESM_AND_UMD = 'ESM_AND_UMD'
}

export interface FilesConversionOptions {
  tsx: boolean;
  config?: string;
  srcFiles?: string[];
  outputDirectory?: string;
  svgoConfig?: any;
  delimiter?: Delimiter;
  verbose?: boolean;
  typeName?: string;
  generateType?: boolean;
  generateTypeObject?: boolean;
  generateEnum?: boolean;
  exportCompleteIconSet?: boolean;
  completeIconSetName?: string;
  prefix?: string;
  namePrefix?: string;
  interfaceName?: string;
  enumName?: string;
  modelFileName?: string;
  additionalModelOutputPath?: string | null;
  iconsFolderName?: string;
  compileSources?: boolean;
  compilationOutput?: SVG_TO_TS_COMPILATION_OUTPUT;
  barrelFileName?: string;
}
