import commander from 'commander';
import { MultiFileConvertionOptions, SingleFileConvertionOptions } from './convertion-options';
import { DEFAULT_OPTIONS } from './default-options';
import * as packgeJSON from '../../../package.json';
import { Delimiter } from '../generators/code-snippet-generators';
import { getSvgoConfig } from '../helpers/svg-optimization';

export const setupCommander = () => {
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
      '--preCompileSources <boolean>',
      'Tells if the sources should be precompiled with the TypeScript compiler. If true, you will only end up with d.ts and js files (only necessary when optimizeForLazyLoading option is enabled)',
      DEFAULT_OPTIONS.compileSources
    )
    .parse(process.argv);
};

export const collectArgumentOptions = async (): Promise<SingleFileConvertionOptions | MultiFileConvertionOptions> => {
  const {
    delimiter,
    fileName,
    interfaceName,
    outputDirectory,
    prefix,
    typeName,
    modelFileName,
    iconsFolderName,
    optimizeForLazyLoading,
    additionalModelOutputPath,
    compileSources
  } = commander;
  let svgoConfig = commander.svgoConfig;

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OPTIONS.srcFiles;
  }

  if (svgoConfig) {
    svgoConfig = await getSvgoConfig(svgoConfig);
  }

  return {
    delimiter,
    fileName,
    interfaceName,
    srcFiles,
    outputDirectory,
    prefix,
    typeName,
    modelFileName,
    iconsFolderName,
    svgoConfig,
    optimizeForLazyLoading,
    additionalModelOutputPath,
    compileSources
  };
};
