import {
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition
} from '../generators/code-snippet-generators';
import { writeFile } from '../helpers/file-helpers';
import { error, success, underlineSuccess } from '../helpers/log-helper';
import { ConstantsConvertionOptions } from '../options/convertion-options';
import { filesProcessor } from './shared.converter';

const getSvgConstants = svgDefinitions => {
  const svgConstants = svgDefinitions.map(svgDefinition =>
    generateSvgConstant(
      svgDefinition.variableName,
      svgDefinition.interfaceName,
      svgDefinition.typeName,
      svgDefinition.data
    )
  );
  return svgConstants.join('');
};

export const convertToSingleFile = async (convertionOptions: ConstantsConvertionOptions): Promise<void> => {
  const { outputDirectory, fileName } = convertionOptions;
  try {
    const svgDefinitions = await filesProcessor(convertionOptions);
    if (svgDefinitions.length) {
      const svgContants = getSvgConstants(svgDefinitions);
      const typeDefinition = generateTypeDefinition(convertionOptions, svgDefinitions);
      const interfaceDefinition = generateInterfaceDefinition(convertionOptions);
      const fileContent = `${svgContants}${typeDefinition}${interfaceDefinition}`;
      await writeFile(outputDirectory, fileName, fileContent);
      success(`Icons file successfully generated under ${underlineSuccess(outputDirectory)}`);
    }
  } catch (exception) {
    error(`Something went wrong: ${exception}`);
  }
};
