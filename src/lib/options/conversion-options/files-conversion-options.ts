import { Delimiter } from '../../generators/code-snippet-generators';

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
  interfaceName?: string;
  enumName?: string;
  modelFileName?: string;
  additionalModelOutputPath?: string | null;
  iconsFolderName?: string;
  compileSources?: boolean;
  barrelFileName?: string;
}
