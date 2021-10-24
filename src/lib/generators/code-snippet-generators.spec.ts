import snakeCase from 'lodash.snakecase';
import { SvgDefinition } from '../converters/shared.converter';
import { unformatedString } from '../helpers/test-helpers';
import { ConstantsConversionOptions } from '../options/conversion-options';
import {
  Delimiter,
  generateEnumDefinition,
  generateInterfaceDefinition,
  generateNamedImportStatement,
  generateSvgConstant,
  generateTypeDefinition,
  generateTypeHelper,
  generateTypeHelperWithImport,
  generateTypeName,
  generateVariableName
} from './code-snippet-generators';

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

    it('should add Enum value as type for name if generateEnum === true', () => {
      const options = {
        generateType: true,
        generateEnum: true,
        typeName: 'AppIcons',
        enumName: 'AppIconsEnum',
        interfaceName: 'IconInterface'
      } as ConstantsConversionOptions;
      const expected = `export interface ${options.interfaceName}{
        name: ${options.typeName} | ${options.enumName};
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

  describe('generateEnumDefinition', () => {
    it('should create enum definition', () => {
      const options = { generateEnum: true, enumName: 'AppIconsEnum' } as ConstantsConversionOptions;
      const types = ['alert', 'noResults'];
      const svgDefinitions = types.map(typeName => ({ typeName })) as SvgDefinition[];
      const expected = `
    export enum ${options.enumName} {${svgDefinitions
        .map(
          ({ typeName }, index) =>
            `${snakeCase(typeName).toUpperCase()} = '${typeName}'${index === svgDefinitions.length - 1 ? '}' : ','}`
        )
        .join('')};`;
      expect(generateEnumDefinition(options, svgDefinitions)).toEqual(expected);
    });
  });

  it('should return the correct svg constant definition', () => {
    const variableName = 'smile';
    const filenameWithoutEnding = 'smileFile';
    const data = 'some data';

    const expectedSVGConstant = `export const ${variableName}: {
            name: '${filenameWithoutEnding}',
            data: string
          } = {
                name: '${filenameWithoutEnding}',
                data: \`${data}\`
            };`;
    expect(generateSvgConstant(variableName, filenameWithoutEnding, data)).toEqual(expectedSVGConstant);
  });

  describe('generateTypeName', () => {
    it('should return the correct type name with delimiter SNAKE', () => {
      const fileName = 'chevron-top';
      expect(generateTypeName(fileName, Delimiter.SNAKE)).toEqual('chevron_top');
    });

    it('should return the correct type name with delimiter CAMEL', () => {
      const fileName = 'chevron-top';
      expect(generateTypeName(fileName, Delimiter.CAMEL)).toEqual('chevronTop');
    });

    it('should return the correct type name with delimiter KEBAB', () => {
      const fileName = 'chevron_top';
      expect(generateTypeName(fileName, Delimiter.KEBAB)).toEqual('chevron-top');
    });

    it('should return the correct type name with delimiter UPPER', () => {
      const fileName = 'chevron-top';
      expect(generateTypeName(fileName, Delimiter.UPPER)).toEqual('CHEVRON_TOP');
    });
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

      const generatedNamedImport = generateNamedImportStatement(name, module);
      expect(generatedNamedImport).toEqual(expectedNamedImport);
    });
  });

  describe('Type helper', () => {
    it('should generate the correct type helper statement', () => {
      const interfaceName = 'MyIcons';
      const expectedStatement = `
        export type ${interfaceName}NameSubset<T extends Readonly<${interfaceName}[]>> = T[number]['name'];
       `;

      const generatedStatement = generateTypeHelper(interfaceName);
      expect(unformatedString(generatedStatement)).toEqual(unformatedString(expectedStatement));
    });

    it('should generate the correct type helper and import statement', () => {
      const interfaceName = 'MyIcon';
      const modelFileName = 'my-icons';
      const iconsFolderName = 'build';

      const expectedStatement = `
        import {${interfaceName}} from './${iconsFolderName}/${modelFileName}';
        export type ${interfaceName}NameSubset<T extends Readonly<${interfaceName}[]>> = T[number]['name'];
       `;

      const generatedStatement = generateTypeHelperWithImport(interfaceName, iconsFolderName, modelFileName);
      expect(unformatedString(generatedStatement)).toEqual(unformatedString(expectedStatement));
    });
  });
});
