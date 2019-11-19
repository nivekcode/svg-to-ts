export const getInterfaceDefenition = (interfaceName: string) => {
  return `export interface ${interfaceName}{
        name: string;
        data: string;
    }`;
};
