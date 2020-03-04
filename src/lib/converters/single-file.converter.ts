import * as path from 'path';

import { ConvertionOptions } from '../../bin/svg-to-ts';

import {
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition,
  generateTypeName,
  generateVariableName
} from '../generators/code-snippet-generators';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import { extractSvgContent, writeFile } from '../helpers/file-helpers';
import { success, underlineSuccess } from '../helpers/log-helper';
import { svgOptimizer } from '../helpers/svg-optimization';

const typesDelimitor = ' | ';

export const convertToSingleFile = async (convertionOptions: ConvertionOptions): Promise<void> => {
  const { typeName, prefix, delimiter, interfaceName, outputDirectory, srcFiles, fileName } = convertionOptions;
  let svgConstants = '';
  let types = generateTypeDefinition(typeName);

  try {
    const filePaths = await getFilePathsFromRegex(srcFiles);
    for (let i = 0; i < filePaths.length; i++) {
      const fileNameWithEnding = path.basename(filePaths[i]);
      const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');

      if (extension === 'svg') {
        const rawSvg = await extractSvgContent(filePaths[i]);
        const optimizedSvg = await svgOptimizer.optimize(rawSvg);
        const variableName = generateVariableName(prefix, filenameWithoutEnding);
        const typeName = generateTypeName(filenameWithoutEnding, delimiter);
        const svgConstant = generateSvgConstant(variableName, interfaceName, typeName, optimizedSvg.data);

        svgConstants += svgConstant;
        types += i === filePaths.length - 1 ? `'${typeName}';` : `'${typeName}'${typesDelimitor}`;
      }
    }

    if (svgConstants !== '') {
      const fileContent = (svgConstants += types += generateInterfaceDefinition(interfaceName, typeName));
      await writeFile(outputDirectory, fileName, fileContent);
      success(`Icons file successfully generated under ${underlineSuccess(outputDirectory)}`);
    }
  } catch (error) {
    error('Something went wrong', error);
  }
};
