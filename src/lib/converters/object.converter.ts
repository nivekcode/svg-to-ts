import { writeFile } from '../helpers/file-helpers';
import { generationSuccess } from '../helpers/log-helper';
import { callAndMonitorAsync } from '../helpers/monitor';
import { ObjectConversionOptions } from '../options/conversion-options';

import { filesProcessor, SvgDefinition } from './shared.converter';

const generateSVGObject = async (svgDefinitions: SvgDefinition[], objectName: string): Promise<string> => {
  const svgObject = {};
  svgDefinitions.forEach((svgDefinition: SvgDefinition) => (svgObject[svgDefinition.typeName] = svgDefinition.data));
  return !objectName
    ? `export default ${JSON.stringify(svgObject)}`
    : `export const ${objectName} = ${JSON.stringify(svgObject)}`;
};

export const convertToSingleObject = async (conversionOptions: ObjectConversionOptions): Promise<void> => {
  const { outputDirectory, fileName, objectName } = conversionOptions;
  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );
  const fileContent = await callAndMonitorAsync<string>(
    generateSVGObject.bind({}, svgDefinitions, objectName),
    'Generate SVG Object'
  );
  await callAndMonitorAsync<void>(writeFile.bind({}, outputDirectory, fileName, fileContent), 'Write content to file');
  generationSuccess(outputDirectory);
};
