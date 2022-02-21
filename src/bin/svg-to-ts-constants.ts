#!/usr/bin/env node
// import-conductor-skip
import { Logger } from '../lib/helpers/logger';
import { convertToConstants } from '../lib/converters/constants.converter';
import { setupConstantOptionsCommander } from '../lib/options/commander/constant-options.commander';
import { getConstantConversionOptions } from '../lib/options/options-collector/constants-options.collector';

(async () => {
  setupConstantOptionsCommander();
  Logger.printWelcomeMessage();
  Logger.info('Converting to constants');

  const conversionOptions = await getConstantConversionOptions();

  if (Array.isArray(conversionOptions)) {
    for (const c of conversionOptions) {
      Logger.changeVisibility(c.verbose);
      await convertToConstants(c);
    }
  } else {
    Logger.changeVisibility(conversionOptions.verbose);
    await convertToConstants(conversionOptions);
  }
})();
