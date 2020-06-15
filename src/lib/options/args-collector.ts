import commander from 'commander';

import * as packgeJSON from '../../../package.json';
import { Delimiter } from '../generators/code-snippet-generators';
import { getSvgoConfig } from '../helpers/svg-optimization';

import {
  FileConvertionOptions,
  ConstantsConvertionOptions,
  ObjectConvertionOptions,
  ConvertionType
} from './convertion-options';
import { DEFAULT_OPTIONS } from './default-options';
import { error } from '../helpers/log-helper';

export const setupCommander = () => {
  const collect = (value, previous) => previous.concat([value]);
  commander
    .version(packgeJSON.version)
    .option('--convertionType <ConvertionType>', 'convertion type (object, constants, files)')
    .option('--objectName <string>', 'name of the exported object', DEFAULT_OPTIONS.objectName)
    .option('--typeName <string>', 'name of the generated enumeration type', DEFAULT_OPTIONS.typeName)
    .option('--generateType <boolean>', 'prevent generating enumeration type', DEFAULT_OPTIONS.generateType)
    .option('--generateTypeObject <boolean>', 'generate type object', DEFAULT_OPTIONS.generateTypeObject)
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
      '--svgoConfig <any>',
      'Path to svgo configuration JSON or inline svgo configuration object',
      DEFAULT_OPTIONS.svgoConfig
    )
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
    .option(
      '--additionalModelOutputPath <string>',
      'Additional outputpath for the models file (only helpful when optimizeForLazyLoading option is enabled)',
      DEFAULT_OPTIONS.additionalModelOutputPath
    )
    .option(
      '--compileSources <boolean>',
      'Tells if the sources should be precompiled with the TypeScript compiler. If true, you will only end up with d.ts and js files (only necessary when optimizeForLazyLoading option is enabled)',
      DEFAULT_OPTIONS.compileSources
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

export const collectArgumentOptions = async (): Promise<
  ConstantsConvertionOptions | FileConvertionOptions | ObjectConvertionOptions
> => {
  if (!commander.convertionType) {
    error(`A convertionType is required, please specify one by passing it via --convertionType. 
    Valid convertiontypes are (object, single-file or multiple-files)`);
    process.exit();
  }

  let {
    convertionType,
    objectName,
    delimiter,
    fileName,
    interfaceName,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    modelFileName,
    iconsFolderName,
    optimizeForLazyLoading,
    additionalModelOutputPath,
    compileSources
  } = commander;
  let svgoConfig = commander.svgoConfig;

  // Parse boolean values
  generateType = toBoolean(generateType, DEFAULT_OPTIONS.generateType);
  generateTypeObject = toBoolean(generateTypeObject, DEFAULT_OPTIONS.generateTypeObject);
  optimizeForLazyLoading = toBoolean(optimizeForLazyLoading, DEFAULT_OPTIONS.optimizeForLazyLoading);
  compileSources = toBoolean(compileSources, DEFAULT_OPTIONS.compileSources);

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OPTIONS.srcFiles;
  }

  if (svgoConfig) {
    svgoConfig = await getSvgoConfig(svgoConfig);
  }

  if (convertionType === ConvertionType.OBJECT) {
    return {
      convertionType,
      delimiter,
      srcFiles,
      outputDirectory,
      svgoConfig,
      fileName,
      objectName
    };
  }

  if (convertionType === ConvertionType.CONSTANTS) {
    return {
      convertionType,
      delimiter,
      fileName,
      interfaceName,
      srcFiles,
      outputDirectory,
      prefix,
      typeName,
      generateType,
      generateTypeObject,
      svgoConfig,
      optimizeForLazyLoading
    };
  }

  return {
    convertionType,
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
    svgoConfig,
    optimizeForLazyLoading,
    additionalModelOutputPath,
    compileSources
  };
};
