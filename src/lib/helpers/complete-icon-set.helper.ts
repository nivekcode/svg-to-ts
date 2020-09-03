import { generateNamedImportStatement } from '../generators/code-snippet-generators';
import { SvgDefinition } from '../converters/shared.converter';

export const generateCompleteIconSetContent = (svgDefinitions: SvgDefinition[]): string => {
  const importSection = generateImportSection(svgDefinitions);
  const exportSection = generateExportSection(svgDefinitions);
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

const generateExportSection = (svgDefinitions: SvgDefinition[]): string =>
  svgDefinitions.reduce((acc: string, svgDefinition: SvgDefinition, index: number) => {
    if (index === svgDefinitions.length - 1) {
      acc += `${svgDefinition.variableName}];`;
    } else {
      acc += `${svgDefinition.variableName},`;
    }
    return acc;
  }, `export const completeIconSet = [`);
