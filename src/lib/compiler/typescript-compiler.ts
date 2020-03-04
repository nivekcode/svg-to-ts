import * as ts from 'typescript';
import { error, info } from '../helpers/log-helper';

const compile = (filePaths: string[], compilerOptions: ts.CompilerOptions): void => {
  let program = ts.createProgram(filePaths, compilerOptions);
  let emitResult = program.emit();
  if (emitResult.emitSkipped) {
    error('Error during compilation of Typesript files');
    reportDiagnostics(ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics));
  } else {
    info('Typescript files successfully compiled');
  }
};

const reportDiagnostics = (diagnostics: ts.Diagnostic[]): void => {
  diagnostics.forEach(diagnostic => {
    let message = 'Error';
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      message += ` ${diagnostic.file.fileName} (${line + 1},${character + 1})`;
    }
    message += ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    info(message);
  });
};

export const compileSources = (filePaths: string[]): void => {
  const tsOptions = {
    noEmitOnError: true,
    noImplicitAny: true,
    declaration: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext
  };
  compile(filePaths, tsOptions);
};
