import {
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition
} from '../generators/code-snippet-generators';
import { writeFile } from '../helpers/file-helpers';
import { error, success, underlineSuccess } from '../helpers/log-helper';
import { ConstantsConversionOptions } from '../options/conversion-options';

import { filesProcessor } from './shared.converter';

const getSvgConstants = svgDefinitions => {
  const svgConstants = svgDefinitions.map(svgDefinition =>
    generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data)
  );
  return svgConstants.join('');
};

export const convertToConstants = async (conversionOptions: ConstantsConversionOptions): Promise<void> => {
  const { outputDirectory, fileName } = conversionOptions;
  try {
    const svgDefinitions = await filesProcessor(conversionOptions);
    if (svgDefinitions.length) {
      const svgContants = getSvgConstants(svgDefinitions);
      const typeDefinition = generateTypeDefinition(conversionOptions, svgDefinitions);
      const interfaceDefinition = generateInterfaceDefinition(conversionOptions);
      const fileContent = `${svgContants}${typeDefinition}${interfaceDefinition}`;
      await writeFile(outputDirectory, fileName, fileContent);
      success(`Icons file successfully generated under ${underlineSuccess(outputDirectory)}`);
    }
  } catch (exception) {
    error(`Something went wrong: ${exception}`);
    process.exit(1);
  }
};
