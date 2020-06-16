#!/usr/bin/env node
import { convertToSingleFile } from '../lib/converters/single-file.converter';
import { convertToMultipleFiles } from '../lib/converters/multiple-files.converter';
import {
  ConvertionType,
  getOptions,
  FileConvertionOptions,
  ObjectConvertionOptions,
  ConstantsConvertionOptions
} from '../lib/options/convertion-options';
import { info, printLogo } from '../lib/helpers/log-helper';
import { setupCommander } from '../lib/options/args-collector';
import { convertToSingleObject } from '../lib/converters/object.converter';

(async () => {
  setupCommander();
  printLogo();
  const convertionOptions = await getOptions();

  if (convertionOptions.convertionType === ConvertionType.FILES) {
    info('We are using the convertiontype "files"');
    await convertToMultipleFiles(convertionOptions as FileConvertionOptions);
  }

  if (convertionOptions.convertionType === ConvertionType.CONSTANTS) {
    info('We are using the convertiontype "constants"');
    await convertToSingleFile(convertionOptions as ConstantsConvertionOptions);
  }

  if (convertionOptions.convertionType === ConvertionType.OBJECT) {
    info('We are using the convertiontype "object"');
    await convertToSingleObject(convertionOptions as ObjectConvertionOptions);
  }
})();
