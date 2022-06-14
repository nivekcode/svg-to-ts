import { cosmiconfigSync } from 'cosmiconfig';

import * as packgeJSON from '../../../../../package.json';
import { Logger } from '../../../helpers/logger';
import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { getConfigPath } from '../../commander/file-options.commander';
import { FilesConversionOptions } from '../../conversion-options/files-conversion-options';
import { DEFAULT_FILES_CONVERSION_OPTIONS } from '../../default-options/default-files-conversion-options';

export const collectConfigFileFileOptions = async (): Promise<
  FilesConversionOptions | Array<FilesConversionOptions> | null
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
    return Promise.all(cosmiConfigResult.config.map((config: FilesConversionOptions) => mergeWithDefaults(config)));
  }
  return await mergeWithDefaults(cosmiConfigResult.config);
};

export const mergeWithDefaults = async (options): Promise<FilesConversionOptions> => {
  const configOptions = { ...options };

  if (configOptions.tsx === undefined) {
    configOptions.tsx = DEFAULT_FILES_CONVERSION_OPTIONS.tsx;
    Logger.verboseInfo(`No 'tsx' property provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.tsx}" will be used`);
  }

  if (configOptions.verbose === undefined) {
    configOptions.verbose = DEFAULT_FILES_CONVERSION_OPTIONS.verbose;
    Logger.verboseInfo(`No "verbose" property provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.verbose}" will be used`);
  }

  if (!configOptions.outputDirectory) {
    configOptions.outputDirectory = DEFAULT_FILES_CONVERSION_OPTIONS.outputDirectory;
    Logger.verboseInfo(
      `No outputDirectory provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.outputDirectory}" will be used`
    );
  }

  if (!configOptions.srcFiles) {
    configOptions.srcFiles = DEFAULT_FILES_CONVERSION_OPTIONS.srcFiles;
    Logger.verboseInfo(`No srcFiles provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.srcFiles}" will be used`);
  }

  if (!configOptions.svgoConfig) {
    configOptions.svgoConfig = await getSvgoConfig(configOptions.svgoConfig);
    Logger.verboseInfo(`No svgoConfig provided, default configuration of SVGO will be used`);
  }

  if (!configOptions.delimiter) {
    configOptions.delimiter = DEFAULT_FILES_CONVERSION_OPTIONS.delimiter;
    Logger.verboseInfo(`No delimiter provided, "${configOptions.delimiter}" will be used`);
  }

  if (!configOptions.typeName) {
    configOptions.typeName = DEFAULT_FILES_CONVERSION_OPTIONS.typeName;
    Logger.verboseInfo(`No 'typeName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.typeName}" will be used`);
  }

  if (configOptions.generateType === undefined) {
    configOptions.generateType = DEFAULT_FILES_CONVERSION_OPTIONS.generateType;
    Logger.verboseInfo(`No 'generateType' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.generateType}" will be used`);
  }

  if (configOptions.generateTypeObject === undefined) {
    configOptions.generateTypeObject = DEFAULT_FILES_CONVERSION_OPTIONS.generateTypeObject;
    Logger.verboseInfo(
      `No 'generateTypeObject' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.generateTypeObject}" will be used`
    );
  }

  if (!configOptions.interfaceName) {
    configOptions.interfaceName = DEFAULT_FILES_CONVERSION_OPTIONS.interfaceName;
    Logger.verboseInfo(`No 'interfaceName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.interfaceName}" will be used`);
  }

  if (typeof configOptions.prefix !== 'string') {
    configOptions.prefix = DEFAULT_FILES_CONVERSION_OPTIONS.prefix;
    Logger.verboseInfo(`No 'prefix' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.prefix}" will be used`);
  }

  if (!configOptions.modelFileName) {
    configOptions.modelFileName = DEFAULT_FILES_CONVERSION_OPTIONS.modelFileName;
    Logger.verboseInfo(`No 'modelFileName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.modelFileName}" will be used`);
  }

  if (!configOptions.iconsFolderName) {
    configOptions.iconsFolderName = DEFAULT_FILES_CONVERSION_OPTIONS.iconsFolderName;
    Logger.verboseInfo(
      `No 'iconsFolderName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.iconsFolderName}" will be used`
    );
  }

  if (configOptions.compileSources === undefined) {
    configOptions.compileSources = DEFAULT_FILES_CONVERSION_OPTIONS.compileSources;
    Logger.verboseInfo(
      `No 'preCompileSources' flag provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.compileSources}" will be used`
    );
  }

  if (configOptions.exportCompleteIconSet === undefined) {
    configOptions.exportCompleteIconSet = DEFAULT_FILES_CONVERSION_OPTIONS.exportCompleteIconSet;
    Logger.verboseInfo(
      `No flag for 'exportCompleteIconSet' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.exportCompleteIconSet}" will be used`
    );
  }

  if (!configOptions.completeIconSetName) {
    configOptions.completeIconSetName = DEFAULT_FILES_CONVERSION_OPTIONS.completeIconSetName;
    Logger.verboseInfo(
      `No 'completeIconSetName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.completeIconSetName}" will be used`
    );
  }

  if (!configOptions.compilationOutput) {
    configOptions.compilationOutput = DEFAULT_FILES_CONVERSION_OPTIONS.compilationOutput;
    Logger.verboseInfo(
      `No 'completeIconSetName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.compilationOutput}" will be used`
    );
  }

  if (!configOptions.barrelFileName) {
    configOptions.barrelFileName = DEFAULT_FILES_CONVERSION_OPTIONS.barrelFileName;
    Logger.verboseInfo(
      `No 'barrelFileName' provided, "${DEFAULT_FILES_CONVERSION_OPTIONS.barrelFileName}" will be used`
    );
  }
  return configOptions;
};
