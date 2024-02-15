import commander from 'commander';

import { getSvgoConfig } from '../../../helpers/svg-optimization';
import { FilesConversionOptions } from '../../conversion-options/files-conversion-options';
import { DEFAULT_FILES_CONVERSION_OPTIONS } from '../../default-options/default-files-conversion-options';

import { toBoolean } from './command-line-collector.helpers';

export const collectCommandLineFileOptions = async (): Promise<FilesConversionOptions> => {
  let {
    tsx,
    delimiter,
    barrelFileName,
    interfaceName,
    enumName,
    outputDirectory,
    prefix,
    typeName,
    generateType,
    generateTypeObject,
    generateEnum,
    modelFileName,
    iconsFolderName,
    additionalModelOutputPath,
    exportCompleteIconSet,
    completeIconSetName,
    compilationOutput,
    compileSources,
    verbose,
  } = commander;
  let svgoConfig = commander.svgoConfig;

  // Parse boolean values
  tsx = toBoolean(tsx, DEFAULT_FILES_CONVERSION_OPTIONS.tsx);
  generateType = toBoolean(generateType, DEFAULT_FILES_CONVERSION_OPTIONS.generateType);
  generateTypeObject = toBoolean(generateTypeObject, DEFAULT_FILES_CONVERSION_OPTIONS.generateTypeObject);
  exportCompleteIconSet = toBoolean(exportCompleteIconSet, DEFAULT_FILES_CONVERSION_OPTIONS.exportCompleteIconSet);
  compileSources = toBoolean(compileSources, DEFAULT_FILES_CONVERSION_OPTIONS.compileSources);
  verbose = toBoolean(verbose, DEFAULT_FILES_CONVERSION_OPTIONS.verbose);

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_FILES_CONVERSION_OPTIONS.srcFiles;
  }
  svgoConfig = await getSvgoConfig(svgoConfig);

  return {
    tsx,
    delimiter,
    interfaceName,
    srcFiles,
    outputDirectory,
    prefix,
    typeName,
    enumName,
    generateType,
    generateTypeObject,
    generateEnum,
    modelFileName,
    iconsFolderName,
    exportCompleteIconSet,
    completeIconSetName,
    svgoConfig,
    additionalModelOutputPath,
    compileSources,
    compilationOutput,
    barrelFileName,
    verbose,
  };
};
