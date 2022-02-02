import commander from 'commander';

import * as packgeJSON from '../../../../package.json';
import { Delimiter } from '../../generators/code-snippet-generators';
import { DEFAULT_CONST_CONVERSION_OPTIONS } from '../default-options/default-constants-conversion-options';

export const setupConstantOptionsCommander = () => {
  const collect = (value, previous) => previous.concat([value]);
  commander
    .version(packgeJSON.version)
    .option('--config <string>', 'path to the configuration file')
    .option(
      '-t --typeName <string>',
      'name of the generated enumeration type',
      DEFAULT_CONST_CONVERSION_OPTIONS.typeName
    )
    .option(
      '--generateType <boolean>',
      'prevent generating enumeration type',
      DEFAULT_CONST_CONVERSION_OPTIONS.generateType
    )
    .option(
      '--generateTypeObject <boolean>',
      'generate type object',
      DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject
    )
    .option('-f --fileName <string>', 'name of the generated file', DEFAULT_CONST_CONVERSION_OPTIONS.fileName)
    .option(
      '--enumName <string>',
      'the name of the generated enum',
      DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject
    )
    .option('--generateEnum <boolean>', 'generate enum', DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject)
    .option('-f --fileName <string>', 'name of the generated file', DEFAULT_CONST_CONVERSION_OPTIONS.fileName)
    .option(
      '-d --delimiter <Delimiter>',
      `delimiter which is used to generate the types and name properties (${Object.values(Delimiter).join(',')})`,
      DEFAULT_CONST_CONVERSION_OPTIONS.delimiter
    )
    .option(
      '-i --interfaceName <string>',
      'name for the generated interface',
      DEFAULT_CONST_CONVERSION_OPTIONS.interfaceName
    )
    .option('-s --srcFiles <value>', 'name of the source directory', collect, [])
    .option(
      '-o --outputDirectory <string>',
      'name of the output directory',
      DEFAULT_CONST_CONVERSION_OPTIONS.outputDirectory
    )
    .option('--svgoConfig <any>', 'Path to svgo configuration JSON or inline svgo configuration object')
    .option('-p --prefix <string>', 'prefix for the generated svg constants', DEFAULT_CONST_CONVERSION_OPTIONS.prefix)
    .option(
      '--exportCompleteIconSet <boolean>',
      'Specifies if the complete icon set should be exported or not',
      DEFAULT_CONST_CONVERSION_OPTIONS.exportCompleteIconSet
    )
    .option(
      '--verbose <boolean>',
      'Specifies if a verbose log message should be printed or not',
      DEFAULT_CONST_CONVERSION_OPTIONS.verbose
    )
    .parse(process.argv);
};
