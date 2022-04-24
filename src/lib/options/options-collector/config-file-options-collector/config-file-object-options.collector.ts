import { cosmiconfigSync } from 'cosmiconfig';

import * as packgeJSON from '../../../../../package.json';
import { Logger } from '../../../helpers/logger';
import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { getConfigPath } from '../../commander/object-options.commander';
import { ObjectConversionOptions } from '../../conversion-options/object-conversion-options';
import { DEFAULT_OBJECT_CONVERSION_OPTIONS } from '../../default-options/default-object-conversion-options';

export const collectConfigFileObjectOptions = async (): Promise<
  ObjectConversionOptions | Array<ObjectConversionOptions> | null
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
    return Promise.all(cosmiConfigResult.config.map((config: ObjectConversionOptions) => mergeWithDefaults(config)));
  }
  return await mergeWithDefaults(cosmiConfigResult.config);
};

export const mergeWithDefaults = async (options: ObjectConversionOptions): Promise<ObjectConversionOptions> => {
  const configOptions = { ...options };

  if (configOptions.tsx === undefined) {
    configOptions.tsx = DEFAULT_OBJECT_CONVERSION_OPTIONS.tsx;
    Logger.verboseInfo(`No 'tsx' property provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.tsx}" will be used`);
  }

  if (configOptions.verbose === undefined) {
    configOptions.verbose = DEFAULT_OBJECT_CONVERSION_OPTIONS.verbose;
    Logger.verboseInfo(`No 'verbose' property provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.verbose}" will be used`);
  }

  if (!configOptions.outputDirectory) {
    configOptions.outputDirectory = DEFAULT_OBJECT_CONVERSION_OPTIONS.outputDirectory;
    Logger.verboseInfo(
      `No 'outputDirectory' provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.outputDirectory}" will be used`
    );
  }

  if (!configOptions.srcFiles) {
    configOptions.srcFiles = DEFAULT_OBJECT_CONVERSION_OPTIONS.srcFiles;
    Logger.verboseInfo(`No 'srcFiles' provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.srcFiles}" will be used`);
  }

  if (!configOptions.svgoConfig) {
    configOptions.svgoConfig = await getSvgoConfig(configOptions.svgoConfig);
    Logger.verboseInfo(`No 'svgoConfig' provided, default configuration of SVGO will be used`);
  }

  if (!configOptions.delimiter) {
    configOptions.delimiter = DEFAULT_OBJECT_CONVERSION_OPTIONS.delimiter;
    Logger.verboseInfo(`No 'delimiter' provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.delimiter}" will be used`);
  }

  if (!configOptions.fileName) {
    configOptions.fileName = DEFAULT_OBJECT_CONVERSION_OPTIONS.fileName;
    Logger.verboseInfo(`No 'fileName' provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.fileName}" will be used`);
  }

  if (configOptions.generateType === undefined) {
    configOptions.generateType = DEFAULT_OBJECT_CONVERSION_OPTIONS.generateType;
    Logger.verboseInfo(
      `No 'generateType' property provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.generateType}" will be used`
    );
  }

  if (configOptions.generateType && !configOptions.typeName) {
    configOptions.typeName = DEFAULT_OBJECT_CONVERSION_OPTIONS.typeName;
    Logger.verboseInfo(`No 'typeName' property provided, "${DEFAULT_OBJECT_CONVERSION_OPTIONS.typeName}" will be used`);
  }

  return configOptions;
};
