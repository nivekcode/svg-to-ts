import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import * as path from 'path';
import { extractSvgContent } from '../helpers/file-helpers';
import { generateTypeName, generateVariableName } from '../generators/code-snippet-generators';
import { generateSvgOptimizer } from '../helpers/svg-optimization';
import { info } from '../helpers/log-helper';

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
  const svgOptimizer = generateSvgOptimizer(svgoConfig);
  const filePaths = await getFilePathsFromRegex(srcFiles);

  // Using Promise.all we are making all files be processed in parallel as they have no dependency on each other
  let svgDefinitions = await Promise.all(
    filePaths.map(
      async (filePath): Promise<SvgDefinition | null> => {
        let svgDefinition: SvgDefinition = null;
        const fileNameWithEnding = path.basename(filePath);
        const [filenameWithoutEnding, extension] = fileNameWithEnding.split('.');
        if (extension === 'svg') {
          const rawSvg = await extractSvgContent(filePath);
          info(`optimize svg: ${fileNameWithEnding}`);
          const optimizedSvg = await svgOptimizer.optimize(rawSvg, { path: filePath });
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

  // This will filter out null values
  return svgDefinitions.filter(svgDefinition => svgDefinition);
};
