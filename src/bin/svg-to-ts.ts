#!/usr/bin/env node
import commander from 'commander';

import * as packgeJSON from '../../package.json';
import { Delimiter } from '../lib/generators/code-snippet-generators';
import { convertToSingleFile } from '../lib/converters/single-file.converter';
import { convertToMultipleFiles } from '../lib/converters/multiple-files.converter';
import { DEFAULT_OPTIONS } from '../lib/options/default-options';
import { getOptions, MultiFileConvertionOptions, SingleFileConvertionOptions } from '../lib/options/convertion-options';
import { printLogo } from '../lib/helpers/log-helper';

const collect = (value, previous) => previous.concat([value]);

commander
  .version(packgeJSON.version)
  .option('-t --typeName <string>', 'name of the generated enumeration type', DEFAULT_OPTIONS.typeName)
  .option('-f --fileName <string>', 'name of the generated file', DEFAULT_OPTIONS.fileName)
  .option(
    '-d --delimiter <Delimiter>',
    `delimiter which is used to generate the types and name properties (${Object.values(Delimiter).join(',')})`,
    DEFAULT_OPTIONS.delimiter
  )
  .option('-p --prefix <string>', 'prefix for the generated svg constants', DEFAULT_OPTIONS.prefix)
  .option('-i --interfaceName <string>', 'name for the generated interface', DEFAULT_OPTIONS.interfaceName)
  .option('-s --srcFiles <value>', 'name of the source directory', collect, [])
  .option('-o --outputDirectory <string>', 'name of the output directory', DEFAULT_OPTIONS.outputDirectory)
  .option(
    '--optimizeForLazyLoading <boolean>',
    'optimize the output for lazyloading',
    DEFAULT_OPTIONS.optimizeForLazyLoading
  )
  .option(
    '--modelFileName <string>',
    'FileName of the model file (only necessary when optimizeForLazyLoading option is enabled)',
    DEFAULT_OPTIONS.modelFileName
  )
  .option(
    '--iconsFolderName <string>',
    'Name of the folder the icons will be generated to (only necessary when optimizeForLazyLoading option is enabled)',
    DEFAULT_OPTIONS.iconsFolderName
  )
  .parse(process.argv);

printLogo();
const convertionOptions = getOptions();

if (convertionOptions.optimizeForLazyLoading) {
  convertToMultipleFiles(convertionOptions as MultiFileConvertionOptions);
} else {
  convertToSingleFile(convertionOptions as SingleFileConvertionOptions);
}
