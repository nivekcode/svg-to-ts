import camelCase from 'lodash.camelcase';

import { SvgDefinition } from '../converters/shared.converter';
import { generateNamedImportStatement } from '../generators/code-snippet-generators';
import { FILE_TYPE } from '../shared/file-type.model';

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

export const generateExportSection = (
  svgDefinitions: SvgDefinition[],
  completeIconSetName: string,
  fileType = FILE_TYPE.TS
): string =>
  svgDefinitions.reduce((acc: string, svgDefinition: SvgDefinition, index: number) => {
    const variableName =
      fileType === FILE_TYPE.TSX
        ? svgDefinition.variableName.charAt(0).toUpperCase() + svgDefinition.variableName.slice(1)
        : svgDefinition.variableName;

    if (index === svgDefinitions.length - 1) {
      acc += `${variableName}];`;
    } else {
      acc += `${variableName},`;
    }
    return acc;
  }, `export const ${camelCase(completeIconSetName)} = [`);
