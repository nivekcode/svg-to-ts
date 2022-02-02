import { Delimiter } from '../../generators/code-snippet-generators';

export interface ObjectConversionOptions {
  config?: string;
  srcFiles: string[];
  outputDirectory: string;
  svgoConfig?: any;
  delimiter: Delimiter;
  verbose: boolean;
  fileName: string;
  objectName: string;
}
