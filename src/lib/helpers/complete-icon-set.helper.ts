import camelCase from 'lodash.camelcase';

import { SvgDefinition } from '../converters/shared.converter';
import { generateNamedImportStatement } from '../generators/code-snippet-generators';

export const generateCompleteIconSetContent = (
  svgDefinitions: SvgDefinition[],
  completeIconSetName: string
): string => {
  const importSection = generateImportSection(svgDefinitions);
  const exportSection = generateExportSection(svgDefinitions, completeIconSetName);
  return `${importSection}${exportSection}`;
};

const generateImportSection = (svgDefinitions: SvgDefinition[]): string =>
  svgDefinitions.reduce((acc: string, svgDefinition: SvgDefinition) => {
    acc += generateNamedImportStatement(
      svgDefinition.variableName,
      `./${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`
    );
    return acc;
  }, '');

export const generateExportSection = (svgDefinitions: SvgDefinition[], completeIconSetName: string): string =>
  svgDefinitions.reduce((acc: string, svgDefinition: SvgDefinition, index: number) => {
    if (index === svgDefinitions.length - 1) {
      acc += `${svgDefinition.variableName}];`;
    } else {
      acc += `${svgDefinition.variableName},`;
    }
    return acc;
  }, `export const ${camelCase(completeIconSetName)} = [`);
