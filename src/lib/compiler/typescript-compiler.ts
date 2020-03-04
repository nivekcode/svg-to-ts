import * as ts from 'typescript';

export const compileSources = (filePaths: string[]): void => {
  const compilerOptions = {
    noEmitOnError: true,
    noImplicitAny: true,
    declaration: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext
  };
  ts.createProgram(filePaths, compilerOptions).emit();
};
