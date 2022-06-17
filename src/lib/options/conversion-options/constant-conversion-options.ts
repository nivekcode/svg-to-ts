import { Delimiter } from '../../generators/code-snippet-generators';

export interface ConstantsConversionOptions {
  tsx: boolean;
  config?: string;
  srcFiles?: string[];
  outputDirectory?: string;
  svgoConfig?: any;
  delimiter?: Delimiter;
  verbose?: boolean;
  fileName?: string;
  typeName?: string;
  enumName?: string;
  generateType?: boolean;
  generateTypeObject?: boolean;
  generateEnum?: boolean;
  exportCompleteIconSet?: boolean;
  completeIconSetName: string;
  prefix?: string;
  namePrefix?: string;
  interfaceName?: string;
}
