#!/usr/bin/env node

import { convertToSingleFile } from '../lib/converters/single-file.converter';
import { convertToMultipleFiles } from '../lib/converters/multiple-files.converter';
import { getOptions, MultiFileConvertionOptions, SingleFileConvertionOptions } from '../lib/options/convertion-options';
import { printLogo } from '../lib/helpers/log-helper';
import { setupCommander } from '../lib/options/args-collector';

const start = async () => {
  setupCommander();
  printLogo();
  const convertionOptions = await getOptions();

  if (convertionOptions.optimizeForLazyLoading) {
    convertToMultipleFiles(convertionOptions as MultiFileConvertionOptions);
  } else {
    convertToSingleFile(convertionOptions as SingleFileConvertionOptions);
  }
};

start();
