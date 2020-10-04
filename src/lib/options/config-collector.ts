import { cosmiconfigSync } from 'cosmiconfig';

import {
  ConversionType,
  FileConversionOptions,
  ObjectConversionOptions,
  ConstantsConversionOptions
} from './conversion-options';
import { DEFAULT_OPTIONS } from './default-options';

import * as packgeJSON from '../../../package.json';
import { error, info } from '../helpers/log-helper';
import { getSvgoConfig } from '../helpers/svg-optimization';
import { Delimiter } from '../generators/code-snippet-generators';

export const collectConfigurationOptions = async (): Promise<
  ConstantsConversionOptions | FileConversionOptions | ObjectConversionOptions | null
> => {
  const explorerSync = cosmiconfigSync(packgeJSON.name);
  const cosmiConfigResult = explorerSync.search();
  cosmiConfigResult ? info(`Configuration found under: ${cosmiConfigResult.filepath}`) : info('No config found');
  return cosmiConfigResult ? await mergeWithDefaults(cosmiConfigResult.config) : null;
};

const mergeWithDefaults = async (
  options
): Promise<FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions> => {
  const configOptions = { ...options };

  if (!options.conversionType) {
    error(`A conversionType is required, please specify one by passing it via --conversionType. 
    Valid conversion types are (object, constants or files)`);
    process.exit();
  }

  if (!configOptions.outputDirectory) {
    configOptions.outputDirectory = DEFAULT_OPTIONS.outputDirectory;
    info(`No outputDirectory provided, "${DEFAULT_OPTIONS.outputDirectory}" will be used`);
  }

  if (!configOptions.srcFiles) {
    configOptions.srcFiles = DEFAULT_OPTIONS.srcFiles;
    info(`No srcFiles provided, "${DEFAULT_OPTIONS.srcFiles}" will be used`);
  }

  if (!configOptions.svgoConfig) {
    configOptions.svgoConfig = DEFAULT_OPTIONS.svgoConfig;
    info(`No svgoConfig provided, default configuration will be used`);
  } else {
    configOptions.svgoConfig = await getSvgoConfig(configOptions.svgoConfig);
  }

  if (!configOptions.delimiter) {
    configOptions.delimiter = options.conversionType === ConversionType.OBJECT ? Delimiter.CAMEL : Delimiter.SNAKE;
    info(`No delimiter provided, "${configOptions.delimiter}" will be used`);
  }

  if (options.conversionType === ConversionType.CONSTANTS || options.conversionType === ConversionType.OBJECT) {
    if (!(configOptions as ConstantsConversionOptions).fileName) {
      (configOptions as ConstantsConversionOptions).fileName = DEFAULT_OPTIONS.modelFileName;
      info(`No fileName provided, "${DEFAULT_OPTIONS.modelFileName}" will be used`);
    }
  }

  if (options.conversionType === ConversionType.CONSTANTS || options.conversionType === ConversionType.FILES) {
    if (!configOptions.typeName) {
      configOptions.typeName = DEFAULT_OPTIONS.typeName;
      info(`No typeName provided, "${DEFAULT_OPTIONS.typeName}" will be used`);
    }

    if (configOptions.generateType === null) {
      configOptions.generateType = DEFAULT_OPTIONS.generateType;
      info(`No generateType provided, "${DEFAULT_OPTIONS.generateType}" will be used`);
    }

    if (configOptions.generateTypeObject === null) {
      configOptions.generateTypeObject = DEFAULT_OPTIONS.generateTypeObject;
      info(`No generateTypeObject provided, "${DEFAULT_OPTIONS.generateTypeObject}" will be used`);
    }

    if (!configOptions.interfaceName) {
      configOptions.interfaceName = DEFAULT_OPTIONS.interfaceName;
      info(`No interfaceName provided, "${DEFAULT_OPTIONS.interfaceName}" will be used`);
    }

    if (typeof configOptions.prefix !== 'string') {
      configOptions.prefix = DEFAULT_OPTIONS.prefix;
      info(`No prefix provided, "${DEFAULT_OPTIONS.prefix}" will be used`);
    }
  }

  if (configOptions.conversionType === ConversionType.FILES) {
    if (!(configOptions as FileConversionOptions).modelFileName) {
      (configOptions as FileConversionOptions).modelFileName = DEFAULT_OPTIONS.modelFileName;
      info(`No modelFileName provided, "${DEFAULT_OPTIONS.modelFileName}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).iconsFolderName) {
      (configOptions as FileConversionOptions).iconsFolderName = DEFAULT_OPTIONS.iconsFolderName;
      info(`No iconsFolderName provided, "${DEFAULT_OPTIONS.iconsFolderName}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).compileSources) {
      (configOptions as FileConversionOptions).compileSources = DEFAULT_OPTIONS.compileSources;
      info(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.compileSources}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).exportCompleteIconSet) {
      (configOptions as FileConversionOptions).exportCompleteIconSet = DEFAULT_OPTIONS.exportCompleteIconSet;
      info(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.exportCompleteIconSet}" will be used`);
    }

    if (!(configOptions as FileConversionOptions).barrelFileName) {
      (configOptions as FileConversionOptions).barrelFileName = DEFAULT_OPTIONS.barrelFileName;
      info(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.barrelFileName}" will be used`);
    }

    return configOptions as FileConversionOptions;
  }
  return configOptions as ConstantsConversionOptions;
};
