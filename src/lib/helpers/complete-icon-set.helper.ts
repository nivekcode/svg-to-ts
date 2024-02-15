import camelCase from 'lodash.camelcase';

import { SvgDefinition } from '../converters/shared.converter';
import { generateNamedImportStatement } from '../generators/code-snippet-generators';
import { FILE_TYPE } from '../shared/file-type.model';

export const generateCompleteIconSetContent = (
  svgDefinitions: SvgDefinition[],
  completeIconSetName: string,
  interfaceName?: string,
  modelFileName?: string,
  generateType?: boolean,
): string => {
  const importSection = generateImportSection(
    svgDefinitions,
    generateType ? interfaceName : undefined,
    generateType ? modelFileName : undefined,
  );
  const exportSection = generateExportSection(
    svgDefinitions,
    completeIconSetName,
    FILE_TYPE.TS,
    generateType ? interfaceName : undefined,
  );
  return `${importSection}${exportSection}`;
};

const generateImportSection = (
  svgDefinitions: SvgDefinition[],
  interfaceName?: string,
  modelFileName?: string,
): string => {
  const imports =
    interfaceName && modelFileName ? generateNamedImportStatement(interfaceName, `./${modelFileName}`) : '';
  return svgDefinitions.reduce((acc: string, svgDefinition: SvgDefinition) => {
    acc += generateNamedImportStatement(
      svgDefinition.variableName,
      `./${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`,
    );
    return acc;
  }, imports);
};

export const generateExportSection = (
  svgDefinitions: SvgDefinition[],
  completeIconSetName: string,
  fileType = FILE_TYPE.TS,
  interfaceName?: string,
): string => {
  const interfaceSuffix = interfaceName ? `:${interfaceName}[]` : '';
  return svgDefinitions.reduce(
    (acc: string, svgDefinition: SvgDefinition, index: number) => {
      const variableName =
        fileType === FILE_TYPE.TSX
          ? svgDefinition.variableName.charAt(0).toUpperCase() + svgDefinition.variableName.slice(1)
          : svgDefinition.variableName;

      const interfaceSuffix = interfaceName ? ` as ${interfaceName}` : '';

      if (index === svgDefinitions.length - 1) {
        acc += `${variableName}${interfaceSuffix}];`;
      } else {
        acc += `${variableName}${interfaceSuffix},`;
      }
      return acc;
    },
    `export const ${camelCase(completeIconSetName)}${interfaceSuffix} = [`,
  );
};
