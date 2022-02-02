import commander from 'commander';

import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { ObjectConversionOptions } from '../../conversion-options';
import { DEFAULT_OPTIONS } from '../../default-options';

import { toBoolean } from './command-line-collector.helpers';

export const collectCommandLineObjectOptions = async (): Promise<ObjectConversionOptions> => {
  let { conversionType, objectName, delimiter, fileName, outputDirectory, verbose } = commander;
  let svgoConfig = commander.svgoConfig;

  // Parse boolean values
  verbose = toBoolean(verbose, DEFAULT_OPTIONS.verbose);

  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OPTIONS.srcFiles;
  }
  svgoConfig = await getSvgoConfig(svgoConfig);

  return {
    conversionType,
    delimiter,
    srcFiles,
    outputDirectory,
    svgoConfig,
    fileName,
    objectName,
    verbose
  };
};
