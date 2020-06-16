#!/usr/bin/env node
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
import { convertToConstants } from '../lib/converters/constants.converter';
import { convertToFiles } from '../lib/converters/files.converter';

(async () => {
  setupCommander();
  printLogo();
  const convertionOptions = await getOptions();

  if (convertionOptions.convertionType === ConvertionType.FILES) {
    info('We are using the convertiontype "files"');
    await convertToFiles(convertionOptions as FileConvertionOptions);
  }

  if (convertionOptions.convertionType === ConvertionType.CONSTANTS) {
    info('We are using the convertiontype "constants"');
    await convertToConstants(convertionOptions as ConstantsConvertionOptions);
  }

  if (convertionOptions.convertionType === ConvertionType.OBJECT) {
    info('We are using the convertiontype "object"');
    await convertToSingleObject(convertionOptions as ObjectConvertionOptions);
  }
})();
