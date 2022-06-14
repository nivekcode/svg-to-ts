import { compileToEsNext, compileToUMD } from '../compiler/typescript-compiler';
import {
  generateEnumDefinition,
  generateExportStatement,
  generateInterfaceDefinition,
  generateSvgConstant,
  generateTypeDefinition,
  generateTypeHelperWithImport,
  generateTSXConstant
} from '../generators/code-snippet-generators';
import { generateCompleteIconSetContent } from '../helpers/complete-icon-set.helper';
import { deleteFiles, deleteFolder, writeFile } from '../helpers/file-helpers';
import { Logger } from '../helpers/logger';
import { callAndMonitor, callAndMonitorAsync } from '../helpers/monitor';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import {
  FilesConversionOptions,
  SVG_TO_TS_COMPILATION_OUTPUT
} from '../options/conversion-options/files-conversion-options';
import { FILE_TYPE } from '../shared/file-type.model';

import { filesProcessor, SvgDefinition } from './shared.converter';

export const convertToFiles = async (conversionOptions: FilesConversionOptions): Promise<void> => {
  const { tsx } = conversionOptions;
  if (tsx) {
    await generateTSXFiles(conversionOptions);
  } else {
    await generateTSFiles(conversionOptions);
  }
};

async function generateTSXFiles(conversionOptions: FilesConversionOptions) {
  const {
    outputDirectory,
    iconsFolderName,
    exportCompleteIconSet,
    completeIconSetName,
    barrelFileName
  } = conversionOptions;

  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );

  const generatedFileNames = await callAndMonitorAsync<string[]>(
    generateTSXFileConstants.bind({}, svgDefinitions, outputDirectory, iconsFolderName),
    'Generate TSX constants'
  );

  if (exportCompleteIconSet) {
    await callAndMonitorAsync<void>(
      generateCompleteIconSet.bind({}, svgDefinitions, outputDirectory, iconsFolderName, completeIconSetName),
      'Export complete icon set'
    );
    generatedFileNames.push(completeIconSetName);
  }

  const indexFileContent = generatedFileNames
    .map((generatedFileName: string) => generateExportStatement(generatedFileName, iconsFolderName))
    .join('');

  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, barrelFileName, indexFileContent),
    'Generate barrel file'
  );

  Logger.generationSuccess(outputDirectory);
}

async function generateTSFiles(conversionOptions: FilesConversionOptions) {
  const {
    outputDirectory,
    modelFileName,
    additionalModelOutputPath,
    iconsFolderName,
    interfaceName,
    compileSources,
    exportCompleteIconSet,
    completeIconSetName,
    compilationOutput,
    barrelFileName
  } = conversionOptions;
  await callAndMonitorAsync<void>(
    deleteFolder.bind({}, `${outputDirectory}/${iconsFolderName}`),
    'Deleting the output folder'
  );
  const svgDefinitions = await callAndMonitorAsync<SvgDefinition[]>(
    filesProcessor.bind({}, conversionOptions),
    'Processing SVG files'
  );

  const generatedFileNames = await callAndMonitorAsync<string[]>(
    generateSVGConstants.bind({}, svgDefinitions, outputDirectory, iconsFolderName),
    'Generate SVG constants'
  );

  if (exportCompleteIconSet) {
    await callAndMonitorAsync<void>(
      generateCompleteIconSet.bind({}, svgDefinitions, outputDirectory, iconsFolderName, completeIconSetName),
      'Export complete icon set'
    );
    generatedFileNames.push(completeIconSetName);
  }

  let indexFileContent = callAndMonitor<string>(
    generateTypeHelperWithImport.bind({}, interfaceName, iconsFolderName, modelFileName),
    'Generate Type Helper'
  );

  indexFileContent += generatedFileNames
    .map((generatedFileName: string) => generateExportStatement(generatedFileName, iconsFolderName))
    .join('');

  indexFileContent += generateExportStatement(modelFileName, iconsFolderName);
  await callAndMonitorAsync<void>(
    writeFile.bind({}, outputDirectory, barrelFileName, indexFileContent),
    'Generate barrel file'
  );

  if (modelFileName) {
    const modelFile = await callAndMonitorAsync<void>(
      generateModelFile.bind({}, conversionOptions, svgDefinitions),
      'Generate model file'
    );

    if (additionalModelOutputPath) {
      await callAndMonitorAsync<void>(
        writeFile.bind({}, `${additionalModelOutputPath}`, modelFileName, modelFile),
        'Write model file to additional output path'
      );
    }
  }

  if (compileSources) {
    await callAndMonitorAsync<void>(
      compileTypeScriptToJS.bind({}, outputDirectory, iconsFolderName, barrelFileName, compilationOutput),
      'Compile TypeScript to JavaScript'
    );
  }
  Logger.generationSuccess(outputDirectory);
}

const generateSVGConstants = async (
  svgDefinitions: SvgDefinition[],
  outputDirectory: string,
  iconsFolderName: string
): Promise<string[]> => {
  const generatedFileNames: string[] = [];
  await Promise.all(
    svgDefinitions.map(async svgDefinition => {
      const svgConstant = generateSvgConstant(svgDefinition.variableName, svgDefinition.typeName, svgDefinition.data);
      const generatedFileName = `${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`;
      generatedFileNames.push(generatedFileName);
      await writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, svgConstant);
      Logger.verboseInfo(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.ts`);
    })
  );
  return generatedFileNames;
};

const generateTSXFileConstants = async (
  svgDefinitions: SvgDefinition[],
  outputDirectory: string,
  iconsFolderName: string
): Promise<string[]> => {
  const generatedFileNames: string[] = [];
  await Promise.all(
    svgDefinitions.map(async svgDefinition => {
      const tsxConstant = generateTSXConstant(svgDefinition.variableName, svgDefinition.data);
      const generatedFileName = `${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`;
      generatedFileNames.push(generatedFileName);
      await writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, tsxConstant, FILE_TYPE.TSX);
      Logger.verboseInfo(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.tsx`);
    })
  );
  return generatedFileNames;
};

const generateCompleteIconSet = async (
  svgDefinitions: SvgDefinition[],
  outputDirectory: string,
  iconsFolderName: string,
  completeIconSetName: string
): Promise<void> => {
  const completeIconSetContent = generateCompleteIconSetContent(svgDefinitions, completeIconSetName);
  await writeFile(`${outputDirectory}/${iconsFolderName}`, completeIconSetName, completeIconSetContent);
};

const generateModelFile = async (
  conversionOptions: FilesConversionOptions,
  svgDefinitions: SvgDefinition[]
): Promise<string> => {
  const { outputDirectory, modelFileName, additionalModelOutputPath, iconsFolderName } = conversionOptions;

  const typeDefinition = generateTypeDefinition(conversionOptions, svgDefinitions);
  const enumDefinition = generateEnumDefinition(conversionOptions, svgDefinitions);
  const interfaceDefinition = generateInterfaceDefinition(conversionOptions);
  const modelFile = `${typeDefinition}${interfaceDefinition}${enumDefinition}`;
  await writeFile(`${outputDirectory}/${iconsFolderName}`, modelFileName, modelFile);
  Logger.verboseInfo(
    `model-file successfully generated under ${outputDirectory}/${iconsFolderName}/${modelFileName}.ts`
  );

  if (additionalModelOutputPath) {
    await writeFile(`${additionalModelOutputPath}`, modelFileName, modelFile);
    Logger.verboseInfo(
      `additional model-file successfully generated under ${additionalModelOutputPath}/${modelFileName}.ts`
    );
  }
  return modelFile;
};

const compileTypeScriptToJS = async (
  outputDirectory: string,
  iconsFolderName: string,
  barrelFileName: string,
  compilationOutput: SVG_TO_TS_COMPILATION_OUTPUT
): Promise<void> => {
  const generatedTypeScriptFilePaths = await getFilePathsFromRegex([
    `${outputDirectory}/${iconsFolderName}/*.ts`,
    `${outputDirectory}/${barrelFileName}.ts`
  ]);
  switch (compilationOutput) {
    case SVG_TO_TS_COMPILATION_OUTPUT.ESM:
      compileToEsNext(generatedTypeScriptFilePaths, outputDirectory);
      deleteFiles(generatedTypeScriptFilePaths);
      break;
    case SVG_TO_TS_COMPILATION_OUTPUT.UMD:
      compileToUMD(generatedTypeScriptFilePaths, outputDirectory);
      deleteFiles(generatedTypeScriptFilePaths);
      break;
    case SVG_TO_TS_COMPILATION_OUTPUT.ESM_AND_UMD:
      compileToEsNext(generatedTypeScriptFilePaths, `${outputDirectory}/esm`);
      compileToUMD(generatedTypeScriptFilePaths, `${outputDirectory}/umd`);
      deleteFiles(generatedTypeScriptFilePaths);
      await deleteFolder(`${outputDirectory}/build`);
      break;
    default:
      Logger.error(`Please provide a valid Compilation output. You provided ${compilationOutput} but 
            valid values are (ESM, UMD, ESM_AND_UMD).`);
      break;
  }
};
