import { generateObjectInterface, generateTypeDefinition } from '../generators/code-snippet-generators';
import { writeFile } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { callAndMonitor, callAndMonitorAsync } from '../helpers/monitor';
import { ObjectConversionOptions } from '../options/conversion-options/object-conversion-options';

import { filesProcessor, SvgDefinition } from './shared.converter';

const generateSVGObject = async (
  svgDefinitions: SvgDefinition[],
  objectName: string,
  conversionOptions: ObjectConversionOptions
): Promise<string> => {
  const svgObject = {};
  svgDefinitions.forEach((svgDefinition: SvgDefinition) => (svgObject[svgDefinition.typeName] = svgDefinition.data));
  const typePatch = generateObjectInterface(!objectName, conversionOptions);

  return !objectName
    ? `export default ${JSON.stringify(svgObject)}${typePatch}`
    : `export const ${objectName}${typePatch} = ${JSON.stringify(svgObject)}`;
};

export const convertToSingleObject = async (conversionOptions: ObjectConversionOptions): Promise<void> => {
  const { outputDirectory, fileName, objectName } = conversionOptions;
  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );
  const fileContent = await callAndMonitorAsync<string>(
    generateSVGObject.bind({}, svgDefinitions, objectName, conversionOptions),
    'Generate SVG Object'
  );
  const typeDefinition = callAndMonitor<string>(
    generateTypeDefinition.bind({}, conversionOptions, svgDefinitions),
    'Generate type definitions'
  );

  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, fileName, `${fileContent}${typeDefinition}`),
    'Write content to file'
  );
  Logger.generationSuccess(outputDirectory);
};
