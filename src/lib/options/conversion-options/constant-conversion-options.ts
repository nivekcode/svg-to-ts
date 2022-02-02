import { Delimiter } from '../../generators/code-snippet-generators';

export interface ConstantsConversionOptions {
  config?: string;
  srcFiles: string[];
  outputDirectory: string;
  svgoConfig?: any;
  delimiter: Delimiter;
  verbose: boolean;
  fileName: string;
  typeName: string;
  enumName: string;
  generateType: boolean;
  generateTypeObject: boolean;
  generateEnum: boolean;
  exportCompleteIconSet?: boolean;
  prefix: string;
  interfaceName: string;
}
