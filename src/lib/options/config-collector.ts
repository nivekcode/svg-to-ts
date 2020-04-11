import { cosmiconfigSync } from 'cosmiconfig';

import * as packgeJSON from '../../../package.json';
import { info } from '../helpers/log-helper';

import { MultiFileConvertionOptions, SingleFileConvertionOptions } from './convertion-options';
import { DEFAULT_OPTIONS } from './default-options';
import { getSvgoConfig } from '../helpers/svg-optimization';

export const collectConfigurationOptions = async (): Promise<
  SingleFileConvertionOptions | MultiFileConvertionOptions | null
> => {
  const explorerSync = cosmiconfigSync(packgeJSON.name);
  const cosmiConfigResult = explorerSync.search();
  cosmiConfigResult ? info(`Configuration found under: ${cosmiConfigResult.filepath}`) : info('No config found');
  return cosmiConfigResult ? await mergeWithDefaults(cosmiConfigResult.config) : null;
};

const mergeWithDefaults = async (
  options: MultiFileConvertionOptions | SingleFileConvertionOptions
): Promise<MultiFileConvertionOptions | SingleFileConvertionOptions> => {
  const configOptions = { ...options };

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

  if (!configOptions.prefix) {
    configOptions.prefix = DEFAULT_OPTIONS.prefix;
    info(`No prefix provided, "${DEFAULT_OPTIONS.prefix}" will be used`);
  }

  if (!configOptions.delimiter) {
    configOptions.delimiter = DEFAULT_OPTIONS.delimiter;
    info(`No delimiter provided, "${DEFAULT_OPTIONS.delimiter}" will be used`);
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
    info(`No svgoConfig provided, "${DEFAULT_OPTIONS.svgoConfig}" will be used`);
  } else {
    configOptions.svgoConfig = await getSvgoConfig(configOptions.svgoConfig);
  }

  if (configOptions.optimizeForLazyLoading) {
    if (!(configOptions as MultiFileConvertionOptions).modelFileName) {
      (configOptions as MultiFileConvertionOptions).modelFileName = DEFAULT_OPTIONS.modelFileName;
      info(`No modelFileName provided, "${DEFAULT_OPTIONS.modelFileName}" will be used`);
    }

    if (!(configOptions as MultiFileConvertionOptions).iconsFolderName) {
      (configOptions as MultiFileConvertionOptions).iconsFolderName = DEFAULT_OPTIONS.iconsFolderName;
      info(`No iconsFolderName provided, "${DEFAULT_OPTIONS.iconsFolderName}" will be used`);
    }

    if (!(configOptions as MultiFileConvertionOptions).compileSources) {
      (configOptions as MultiFileConvertionOptions).compileSources = DEFAULT_OPTIONS.compileSources;
      info(`No preCompileSources flag provided, "${DEFAULT_OPTIONS.compileSources}" will be used`);
    }
    return configOptions as MultiFileConvertionOptions;
  } else {
    if (!(configOptions as SingleFileConvertionOptions).fileName) {
      (configOptions as SingleFileConvertionOptions).fileName = DEFAULT_OPTIONS.modelFileName;
      info(`No fileName provided, "${DEFAULT_OPTIONS.modelFileName}" will be used`);
    }
    return configOptions as SingleFileConvertionOptions;
  }
};
