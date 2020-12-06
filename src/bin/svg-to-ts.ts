#!/usr/bin/env node
// import-conductor-skip
import {
  ConversionType,
  getOptions,
  FileConversionOptions,
  ObjectConversionOptions,
  ConstantsConversionOptions
} from '../lib/options/conversion-options';
import { Logger } from '../lib/helpers/logger';
import { setupCommander } from '../lib/options/command-line-collector';
import { convertToSingleObject } from '../lib/converters/object.converter';
import { convertToConstants } from '../lib/converters/constants.converter';
import { convertToFiles } from '../lib/converters/files.converter';

const convert = async (
  conversionOptions: FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions
) => {
  if (conversionOptions.conversionType === ConversionType.FILES) {
    Logger.info('We are using the conversiontype "files"');
    await convertToFiles(conversionOptions as FileConversionOptions);
  }

  if (conversionOptions.conversionType === ConversionType.CONSTANTS) {
    Logger.info('We are using the conversion type "constants"');
    await convertToConstants(conversionOptions as ConstantsConversionOptions);
  }

  if (conversionOptions.conversionType === ConversionType.OBJECT) {
    Logger.info('We are using the conversion type "object"');
    await convertToSingleObject(conversionOptions as ObjectConversionOptions);
  }
};

(async () => {
  setupCommander();
  Logger.printLogo();

  const conversionOptions = await getOptions();

  if (Array.isArray(conversionOptions)) {
    for (const c of conversionOptions) {
      Logger.changeVisibility(c.verbose);
      await convert(c);
    }
  } else {
    Logger.changeVisibility(conversionOptions.verbose);
    await convert(conversionOptions);
  }
})();
