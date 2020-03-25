#!/usr/bin/env node
import { convertToSingleFile } from '../lib/converters/single-file.converter';
import { convertToMultipleFiles } from '../lib/converters/multiple-files.converter';
import { getOptions, MultiFileConvertionOptions, SingleFileConvertionOptions } from '../lib/options/convertion-options';
import { printLogo } from '../lib/helpers/log-helper';
import { setupCommander } from '../lib/options/args-collector';

(async () => {
  setupCommander();
  printLogo();
  const convertionOptions = await getOptions();

  if (convertionOptions.optimizeForLazyLoading) {
    await convertToMultipleFiles(convertionOptions as MultiFileConvertionOptions);
  } else {
    await convertToSingleFile(convertionOptions as SingleFileConvertionOptions);
  }
})();
