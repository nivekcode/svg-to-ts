import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
import kebapCase from 'lodash.kebabcase';

export enum Delimiter {
  CAMEL = 'CAMEL',
  KEBAB = 'KEBAB',
  SNAKE = 'SNAKE'
}

export const generateInterfaceDefinition = (interfaceName: string, typeName: string) => {
  return `export interface ${interfaceName}{
        name: ${typeName};
        data: string;}`;
};

export const generateTypeDefinition = (typeName: string): string => {
  return `export type ${typeName} = `;
};

export const generateSvgConstant = (
  variableName: string,
  interfaceName: string,
  filenameWithoutEnding: string,
  data: string
): string => {
  return `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
};

export const generateUntypedSvgConstant = (
  variableName: string,
  filenameWithoutEnding: string,
  data: string
): string => {
  return `export const ${variableName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
};

export const generateSvgStandaloneFile = (
  variableName: string,
  interfaceName: string,
  filenameWithoutEnding: string,
  data: string
): string => {
  return `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
};

export const generateTypeName = (filenameWithoutEnding, delimiter: Delimiter): string => {
  if (delimiter === Delimiter.CAMEL) {
    return `${camelCase(filenameWithoutEnding)}`;
  }
  if (delimiter === Delimiter.KEBAB) {
    return `${kebapCase(filenameWithoutEnding)}`;
  }
  return `${snakeCase(filenameWithoutEnding)}`;
};

export const generateVariableName = (prefix: string, filenameWithoutEnding): string => {
  return `${prefix}${capitalize(camelCase(filenameWithoutEnding))}`;
};

const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
