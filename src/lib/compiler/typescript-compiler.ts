import { lstatSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import * as ts from 'typescript';

export const compileToEsNext = (filePaths: string[], outputDir: string): void => {
  const compilerOptionsNext = {
    resolveJsonModule: true,
    declaration: true,
    outDir: outputDir,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
  };

  ts.createProgram(filePaths, compilerOptionsNext).emit();
  renameJsFilesToMJs(outputDir);
  addMJsExtensionToImportStatements(outputDir);
};

export const addMJsExtensionToImportStatements = (outputDir: string): void => {
  const children = readdirSync(outputDir);

  if (children.length === 0) {
    return;
  }

  children.forEach((file) => {
    const path = `${outputDir}/${file}`;
    if (lstatSync(path).isDirectory()) {
      addMJsExtensionToImportStatements(path);
    } else {
      if (path.endsWith('.mjs')) {
        const content = readFileSync(path, 'utf8');
        if (content) {
          const contentWithExtensions = content.replace(/';/g, ".mjs';");
          writeFileSync(path, contentWithExtensions, 'utf8');
        }
      }
    }
  });
};

export const renameJsFilesToMJs = (outputDir: string) => {
  const children = readdirSync(outputDir);

  if (children.length === 0) {
    return;
  }

  children.forEach((file) => {
    const path = `${outputDir}/${file}`;
    if (lstatSync(path).isDirectory()) {
      renameJsFilesToMJs(path);
    } else {
      if (file.endsWith('.js')) {
        renameSync(path, path.replace('.js', '.mjs'));
      }
    }
  });
};

export const compileToUMD = (filePaths: string[], outputDir: string): void => {
  const compilerOptionsUMD = {
    declaration: true,
    outDir: outputDir,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.UMD,
  };
  ts.createProgram(filePaths, compilerOptionsUMD).emit();
};
