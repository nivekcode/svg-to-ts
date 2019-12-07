import { ConvertionOptions } from './convert';

export const getInterfaceDefinition = (
  interfaceName: string,
  typeName: string
) => {
  return `export interface ${interfaceName}{
        name: ${typeName};
        data: string;
    }`;
};

export const getTypeDefinition = (typeName: string): string => {
  return `type ${typeName} = `;
};

export const getSvgConstant = (
  variableName: string,
  convertionOptions: ConvertionOptions,
  filenameWithoutEnding,
  optimizedSvg
): string => {
  return `export const ${variableName}: ${convertionOptions.interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${optimizedSvg.data}'
            };`;
};
