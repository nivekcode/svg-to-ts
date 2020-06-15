#!/usr/bin/env node
import { convertToSingleFile } from '../lib/converters/single-file.converter';
import { convertToMultipleFiles } from '../lib/converters/multiple-files.converter';
import {
  ConvertionType,
  getOptions,
  MultiFileConvertionOptions,
  ObjectConvertionOptions,
  SingleFileConvertionOptions
} from '../lib/options/convertion-options';
import { info, printLogo } from '../lib/helpers/log-helper';
import { setupCommander } from '../lib/options/args-collector';
import { convertToSingleObject } from '../lib/converters/object.converter';

(async () => {
  setupCommander();
  printLogo();
  const convertionOptions = await getOptions();

  if (convertionOptions.convertionType === ConvertionType.MULTIPLE_FILES) {
    info('We are using the convertiontype "multiple-files"');
    await convertToMultipleFiles(convertionOptions as MultiFileConvertionOptions);
  }

  if (convertionOptions.convertionType === ConvertionType.SINGLE_FILE) {
    info('We are using the convertiontype "single-file"');
    await convertToSingleFile(convertionOptions as SingleFileConvertionOptions);
  }

  if (convertionOptions.convertionType === ConvertionType.OBJECT) {
    info('We are using the convertiontype "single-object"');
    await convertToSingleObject(convertionOptions as ObjectConvertionOptions);
  }
})();
