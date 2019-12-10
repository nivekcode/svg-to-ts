export const getInterfaceDefinition = (interfaceName: string, typeName: string) => {
  return `export interface ${interfaceName}{
        name: ${typeName};
        data: string;}`;
};

export const getTypeDefinition = (typeName: string): string => {
  return `export type ${typeName} = `;
};

export const getSvgConstant = (
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
