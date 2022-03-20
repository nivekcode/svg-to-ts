import commander from 'commander';

import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { ObjectConversionOptions } from '../../conversion-options/object-conversion-options';
import { DEFAULT_OBJECT_CONVERSION_OPTIONS } from '../../default-options/default-object-conversion-options';

import { toBoolean } from './command-line-collector.helpers';

export const collectCommandLineObjectOptions = async (): Promise<ObjectConversionOptions> => {
  let { objectName, delimiter, fileName, outputDirectory, verbose, generateType, typeName } = commander;
  let svgoConfig = commander.svgoConfig;

  generateType = toBoolean(generateType, DEFAULT_OBJECT_CONVERSION_OPTIONS.generateType);

  // Parse boolean values
  verbose = toBoolean(verbose, DEFAULT_OBJECT_CONVERSION_OPTIONS.verbose);

  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OBJECT_CONVERSION_OPTIONS.srcFiles;
  }
  svgoConfig = await getSvgoConfig(svgoConfig);

  return {
    delimiter,
    srcFiles,
    outputDirectory,
    svgoConfig,
    fileName,
    objectName,
    verbose,
    generateType,
    typeName
  };
};
