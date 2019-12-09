import { getInterfaceDefinition, getSvgConstant, getTypeDefinition } from './definitions';

describe('Definitions', () => {
  it('should return the correct interface definition', () => {
    const interfaceName = 'TestIcons';
    const typeName = 'myAwesomeIcons';
    const expectedDefinition = `export interface ${interfaceName}{
        name: ${typeName};
        data: string;}`;
    expect(getInterfaceDefinition(interfaceName, typeName)).toEqual(expectedDefinition);
  });

  it('should return the correct type definition', () => {
    const typeName = 'awesomeType';
    const expectedTypeDefinition = `type ${typeName} = `;
    expect(getTypeDefinition(typeName)).toEqual(expectedTypeDefinition);
  });

  it('should return the correct svg constant definition', () => {
    const variableName = 'smile';
    const filenameWithoutEnding = 'smileFile';
    const data = 'some data';
    const interfaceName = 'AwesomeIcon';

    const expectedSVGConstant = `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: '${data}'
            };`;
    expect(getSvgConstant(variableName, interfaceName, filenameWithoutEnding, data)).toEqual(expectedSVGConstant);
  });
});
