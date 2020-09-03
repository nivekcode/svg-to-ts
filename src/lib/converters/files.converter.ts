import {
  generateExportStatement,
  generateInterfaceDefinition,
  generateSvgConstantWithImport,
  generateTypeDefinition
} from '../generators/code-snippet-generators';
import { getFilePathsFromRegex } from '../helpers/regex-helpers';
import { deleteFiles, deleteFolder, writeFile } from '../helpers/file-helpers';
import { error, info, separatorEnd, separatorStart, success } from '../helpers/log-helper';
import { FileConversionOptions } from '../options/conversion-options';
import { compile } from '../compiler/typescript-compiler';
import { filesProcessor, SvgDefinition } from './shared.converter';

type FileNameWithDefinitions = {
  [key: string]: SvgDefinition;
};

export const convertToFiles = async (conversionOptions: FileConversionOptions): Promise<void> => {
  const {
    outputDirectory,
    modelFileName,
    additionalModelOutputPath,
    iconsFolderName,
    compileSources,
    generateCompleteIconSet
  } = conversionOptions;

  try {
    await deleteFolder(`${outputDirectory}/${iconsFolderName}`);
    info(`deleting output directory: ${outputDirectory}/${iconsFolderName}`);

    separatorStart('File optimization');
    const svgDefinitions = await filesProcessor(conversionOptions);
    const fileNamesAndDefinitions: FileNameWithDefinitions[] = [];

    await Promise.all(
      svgDefinitions.map(async svgDefinition => {
        const svgConstant = generateSvgConstantWithImport(
          svgDefinition.variableName,
          svgDefinition.typeName,
          svgDefinition.interfaceName,
          modelFileName,
          svgDefinition.data
        );
        const generatedFileName = `${svgDefinition.prefix}-${svgDefinition.filenameWithoutEnding}.icon`;
        fileNamesAndDefinitions.push({ [generatedFileName]: svgDefinition });
        await writeFile(`${outputDirectory}/${iconsFolderName}`, generatedFileName, svgConstant);
        info(`write file svg: ${outputDirectory}/${iconsFolderName}/${generatedFileName}.ts`);
      })
    );
    let indexFileContent = fileNamesAndDefinitions
      .map((fileNameWithDefinitions: FileNameWithDefinitions) =>
        generateExportStatement(Object.keys(fileNameWithDefinitions)[0], iconsFolderName)
      )
      .join('');

    separatorEnd();

    indexFileContent += generateExportStatement(modelFileName, iconsFolderName);
    await writeFile(outputDirectory, 'index', indexFileContent);
    info(`write index.ts`);

    if (modelFileName) {
      const typeDefinition = generateTypeDefinition(conversionOptions, svgDefinitions);
      const interfaceDefinition = generateInterfaceDefinition(conversionOptions);
      const modelFile = `${typeDefinition}${interfaceDefinition}`;
      await writeFile(`${outputDirectory}/${iconsFolderName}`, modelFileName, modelFile);
      info(`model-file successfully generated under ${outputDirectory}/${iconsFolderName}/${modelFileName}.ts`);

      if (additionalModelOutputPath) {
        await writeFile(`${additionalModelOutputPath}`, modelFileName, modelFile);
        info(`additional model-file successfully generated under ${additionalModelOutputPath}/${modelFileName}.ts`);
      }
    }

    if (compileSources) {
      const generatedTypeScriptFilePaths = await getFilePathsFromRegex([
        `${outputDirectory}/${iconsFolderName}/*.ts`,
        `${outputDirectory}/index.ts`
      ]);
      compile(generatedTypeScriptFilePaths);
      info(`compile Typescript - generate JS and d.ts`);
      deleteFiles(generatedTypeScriptFilePaths);
      info(`delete Typescript files`);
    }

    if (generateCompleteIconSet) {
      // const importStatements = generatedFileNames.map((filename: string) => generateExportStatement(filename)).join('');
    }

    success('========================================================');
    success(`your files were successfully created under: ${outputDirectory}`);
    success(
      `don't forget to copy this folder to your dist in a post build script - enjoy your tree-shakable icon library 😎`
    );
    success('========================================================');
  } catch (exception) {
    error(`Something went wrong: ${exception}`);
    process.exit(1);
  }
};
