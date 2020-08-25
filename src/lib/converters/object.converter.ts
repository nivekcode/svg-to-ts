import { ObjectConversionOptions } from '../options/conversion-options';
import { writeFile } from '../helpers/file-helpers';
import { error, success, underlineSuccess } from '../helpers/log-helper';

import { filesProcessor, SvgDefinition } from './shared.converter';

export const convertToSingleObject = async (conversionOptions: ObjectConversionOptions): Promise<void> => {
  const { outputDirectory, fileName, objectName } = conversionOptions;
  try {
    const svgObject = {};
    const svgDefinitions = await filesProcessor(conversionOptions);
    svgDefinitions.forEach((svgDefinition: SvgDefinition) => (svgObject[svgDefinition.typeName] = svgDefinition.data));
    const fileContent = !objectName
      ? `export default ${JSON.stringify(svgObject)}`
      : `export const ${objectName} = ${JSON.stringify(svgObject)}`;
    await writeFile(outputDirectory, fileName, fileContent);
    success(`Icons file successfully generated under ${underlineSuccess(outputDirectory)}`);
  } catch (exception) {
    error(`Something went wrong: ${exception}`);
    process.exit(1);
  }
};
