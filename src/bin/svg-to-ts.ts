#!/usr/bin/env node
import * as packgeJSON from '../../package.json';
import commander from 'commander';
import { convert } from '../lib/convert';

const DEFAULTS = {
  typeName: 'myIcons',
  interfaceName: 'MyIcon',
  fileName: 'my-icons',
  prefix: 'myIcon',
  sourceDirectories: ['.'],
  outputDirectory: './dist'
};

function collect(value, previous) {
  return previous.concat([value]);
}

commander
  .version(packgeJSON.version)
  .option('-t --typeName <string>', 'name of the generated enumeration type', DEFAULTS.typeName)
  .option('-f --fileName <string>', 'name of the generated file', DEFAULTS.fileName)
  .option('-p --prefix <string>', 'prefix for the generated svg constants', DEFAULTS.prefix)
  .option('-i --interfaceName <string>', 'name for the generated interface', DEFAULTS.interfaceName)
  .option('-s --srcDirectory <value>', 'name of the source directory', collect, [])
  .option('-o --outputDirectory <string>', 'name of the output directory', DEFAULTS.outputDirectory)
  .parse(process.argv);

const { typeName, fileName, prefix, interfaceName, outputDirectory } = commander;

// Because of commander adding default value to params
// See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
let srcDirectories = commander.srcDirectory;
if (srcDirectories.length === 0) {
  srcDirectories = DEFAULTS.sourceDirectories;
}

const convertionOptions = {
  typeName,
  fileName,
  prefix,
  interfaceName,
  srcDirectories,
  outputDirectory
};
convert(convertionOptions);
