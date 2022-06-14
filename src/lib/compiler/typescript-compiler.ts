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
