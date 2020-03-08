import commander from 'commander';
import { MultiFileConvertionOptions, SingleFileConvertionOptions } from './convertion-options';
import { DEFAULT_OPTIONS } from './default-options';

export const collectArgumentOptions = (): SingleFileConvertionOptions | MultiFileConvertionOptions => {
  const {
    delimiter,
    fileName,
    interfaceName,
    outputDirectory,
    prefix,
    typeName,
    modelFileName,
    modelOutputPath,
    iconsFolderName,
    optimizeForLazyLoading
  } = commander;

  // Because of commander adding default value to params
  // See: https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
  let srcFiles = commander.srcFiles;
  if (srcFiles.length === 0) {
    srcFiles = DEFAULT_OPTIONS.srcFiles;
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
    modelOutputPath,
    iconsFolderName,
    optimizeForLazyLoading
  };
};
