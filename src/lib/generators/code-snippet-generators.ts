import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';
import snakeCase from 'lodash.snakecase';

import { SvgDefinition } from '../converters/shared.converter';
import { ConstantsConversionOptions } from '../options/conversion-options/constant-conversion-options';
import { FilesConversionOptions } from '../options/conversion-options/files-conversion-options';
import { ObjectConversionOptions } from '../options/conversion-options/object-conversion-options';

export enum Delimiter {
  CAMEL = 'CAMEL',
  KEBAB = 'KEBAB',
  SNAKE = 'SNAKE',
  UPPER = 'UPPER',
  NONE = 'NONE',
}

export const generateInterfaceDefinition = (conversionOptions: FilesConversionOptions | ConstantsConversionOptions) => {
  let {
    interfaceName,
    enumName = '',
    typeName = '',
    generateType,
    generateTypeObject,
    generateEnum,
  } = conversionOptions;

  let nameType = 'string';

  if (generateType || generateTypeObject) {
    nameType = typeName;
  }
  // Will rewrite nameType with enumName
  if (generateEnum) {
    nameType = enumName;
  }

  return `export interface ${interfaceName}{
        name: ${nameType};
        data: string;}`;
};

export const generateObjectInterface = (exportAsDefaultObject: boolean, conversionOptions: ObjectConversionOptions) => {
  const { generateType, typeName } = conversionOptions;
  const shouldAddTypeInfo = generateType && !!typeName;
  let typePatch = '';
  if (shouldAddTypeInfo) {
    const objectType = `{ [key in ${typeName}]: string }`;
    typePatch = exportAsDefaultObject ? `as ${objectType}` : `:${objectType}`;
  }
  return typePatch;
};

export const generateTypeDefinition = (
  conversionOptions: FilesConversionOptions | ConstantsConversionOptions,
  svgDefinitions: SvgDefinition[],
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
            }`,
        )
        .join('')}
    };`;
  }

  return typesDefinition;
};

export const generateEnumDefinition = (
  conversionOptions: FilesConversionOptions | ConstantsConversionOptions,
  svgDefinitions: SvgDefinition[],
): string => {
  let enumDefinition = '';
  const { generateEnum, enumName } = conversionOptions;

  if (generateEnum) {
    enumDefinition += `
    export enum ${enumName} {${svgDefinitions
      .map(
        ({ typeName }, index) =>
          `${snakeCase(typeName).toUpperCase()} = '${typeName}'${index === svgDefinitions.length - 1 ? '}' : ','}`,
      )
      .join('')};`;
  }
  return enumDefinition;
};

export const generateSvgConstant = (variableName: string, filenameWithoutEnding: string, data: string): string => {
  return `export const ${variableName}: {
            name: '${filenameWithoutEnding}',
            data: string
          } = {
                name: '${filenameWithoutEnding}',
                data: \`${data}\`
            };`;
};

export function generateTSXConstant(variableName: string, svg: string) {
  const variableNameCapitalized = variableName.charAt(0).toUpperCase() + variableName.slice(1);
  const svgStringWithProps = svg.replace('>', ' {...props}>');
  return `export const ${variableNameCapitalized} = (props: {[key: string]: any}) => (${svgStringWithProps});`;
}

export const generateExportStatement = (fileName: string, generatedIconsFolderName?: string): string => {
  if (generatedIconsFolderName) {
    return `export * from './${generatedIconsFolderName}/${fileName}';`;
  }
  return `export * from './${fileName}';`;
};

export const generateNamedImportStatement = (name: string, module: string): string =>
  `import {${name}} from '${module}';\n`;

export const generateTypeName = (filenameWithoutEnding, delimiter: Delimiter, namePrefix?: string): string => {
  if (delimiter === Delimiter.CAMEL) {
    return `${namePrefix || ''}${camelCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.KEBAB) {
    return `${namePrefix || ''}${kebabCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.UPPER) {
    return `${namePrefix || ''}${snakeCase(filenameWithoutEnding).toUpperCase()}`;
  }
  if (delimiter === Delimiter.NONE) {
    return `${namePrefix || ''}${filenameWithoutEnding}`;
  }
  return `${namePrefix || ''}${snakeCase(filenameWithoutEnding)}`;
};

export const generateVariableName = (prefix: string, filenameWithoutEnding): string => {
  const camelCased = camelCase(filenameWithoutEnding);
  return prefix ? `${prefix}${capitalize(camelCased)}` : camelCased;
};

export const generateTypeHelper = (interfaceName: string): string => `
    export type ${interfaceName}NameSubset<T extends Readonly<${interfaceName}[]>> = T[number]['name'];
    `;

export const generateTypeHelperWithImport = (
  interfaceName: string,
  iconsFolderName: string,
  modelFileName: string,
): string => `
    import type {${interfaceName}} from './${iconsFolderName}/${modelFileName}';
    ${generateTypeHelper(interfaceName)}
    `;

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
