import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';
import snakeCase from 'lodash.snakecase';
import toUpper from 'lodash.toupper';

import { SvgDefinition } from '../converters/shared.converter';
import { FileConversionOptions, ConstantsConversionOptions } from '../options/conversion-options';

export enum Delimiter {
  CAMEL = 'CAMEL',
  KEBAB = 'KEBAB',
  SNAKE = 'SNAKE',
  UPPER = 'UPPER'
}

export const generateInterfaceDefinition = (conversionOptions: FileConversionOptions | ConstantsConversionOptions) => {
  const iconNameType =
    conversionOptions.generateType || conversionOptions.generateTypeObject ? conversionOptions.typeName : 'string';
  return `export interface ${conversionOptions.interfaceName}{
        name: ${conversionOptions.generateType ? iconNameType : 'string'};
        data: string;}`;
};

export const generateTypeDefinition = (
  conversionOptions: FileConversionOptions | ConstantsConversionOptions,
  svgDefinitions: SvgDefinition[]
): string => {
  let typesDefinition = '';

  if (conversionOptions.generateType) {
    typesDefinition += `
    export type ${conversionOptions.typeName} = ${svgDefinitions
      .map(({ typeName }, index) => `'${typeName}'${index === svgDefinitions.length - 1 ? '' : ' | '}`)
      .join('')};`;
  }

  if (conversionOptions.generateTypeObject) {
    typesDefinition += `
    export const ${conversionOptions.typeName} = {
      ${svgDefinitions
        .map(
          ({ typeName }, index) =>
            `'${typeName}': '${typeName}'${conversionOptions.generateType ? ` as ${conversionOptions.typeName}` : ''}${
              index === svgDefinitions.length - 1 ? '' : ','
            }`
        )
        .join('')}
    };`;
  }

  return typesDefinition;
};

export const generateSvgConstant = (
  variableName: string,
  interfaceName: string,
  filenameWithoutEnding: string,
  data: string
): string => {
  return `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: \`${data}\`
            };`;
};

export const generateSvgConstantWithImport = (
  variableName: string,
  filenameWithoutEnding: string,
  interfaceName: string,
  modelFileName: string,
  data: string
): string => {
  return `
    import {${interfaceName}} from './${modelFileName}';
  
    export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: \`${data}\`
            };`;
};

export const generateExportStatement = (fileName: string, generatedIconsFolderName?: string): string => {
  if (generatedIconsFolderName) {
    return `export * from './${generatedIconsFolderName}/${fileName}';`;
  }
  return `export * from './${fileName}';`;
};

export const generateNamedImportStatement = (name: string, module: string): string =>
  `import {${name}} from '${module}';\n`;

export const generateTypeName = (filenameWithoutEnding, delimiter: Delimiter): string => {
  if (delimiter === Delimiter.CAMEL) {
    return `${camelCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.KEBAB) {
    return `${kebabCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.UPPER) {
    return `${snakeCase(filenameWithoutEnding).toUpperCase()}`;
  }
  return `${snakeCase(filenameWithoutEnding)}`;
};

export const generateVariableName = (prefix: string, filenameWithoutEnding): string => {
  const camelCased = camelCase(filenameWithoutEnding);
  return prefix ? `${prefix}${capitalize(camelCased)}` : camelCased;
};

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
