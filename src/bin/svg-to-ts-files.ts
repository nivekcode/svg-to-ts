#!/usr/bin/env node
// import-conductor-skip
import { Logger } from '../lib/helpers/logger';
import { convertToFiles } from '../lib/converters/files.converter';
import { getFilesConversionOptions } from '../lib/options/options-collector/files-options.collector';
import { setupFilesOptionsCommander } from '../lib/options/commander/file-options.commander';

(async () => {
  setupFilesOptionsCommander();
  Logger.printWelcomeMessage();

  const conversionOptions = await getFilesConversionOptions();

  if (Array.isArray(conversionOptions)) {
    for (const c of conversionOptions) {
      Logger.changeVisibility(c.verbose);
      await convertToFiles(c);
    }
  } else {
    Logger.changeVisibility(conversionOptions.verbose);
    Logger.info('We are using the conversion type "constants"');
    await convertToFiles(conversionOptions);
  }
})();
