import * as ts from 'typescript';

export const compile = (filePaths: string[]): void => {
  const compilerOptions = {
    noEmitOnError: false,
    noImplicitAny: true,
    declaration: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.UMD
  };
  ts.createProgram(filePaths, compilerOptions).emit();
};
