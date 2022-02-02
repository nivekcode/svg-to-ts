import commander from 'commander';

import * as packgeJSON from '../../../../package.json';
import { Delimiter } from '../../generators/code-snippet-generators';
import { DEFAULT_OPTIONS } from '../default-options';
import { DEFAULT_OBJECT_CONVERSION_OPTIONS } from '../default-options/default-object-conversion-options';

export const setupObjectOptionsCommander = () => {
  const collect = (value, previous) => previous.concat([value]);
  commander
    .version(packgeJSON.version)
    .option('--config <string>', 'path to the configuration file')
    .option(
      '-d --delimiter <Delimiter>',
      `delimiter which is used to generate the types and name properties (${Object.values(Delimiter).join(',')})`,
      DEFAULT_OBJECT_CONVERSION_OPTIONS.delimiter
    )
    .option(
      '-s --srcFiles <value>',
      'name of the source directory',
      collect,
      DEFAULT_OBJECT_CONVERSION_OPTIONS.srcFiles
    )
    .option('-o --outputDirectory <string>', 'name of the output directory', DEFAULT_OPTIONS.outputDirectory)
    .option('--svgoConfig <any>', 'Path to svgo configuration JSON or inline svgo configuration object')
    .option(
      '--verbose <boolean>',
      'Specifies if a verbose log message should be printed or not',
      DEFAULT_OPTIONS.verbose
    )
    .parse(process.argv);
};
