export const getInterfaceDefenition = (
  interfaceName: string,
  typeName: string
) => {
  return `export interface ${interfaceName}{
        name: ${typeName};
        data: string;
    }`;
};
