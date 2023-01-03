import { lstatSync, readdirSync, renameSync } from 'fs';
import * as ts from 'typescript';

export const compileToEsNext = (filePaths: string[], outputDir: string): void => {
  const compilerOptionsNext = {
    resolveJsonModule: true,
    declaration: true,
    outDir: outputDir,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.ESNext
  };

  ts.createProgram(filePaths, compilerOptionsNext).emit();
  renameJsFilesToMJs(outputDir);
};

export const renameJsFilesToMJs = (outputDir: string) => {
  const children = readdirSync(outputDir);

  if (children.length === 0) {
    return;
  }

  children.forEach(file => {
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
    target: ts.ScriptTarget.ES2016,
    module: ts.ModuleKind.UMD
  };
  ts.createProgram(filePaths, compilerOptionsUMD).emit();
};
