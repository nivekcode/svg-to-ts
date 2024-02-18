import {
  generateEnumDefinition,
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTSXConstant,
  generateTypeDefinition,
  generateTypeHelper,
} from '../generators/code-snippet-generators';
import { generateExportSection } from '../helpers/complete-icon-set.helper';
import { writeFile } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { callAndMonitor, callAndMonitorAsync } from '../helpers/monitor';
import { ConstantsConversionOptions } from '../options/conversion-options/constant-conversion-options';
import { FILE_TYPE } from '../shared/file-type.model';

import { filesProcessor, SvgDefinition } from './shared.converter';

export async function convertToConstants(conversionOptions: ConstantsConversionOptions): Promise<void> {
  const { tsx } = conversionOptions;

  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files',
  );

  if (!svgDefinitions.length) {
    Logger.error('No SVG files found under ${outputDirectory}');
    return;
  }

  if (tsx) {
    await convertToTSXConstants(conversionOptions, svgDefinitions);
  } else {
    await convertToTSConstants(conversionOptions, svgDefinitions);
  }
}

async function convertToTSConstants(conversionOptions: ConstantsConversionOptions, svgDefinitions: SvgDefinition[]) {
  const {
    outputDirectory,
    fileName,
    interfaceName,
    exportCompleteIconSet,
    completeIconSetName,
    generateType,
    generateEnum,
  } = conversionOptions;
  let exportAllStatement = '';

  const svgContants = callAndMonitor<string>(getTSConstants.bind({}, svgDefinitions), 'Generate SVG constants');

  const typeDefinition = generateType
    ? callAndMonitor<string>(
        generateTypeDefinition.bind({}, conversionOptions, svgDefinitions),
        'Generate type definitions',
      )
    : '';

  const interfaceDefinition = callAndMonitor<string>(
    generateInterfaceDefinition.bind({}, conversionOptions),
    'Generate Interface Definition',
  );

  const enumDefinition = generateEnum
    ? callAndMonitor<string>(generateEnumDefinition.bind({}, conversionOptions, svgDefinitions), 'Generate enum')
    : '';

  if (exportCompleteIconSet) {
    exportAllStatement = callAndMonitor<string>(
      generateExportSection.bind({}, svgDefinitions, completeIconSetName),
      'Exporting all constants',
    );
  }

  const typeHelper = callAndMonitor<string>(generateTypeHelper.bind({}, interfaceName), 'Generate Type Helper');
  const fileContent = `${svgContants}${typeDefinition}${enumDefinition}${interfaceDefinition}${typeHelper}${exportAllStatement}`;
  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, fileName, fileContent),
    `Writing files to ${outputDirectory}`,
  );
  Logger.generationSuccess(outputDirectory);
}

async function convertToTSXConstants(conversionOptions: ConstantsConversionOptions, svgDefinitions: SvgDefinition[]) {
  const { exportCompleteIconSet, completeIconSetName, outputDirectory, fileName } = conversionOptions;

  const tsxContants = callAndMonitor<string>(getTSXConstants.bind({}, svgDefinitions), 'Generate TSX constants');
  let exportAllStatement = '';

  if (exportCompleteIconSet) {
    exportAllStatement = callAndMonitor<string>(
      generateExportSection.bind({}, svgDefinitions, completeIconSetName, FILE_TYPE.TSX),
      'Exporting all TSX constants as ${completeIconSetName}',
    );
  }

  const fileContent = `${tsxContants}${exportAllStatement}`;

  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, fileName, fileContent, FILE_TYPE.TSX),
    `Writing files to ${outputDirectory}`,
  );
  Logger.generationSuccess(outputDirectory);
}

function getTSConstants(svgDefinitions): string {
  const svgConstants = svgDefinitions.map((svgDefinition) =>
    generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data),
  );
  return svgConstants.join('');
}

function getTSXConstants(svgDefinitions): string {
  const tsxConstants = svgDefinitions.map((svgDefinition) =>
    generateTSXConstant(svgDefinition.variableName, svgDefinition.data),
  );
  return tsxConstants.join('');
}
