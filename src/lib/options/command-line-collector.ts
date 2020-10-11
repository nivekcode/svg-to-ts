import commander from 'commander';

import * as packgeJSON from '../../../package.json';
import { Delimiter } from '../generators/code-snippet-generators';
import { error } from '../helpers/log-helper';
import { getSvgoConfig } from '../helpers/svg-optimization';

import {
  ConstantsConversionOptions,
  ConversionType,
  FileConversionOptions,
  ObjectConversionOptions
} from './conversion-options';
import { DEFAULT_OPTIONS } from './default-options';

export const setupCommander = () => {
  const collect = (value, previous) => previous.concat([value]);
  commander
    .version(packgeJSON.version)
    .option('--config <string>', 'path to the configuration file')
    .option('-c --conversionType <ConversionType>', 'conversion type (object, constants, files)')
    .option('--objectName <string>', 'name of the exported object')
    .option('-t --typeName <string>', 'name of the generated enumeration type', DEFAULT_OPTIONS.typeName)
    .option('--generateType <boolean>', 'prevent generating enumeration type', DEFAULT_OPTIONS.generateType)
    .option('--generateTypeObject <boolean>', 'generate type object', DEFAULT_OPTIONS.generateTypeObject)
    .option('-f --fileName <string>', 'name of the generated file', DEFAULT_OPTIONS.fileName)
    .option('--barrelFileName <string>', 'name to use for the barrel file', DEFAULT_OPTIONS.barrelFileName)
    .option(
      '-d --delimiter <Delimiter>',
      `delimiter which is used to generate the types and name properties (${Object.values(Delimiter).join(',')})`
    )
    .option('-p --prefix <string>', 'prefix for the generated svg constants', DEFAULT_OPTIONS.prefix)
    .option('-i --interfaceName <string>', 'name for the generated interface', DEFAULT_OPTIONS.interfaceName)
    .option('-s --srcFiles <value>', 'name of the source directory', collect, [])
    .option('-o --outputDirectory <string>', 'name of the output directory', DEFAULT_OPTIONS.outputDirectory)
    .option(
      '--svgoConfig <any>',
      'Path to svgo configuration JSON or inline svgo configuration object',
      DEFAULT_OPTIONS.svgoConfig
    )
    .option(
      '--modelFileName <string>',
      'FileName of the model file (only necessary when conversion type is set to files)',
      DEFAULT_OPTIONS.modelFileName
    )
    .option(
      '--iconsFolderName <string>',
      'Name of the folder the icons will be generated to (only necessary when conversion type is set to files)',
      DEFAULT_OPTIONS.iconsFolderName
    )
    .option(
      '--additionalModelOutputPath <string>',
      'Additional outputpath for the models file (only helpful when conversion type is set to files)',
      DEFAULT_OPTIONS.additionalModelOutputPath
    )
    .option(
      '--compileSources <boolean>',
      'Tells if the sources should be precompiled with the TypeScript compiler. If true, you will only end up with d.ts and js files (only necessary when conversion type is set to files)',
      DEFAULT_OPTIONS.compileSources
    )
    .option(
      '--exportCompleteIconSet <boolean>',
      'Specifies if the complete icon set should be exported or not',
      DEFAULT_OPTIONS.exportCompleteIconSet
    )
    .parse(process.argv);
};

const toBoolean = (str: string, defaultValue: boolean): boolean => {
  let result = defaultValue;
  switch (str) {
    case 'false':
      result = false;
      break;
    case '':
    case 'true':
      result = true;
      break;
  }
  return result;
};

export const getConfigPath = (): string | undefined => commander.config;

export const collectCommandLineOptions = async (): Promise<
  ConstantsConversionOptions | FileConversionOptions | ObjectConversionOptions
> => {
  if (!commander.conversionType) {
    error(`A conversion type is required, please specify one by passing it via --conversionType. 
    Valid conversion types are (object, constants or files)`);
    process.exit();
  }

  let {
    conversionType,
    objectName,
    delimiter,
    fileName,
    barrelFileName,
    interfaceName,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    modelFileName,
    iconsFolderName,
    additionalModelOutputPath,
    exportCompleteIconSet,
    compileSources
  } = commander;
  let svgoConfig = commander.svgoConfig;

  // Parse boolean values
  generateType = toBoolean(generateType, DEFAULT_OPTIONS.generateType);
  generateTypeObject = toBoolean(generateTypeObject, DEFAULT_OPTIONS.generateTypeObject);
  exportCompleteIconSet = toBoolean(exportCompleteIconSet, DEFAULT_OPTIONS.exportCompleteIconSet);
  compileSources = toBoolean(compileSources, DEFAULT_OPTIONS.compileSources);

  if (!delimiter) {
    delimiter = conversionType === ConversionType.OBJECT ? Delimiter.CAMEL : Delimiter.SNAKE;
  }

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OPTIONS.srcFiles;
  }

  if (svgoConfig) {
    svgoConfig = await getSvgoConfig(svgoConfig);
  }

  if (conversionType === ConversionType.OBJECT) {
    return {
      conversionType,
      delimiter,
      srcFiles,
      outputDirectory,
      svgoConfig,
      fileName,
      objectName
    };
  }

  if (conversionType === ConversionType.CONSTANTS) {
    return {
      conversionType,
      delimiter,
      fileName,
      interfaceName,
      srcFiles,
      outputDirectory,
      prefix,
      typeName,
      generateType,
      generateTypeObject,
      svgoConfig
    };
  }

  return {
    conversionType,
    delimiter,
    interfaceName,
    srcFiles,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    modelFileName,
    iconsFolderName,
    exportCompleteIconSet,
    svgoConfig,
    additionalModelOutputPath,
    compileSources,
    barrelFileName
  };
};
