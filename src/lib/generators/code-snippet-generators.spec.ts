import {
  generateInterfaceDefinition,
  generateNamedImportStatement,
  generateSvgConstant,
  generateTypeDefinition,
  generateVariableName
} from './code-snippet-generators';
import { ConstantsConversionOptions } from '../options/conversion-options';
import { SvgDefinition } from '../converters/shared.converter';

describe('Generators', () => {
  describe('generateInterfaceDefinition', () => {
    it('should return the correct interface definition when passing generateType', () => {
      const options = {
        generateType: true,
        typeName: 'AppIcons',
        interfaceName: 'IconInterface'
      } as ConstantsConversionOptions;
      const expected = `export interface ${options.interfaceName}{
        name: ${options.typeName};
        data: string;}`;
      expect(generateInterfaceDefinition(options)).toEqual(expected);
    });

    it('should return the correct interface definition when passing generateTypeObject', () => {
      const options = {
        generateTypeObject: true,
        typeName: 'AppIcons',
        interfaceName: 'IconInterface'
      } as ConstantsConversionOptions;
      const expected = `export interface ${options.interfaceName}{
        name: string;
        data: string;}`;
      expect(generateInterfaceDefinition(options)).toEqual(expected);
    });

    it('should return the correct interface definition when not generating a type', () => {
      const options = { typeName: 'AppIcons', interfaceName: 'IconInterface' } as ConstantsConversionOptions;
      const expected = `export interface ${options.interfaceName}{
        name: string;
        data: string;}`;
      expect(generateInterfaceDefinition(options)).toEqual(expected);
    });
  });

  describe('generateTypeDefinition', () => {
    it('should create type definition', () => {
      const options = { generateType: true, typeName: 'AppIcons' } as ConstantsConversionOptions;
      const types = ['alert', 'noResults'];
      const svgDefinitions = types.map(typeName => ({ typeName })) as SvgDefinition[];
      const expected = `
    export type ${options.typeName} = ${types.map(v => `'${v}'`).join(' | ')};`;
      expect(generateTypeDefinition(options, svgDefinitions)).toEqual(expected);
    });

    it('should create type definition object', () => {
      const options = { generateTypeObject: true, typeName: 'AppIcons' } as ConstantsConversionOptions;
      const types = ['alert', 'noResults'];
      const svgDefinitions = types.map(typeName => ({ typeName })) as SvgDefinition[];
      const expected = `
    export const ${options.typeName} = {
      ${types.map(v => `'${v}': '${v}'`).join(',')}
    };`;
      expect(generateTypeDefinition(options, svgDefinitions)).toEqual(expected);
    });

    it('should create both type definitions', () => {
      const options = {
        generateType: true,
        generateTypeObject: true,
        typeName: 'AppIcons'
      } as ConstantsConversionOptions;
      const types = ['alert', 'noResults'];
      const svgDefinitions = types.map(typeName => ({ typeName })) as SvgDefinition[];
      let expected = `
    export type ${options.typeName} = ${types.map(v => `'${v}'`).join(' | ')};`;
      expected += `
    export const ${options.typeName} = {
      ${types.map(v => `'${v}': '${v}' as ${options.typeName}`).join(',')}
    };`;
      expect(generateTypeDefinition(options, svgDefinitions)).toEqual(expected);
    });
  });

  it('should return the correct svg constant definition', () => {
    const variableName = 'smile';
    const filenameWithoutEnding = 'smileFile';
    const data = 'some data';
    const interfaceName = 'AwesomeIcon';

    const expectedSVGConstant = `export const ${variableName}: ${interfaceName} = {
                name: '${filenameWithoutEnding}',
                data: \`${data}\`
            };`;
    expect(generateSvgConstant(variableName, interfaceName, filenameWithoutEnding, data)).toEqual(expectedSVGConstant);
  });

  describe('generateVariableName', () => {
    it('should return the correct variable name', () => {
      const prefix = '';
      const fileName = 'alert';
      const expectedVariable = `alert`;
      expect(generateVariableName(prefix, fileName)).toEqual(expectedVariable);
    });

    it('should return the correct variable name - no prefix', () => {
      const prefix = 'myIcon';
      const fileName = 'alert';
      const expectedVariable = `myIconAlert`;
      expect(generateVariableName(prefix, fileName)).toEqual(expectedVariable);
    });
  });

  describe('Import statements', () => {
    it('should generate correct named import statements', () => {
      const name = 'foo';
      const module = './foo.module';
      const expectedNamedImport = `import {foo} from './foo.module';\n`;

      const generatedNamedImpoort = generateNamedImportStatement(name, module);
      expect(generatedNamedImpoort).toEqual(expectedNamedImport);
    });
  });
});
