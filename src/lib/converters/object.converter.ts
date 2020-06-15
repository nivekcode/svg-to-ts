import { ObjectConvertionOptions } from '../options/convertion-options';
import { writeFile } from '../helpers/file-helpers';
import { error, success, underlineSuccess } from '../helpers/log-helper';

import { filesProcessor, SvgDefinition } from './shared.converter';

export const convertToSingleObject = async (convertionOptions: ObjectConvertionOptions): Promise<void> => {
  const { outputDirectory, fileName } = convertionOptions;
  try {
    const svgObject = {};
    const svgDefinitions = await filesProcessor(convertionOptions);
    svgDefinitions.forEach(
      (svgDefinition: SvgDefinition) => (svgObject[svgDefinition.filenameWithoutEnding] = svgDefinition.data)
    );
    await writeFile(outputDirectory, fileName, `export const icons = ${JSON.stringify(svgObject)}`);
    success(`Icons file successfully generated under ${underlineSuccess(outputDirectory)}`);
  } catch (exception) {
    error(`Something went wrong: ${exception}`);
  }
};
