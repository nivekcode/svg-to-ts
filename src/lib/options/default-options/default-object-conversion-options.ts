import { Delimiter } from '../../generators/code-snippet-generators';
import { ObjectConversionOptions } from '../conversion-options/object-conversion-options';

export const DEFAULT_OBJECT_CONVERSION_OPTIONS: ObjectConversionOptions = {
  tsx: false,
  srcFiles: ['*.svg'],
  outputDirectory: './dist',
  delimiter: Delimiter.CAMEL,
  verbose: false,
  fileName: 'my-icons',
  objectName: 'icons',
  generateType: true,
  typeName: 'MyIconType',
};
