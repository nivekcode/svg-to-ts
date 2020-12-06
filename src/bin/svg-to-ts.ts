#!/usr/bin/env node
// import-conductor-skip
import {
  ConversionType,
  getOptions,
  FileConversionOptions,
  ObjectConversionOptions,
  ConstantsConversionOptions
} from '../lib/options/conversion-options';
import { generationSuccess, info, printLogo } from '../lib/helpers/log-helper';
import { setupCommander } from '../lib/options/command-line-collector';
import { convertToSingleObject } from '../lib/converters/object.converter';
import { convertToConstants } from '../lib/converters/constants.converter';
import { convertToFiles } from '../lib/converters/files.converter';

const convert = async (
  conversionOptions: FileConversionOptions | ConstantsConversionOptions | ObjectConversionOptions
) => {
  if (conversionOptions.conversionType === ConversionType.FILES) {
    info('We are using the conversiontype "files"');
    await convertToFiles(conversionOptions as FileConversionOptions);
  }

  if (conversionOptions.conversionType === ConversionType.CONSTANTS) {
    info('We are using the conversion type "constants"');
    await convertToConstants(conversionOptions as ConstantsConversionOptions);
  }

  if (conversionOptions.conversionType === ConversionType.OBJECT) {
    info('We are using the conversion type "object"');
    await convertToSingleObject(conversionOptions as ObjectConversionOptions);
  }
};

(async () => {
  setupCommander();
  printLogo();

  const conversionOptions = await getOptions();

  if (Array.isArray(conversionOptions)) {
    for (const c of conversionOptions) {
      await convert(c);
    }
  } else {
    await convert(conversionOptions);
  }
})();
