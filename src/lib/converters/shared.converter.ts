import * as path from 'path';
import { optimize } from 'svgo';

import { generateTypeName, generateVariableName } from '../generators/code-snippet-generators';
import { extractSvgContent } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';

export interface SvgDefinition {
  typeName: string;
  variableName: string;
  interfaceName: string;
  data: string;
  prefix: string;
  filenameWithoutEnding: string;
}

export const filesProcessor = async (conversionOptions): Promise<SvgDefinition[]> => {
  const { prefix, delimiter, interfaceName, srcFiles, svgoConfig } = conversionOptions;
  const filePaths = await getFilePathsFromRegex(srcFiles);

  if (!filePaths.length) {
    throw `No SVG files found for ${srcFiles}`;
  }

  // Using Promise.all we are making all files be processed in parallel as they have no dependency on each other
  let svgDefinitions = await Promise.all(
    filePaths.map(
      async (filePath): Promise<SvgDefinition | null> => {
        let svgDefinition: SvgDefinition = null;
        const fileNameWithEnding = path.basename(filePath).replace(`'`, '');
        const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');
        if (extension === 'svg') {
          const rawSvg = await extractSvgContent(filePath);
          Logger.verboseInfo(`optimize svg: ${fileNameWithEnding}`);
          const optimizedSvg = await optimize(rawSvg, { path: filePath, ...svgoConfig });
          const variableName = generateVariableName(prefix, filenameWithoutEnding);

          const typeName = generateTypeName(filenameWithoutEnding, delimiter);
          svgDefinition = {
            typeName,
            prefix,
            variableName,
            interfaceName,
            data: optimizedSvg.data,
            filenameWithoutEnding
          };
        }
        return svgDefinition;
      }
    )
  );
  return svgDefinitions.filter(svgDefinition => svgDefinition);
};
