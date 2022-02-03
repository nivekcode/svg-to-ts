#!/usr/bin/env node
// import-conductor-skip
import { Logger } from '../lib/helpers/logger';
import { getObjectConversionOptions } from '../lib/options/options-collector/object-options.collector';
import { convertToSingleObject } from '../lib/converters/object.converter';
import { setupObjectOptionsCommander } from '../lib/options/commander/object-options.commander';

(async () => {
  setupObjectOptionsCommander();
  Logger.printWelcomeMessage();
  const conversionOptions = await getObjectConversionOptions();

  if (Array.isArray(conversionOptions)) {
    for (const c of conversionOptions) {
      Logger.changeVisibility(c.verbose);
      await convertToSingleObject(c);
    }
  } else {
    Logger.changeVisibility(conversionOptions.verbose);
    Logger.info('Converting to an object');
    await convertToSingleObject(conversionOptions);
  }
})();
