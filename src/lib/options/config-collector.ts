import { cosmiconfigSync } from 'cosmiconfig';

import * as packgeJSON from '../../../package.json';
import { Delimiter } from '../generators/code-snippet-generators';
import { Logger } from '../helpers/logger';
import { getSvgoConfig } from '../helpers/svg-optimization';

import { getConfigPath } from './command-line-collector';
import {
  ConversionType,
  FileConversionOptions,
  ObjectConversionOptions,
  ConstantsConversionOptions
} from './conversion-options';
import { DEFAULT_OPTIONS } from './default-options';

export const collectConfigurationOptions = async (): Promise<
  | ConstantsConversionOptions
  | FileConversionOptions
  | ObjectConversionOptions
  | Array<ConstantsConversionOptions | FileConversionOptions | ObjectConversionOptions>
  | null
> => {
  const explorerSync = cosmiconfigSync(packgeJSON.name);
  const configPath = getConfigPath();
  const cosmiConfigResult = configPath ? explorerSync.load(configPath) : explorerSync.search();
  cosmiConfigResult
    ? Logger.verboseInfo(`Configuration found under: ${cosmiConfigResult.filepath}`)
    : Logger.verboseInfo('No config found');

  if (!cosmiConfigResult) {
    return null;
  }
  if (Array.isArray(cosmiConfigResult.config)) {
    return Promise.all(
      cosmiConfigResult.config.map(
        (config: Partial<FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions>) =>
          mergeWithDefaults(config)
      )
    );
  }
  return await mergeWithDefaults(cosmiConfigResult.config);
};

export const mergeWithDefaults = async (
  options
): Promise<FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions> => {
  const configOptions = { ...options };

  if (!options.conversionType) {
    Logger.error(`A conversionType is required, please specify one by passing it via --conversionType. 
    Valid conversion types are (object, constants or files)`);
    process.exit();
  }

  if (!configOptions.verbose) {
    configOptions.verbose = DEFAULT_OPTIONS.verbose;
    Logger.verboseInfo(`No "verbose" property provided, "${DEFAULT_OPTIONS.verbose}" will be used`);
  }

  if (!configOptions.outputDirectory) {
    configOptions.outputDirectory = DEFAULT_OPTIONS.outputDirectory;
    Logger.verboseInfo(`No outputDirectory provided, "${DEFAULT_OPTIONS.outputDirectory}" will be used`);
  }

  if (!configOptions.srcFiles) {
    configOptions.srcFiles = DEFAULT_OPTIONS.srcFiles;
    Logger.verboseInfo(`No srcFiles provided, "${DEFAULT_OPTIONS.srcFiles}" will be used`);
  }

  if (!configOptions.svgoConfig) {
    Logger.verboseInfo(`No svgoConfig provided, default configuration of SVGO will be used`);
  }
  configOptions.svgoConfig = await getSvgoConfig(configOptions.svgoConfig);

  if (!configOptions.delimiter) {
    configOptions.delimiter = options.conversionType === ConversionType.OBJECT ? Delimiter.CAMEL : Delimiter.SNAKE;
    Logger.verboseInfo(`No delimiter provided, "${configOptions.delimiter}" will be used`);
  }

  if (options.conversionType === ConversionType.CONSTANTS || options.conversionType === ConversionType.OBJECT) {
    if (!(configOptions as ConstantsConversionOptions).fileName) {
      (configOptions as ConstantsConversionOptions).fileName = DEFAULT_OPTIONS.modelFileName;
      Logger.verboseInfo(`No fileName provided, "${DEFAULT_OPTIONS.modelFileName}" will be used`);
    }
  }

  if (options.conversionType === ConversionType.CONSTANTS || options.conversionType === ConversionType.FILES) {
    if (!configOptions.typeName) {
      configOptions.typeName = DEFAULT_OPTIONS.typeName;
      Logger.verboseInfo(`No typeName provided, "${DEFAULT_OPTIONS.typeName}" will be used`);
    }

    if (configOptions.generateType === undefined) {
      configOptions.generateType = DEFAULT_OPTIONS.generateType;
      Logger.verboseInfo(`No generateType provided, "${DEFAULT_OPTIONS.generateType}" will be used`);
    }

    if (configOptions.generateTypeObject === undefined) {
      configOptions.generateTypeObject = DEFAULT_OPTIONS.generateTypeObject;
      Logger.verboseInfo(`No generateTypeObject provided, "${DEFAULT_OPTIONS.generateTypeObject}" will be used`);
    }

    if (!configOptions.interfaceName) {
      configOptions.interfaceName = DEFAULT_OPTIONS.interfaceName;
      Logger.verboseInfo(`No interfaceName provided, "${DEFAULT_OPTIONS.interfaceName}" will be used`);
    }

    if (typeof configOptions.prefix !== 'string') {
      configOptions.prefix = DEFAULT_OPTIONS.prefix;
      Logger.verboseInfo(`No prefix provided, "${DEFAULT_OPTIONS.prefix}" will be used`);
    }
  }

  if (configOptions.conversionType === ConversionType.FILES) {
    if (!(configOptions as FileConversionOptions).modelFileName) {
      (configOptions as FileConversionOptions).modelFileName = DEFAULT_OPTIONS.modelFileName;
      Logger.verboseInfo(`No modelFileName provided, "${DEFAULT_OPTIONS.modelFileName}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).iconsFolderName) {
      (configOptions as FileConversionOptions).iconsFolderName = DEFAULT_OPTIONS.iconsFolderName;
      Logger.verboseInfo(`No iconsFolderName provided, "${DEFAULT_OPTIONS.iconsFolderName}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).compileSources) {
      (configOptions as FileConversionOptions).compileSources = DEFAULT_OPTIONS.compileSources;
      Logger.verboseInfo(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.compileSources}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).exportCompleteIconSet) {
      (configOptions as FileConversionOptions).exportCompleteIconSet = DEFAULT_OPTIONS.exportCompleteIconSet;
      Logger.verboseInfo(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.exportCompleteIconSet}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).barrelFileName) {
      (configOptions as FileConversionOptions).barrelFileName = DEFAULT_OPTIONS.barrelFileName;
      Logger.verboseInfo(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.barrelFileName}" will be used`);
    }

    return configOptions as FileConversionOptions;
  }
  return configOptions as ConstantsConversionOptions;
};
