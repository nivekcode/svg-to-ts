import { cosmiconfigSync } from 'cosmiconfig';

import * as packgeJSON from '../../../../../package.json';
import { Logger } from '../../../helpers/logger';
import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { getConfigPath } from '../../commander/constant-options.commander';
import { ConstantsConversionOptions } from '../../conversion-options/constant-conversion-options';
import { DEFAULT_CONST_CONVERSION_OPTIONS } from '../../default-options/default-constants-conversion-options';

export const collectConfigFileConstantOptions = async (): Promise<
  ConstantsConversionOptions | Array<ConstantsConversionOptions> | null
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
      cosmiConfigResult.config.map((config: ConstantsConversionOptions) => mergeWithDefaultConstantOptions(config))
    );
  }
  return await mergeWithDefaultConstantOptions(cosmiConfigResult.config);
};

export const mergeWithDefaultConstantOptions = async (
  options: ConstantsConversionOptions
): Promise<ConstantsConversionOptions> => {
  const configOptions = { ...options };

  if (!configOptions.verbose) {
    configOptions.verbose = DEFAULT_CONST_CONVERSION_OPTIONS.verbose;
    Logger.verboseInfo(`No "verbose" property provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.verbose}" will be used`);
  }

  if (!configOptions.outputDirectory) {
    configOptions.outputDirectory = DEFAULT_CONST_CONVERSION_OPTIONS.outputDirectory;
    Logger.verboseInfo(
      `No outputDirectory provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.outputDirectory}" will be used`
    );
  }

  if (!configOptions.srcFiles) {
    configOptions.srcFiles = DEFAULT_CONST_CONVERSION_OPTIONS.srcFiles;
    Logger.verboseInfo(`No srcFiles provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.srcFiles}" will be used`);
  }

  if (!configOptions.svgoConfig) {
    configOptions.svgoConfig = await getSvgoConfig(configOptions.svgoConfig);
    Logger.verboseInfo(`No svgoConfig provided, default configuration of SVGO will be used`);
  }

  if (!configOptions.delimiter) {
    configOptions.delimiter = DEFAULT_CONST_CONVERSION_OPTIONS.delimiter;
    Logger.verboseInfo(`No delimiter provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.delimiter}" will be used`);
  }

  if (!configOptions.fileName) {
    configOptions.fileName = DEFAULT_CONST_CONVERSION_OPTIONS.fileName;
    Logger.verboseInfo(`No fileName provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.fileName}" will be used`);
  }

  if (!configOptions.typeName) {
    configOptions.typeName = DEFAULT_CONST_CONVERSION_OPTIONS.typeName;
    Logger.verboseInfo(`No typeName provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.typeName}" will be used`);
  }

  if (configOptions.generateType === undefined) {
    configOptions.generateType = DEFAULT_CONST_CONVERSION_OPTIONS.generateType;
    Logger.verboseInfo(`No generateType provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.generateType}" will be used`);
  }

  if (configOptions.generateTypeObject === undefined) {
    configOptions.generateTypeObject = DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject;
    Logger.verboseInfo(
      `No generateTypeObject provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.generateTypeObject}" will be used`
    );
  }

  if (!configOptions.interfaceName) {
    configOptions.interfaceName = DEFAULT_CONST_CONVERSION_OPTIONS.interfaceName;
    Logger.verboseInfo(`No interfaceName provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.interfaceName}" will be used`);
  }

  if (typeof configOptions.prefix !== 'string') {
    configOptions.prefix = DEFAULT_CONST_CONVERSION_OPTIONS.prefix;
    Logger.verboseInfo(`No prefix provided, "${DEFAULT_CONST_CONVERSION_OPTIONS.prefix}" will be used`);
  }

  return configOptions;
};
