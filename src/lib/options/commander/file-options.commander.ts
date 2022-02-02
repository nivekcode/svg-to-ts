import commander from 'commander';

import * as packgeJSON from '../../../../package.json';
import { Delimiter } from '../../generators/code-snippet-generators';
import { DEFAULT_FILES_CONVERSION_OPTIONS } from '../default-options/default-files-conversion-options';

export const setupFilesOptionsCommander = () => {
  const collect = (value, previous) => previous.concat([value]);
  commander
    .version(packgeJSON.version)
    .option('--config <string>', 'path to the configuration file')
    .option(
      '-t --typeName <string>',
      'name of the generated enumeration type',
      DEFAULT_FILES_CONVERSION_OPTIONS.typeName
    )
    .option(
      '--generateType <boolean>',
      'prevent generating enumeration type',
      DEFAULT_FILES_CONVERSION_OPTIONS.generateType
    )
    .option(
      '--generateTypeObject <boolean>',
      'generate type object',
      DEFAULT_FILES_CONVERSION_OPTIONS.generateTypeObject
    )
    .option(
      '--barrelFileName <string>',
      'name to use for the barrel file',
      DEFAULT_FILES_CONVERSION_OPTIONS.barrelFileName
    )
    .option(
      '-d --delimiter <Delimiter>',
      `delimiter which is used to generate the types and name properties (${Object.values(Delimiter).join(',')})`
    )
    .option('-p --prefix <string>', 'prefix for the generated svg constants', DEFAULT_FILES_CONVERSION_OPTIONS.prefix)
    .option(
      '-i --interfaceName <string>',
      'name for the generated interface',
      DEFAULT_FILES_CONVERSION_OPTIONS.interfaceName
    )
    .option('-s --srcFiles <value>', 'name of the source directory', collect, [])
    .option(
      '-o --outputDirectory <string>',
      'name of the output directory',
      DEFAULT_FILES_CONVERSION_OPTIONS.outputDirectory
    )
    .option('--svgoConfig <any>', 'Path to svgo configuration JSON or inline svgo configuration object')
    .option(
      '--modelFileName <string>',
      'FileName of the model file (only necessary when conversion type is set to files)',
      DEFAULT_FILES_CONVERSION_OPTIONS.modelFileName
    )
    .option(
      '--iconsFolderName <string>',
      'Name of the folder the icons will be generated to (only necessary when conversion type is set to files)',
      DEFAULT_FILES_CONVERSION_OPTIONS.iconsFolderName
    )
    .option(
      '--additionalModelOutputPath <string>',
      'Additional outputpath for the models file (only helpful when conversion type is set to files)',
      DEFAULT_FILES_CONVERSION_OPTIONS.additionalModelOutputPath
    )
    .option(
      '--compileSources <boolean>',
      'Tells if the sources should be precompiled with the TypeScript compiler. If true, you will only end up with d.ts and js files (only necessary when conversion type is set to files)',
      DEFAULT_FILES_CONVERSION_OPTIONS.compileSources
    )
    .option(
      '--exportCompleteIconSet <boolean>',
      'Specifies if the complete icon set should be exported or not',
      DEFAULT_FILES_CONVERSION_OPTIONS.exportCompleteIconSet
    )
    .option(
      '--verbose <boolean>',
      'Specifies if a verbose log message should be printed or not',
      DEFAULT_FILES_CONVERSION_OPTIONS.verbose
    )
    .parse(process.argv);
};
