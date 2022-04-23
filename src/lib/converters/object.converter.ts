import { generateObjectInterface, generateTypeDefinition } from '../generators/code-snippet-generators';
import { writeFile } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { callAndMonitor, callAndMonitorAsync } from '../helpers/monitor';
import { ObjectConversionOptions } from '../options/conversion-options/object-conversion-options';

import { filesProcessor, SvgDefinition } from './shared.converter';

export async function convertToSingleObject(conversionOptions: ObjectConversionOptions): Promise<void> {
  const { tsx } = conversionOptions;
  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );

  if (tsx) {
    await generateTSXFile(svgDefinitions, conversionOptions);
  } else {
    await generateTSFile(svgDefinitions, conversionOptions);
  }
}

async function generateTSXFile(svgDefinitions: SvgDefinition[], conversionOptions: ObjectConversionOptions) {
  const { outputDirectory, fileName, objectName } = conversionOptions;

  const fileContent = await callAndMonitorAsync<string>(
    generateTSXObject.bind({}, svgDefinitions, objectName, conversionOptions),
    'Generate TSX Object'
  );

  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, fileName, `${fileContent}`, 'tsx'),
    'Write content to file'
  );
  Logger.generationSuccess(outputDirectory);
}

async function generateTSFile(svgDefinitions: SvgDefinition[], conversionOptions: ObjectConversionOptions) {
  const { outputDirectory, objectName, fileName } = conversionOptions;

  const fileContent = await callAndMonitorAsync<string>(
    generateTSObject.bind({}, svgDefinitions, objectName, conversionOptions),
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
}

async function generateTSObject(
  svgDefinitions: SvgDefinition[],
  objectName: string,
  conversionOptions: ObjectConversionOptions
): Promise<string> {
  const svgObject = {};
  svgDefinitions.forEach((svgDefinition: SvgDefinition) => (svgObject[svgDefinition.typeName] = svgDefinition.data));
  const typePatch = generateObjectInterface(!objectName, conversionOptions);

  return !objectName
    ? `export default ${JSON.stringify(svgObject)}${typePatch}`
    : `export const ${objectName}${typePatch} = ${JSON.stringify(svgObject)}`;
}

async function generateTSXObject(svgDefinitions: SvgDefinition[], conversionOptions: ObjectConversionOptions) {
  const { objectName } = conversionOptions;
  let svgObject = '';
  svgDefinitions.forEach((svgDefinition: SvgDefinition) => {
    const capitalizedTypeName = svgDefinition.typeName.charAt(0).toUpperCase() + svgDefinition.typeName.slice(1);
    svgObject += `${capitalizedTypeName}: () => (${svgDefinition.data}),\n`;
  });

  return !objectName ? `export default {${svgObject}}` : `export const ${objectName} = ${svgObject.toString()}`;
}
