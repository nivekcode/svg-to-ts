#!/usr/bin/env node
import * as packgeJSON from '../../package.json';
import commander from 'commander';
import { convert } from '../lib/convert';

const DEFAULTS = {
  typeName: 'myIcons',
  interfaceName: 'MyIcon',
  fileName: 'my-icons',
  prefix: 'myIcon',
  sourceDirectory: '.',
  outputDirectory: './dist'
};

commander
  .version(packgeJSON.version)
  .option('-t --typeName <string>', 'name of the generated enumeration type', DEFAULTS.typeName)
  .option('-f --fileName <string>', 'name of the generated file', DEFAULTS.fileName)
  .option('-p --prefix <string>', 'prefix for the generated svg constants', DEFAULTS.prefix)
  .option('-i --interfaceName <string>', 'name for the generated interface', DEFAULTS.interfaceName)
  .option('-s --srcDirectory <string>', 'name of the source directory', DEFAULTS.sourceDirectory)
  .option('-o --outputDirectory <string>', 'name of the output directory', DEFAULTS.outputDirectory)
  .parse(process.argv);

const { typeName, fileName, prefix, interfaceName, srcDirectory, outputDirectory } = commander;

const convertionOptions = {
  typeName,
  fileName,
  prefix,
  interfaceName,
  srcDirectory,
  outputDirectory
};
convert(convertionOptions);
