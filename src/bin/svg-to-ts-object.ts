#!/usr/bin/env node
// import-conductor-skip
import { Logger } from '../lib/helpers/logger';
import { setupConstantOptionsCommander } from '../lib/options/commander/constant-options.commander';
import { getObjectConversionOptions } from '../lib/options/options-collector/object-options.collector';
import { convertToSingleObject } from '../lib/converters/object.converter';

(async () => {
  console.log('Blubi');
  setupConstantOptionsCommander();
  Logger.printWelcomeMessage();
  const conversionOptions = await getObjectConversionOptions();
  if (Array.isArray(conversionOptions)) {
  } else {
    await convertToSingleObject(conversionOptions);
  }
  /*


    if (Array.isArray(conversionOptions)) {
        for (const c of conversionOptions) {
            Logger.changeVisibility(c.verbose);
            await convertToSingleObject(c);
        }
    } else {
        Logger.changeVisibility(conversionOptions.verbose);
        Logger.info('We are using the conversion type "constants"');
        await convertToSingleObject(conversionOptions);
    }
     */
})();
