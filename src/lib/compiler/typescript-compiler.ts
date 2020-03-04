import * as ts from 'typescript';

const compile = (filePaths: string[], compilerOptions: ts.CompilerOptions): void => {
  let program = ts.createProgram(filePaths, compilerOptions);
  let emitResult = program.emit();

  reportDiagnostics(ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics));

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  process.exit(exitCode);
};

function reportDiagnostics(diagnostics: ts.Diagnostic[]): void {
  diagnostics.forEach(diagnostic => {
    let message = 'Error';
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      message += ` ${diagnostic.file.fileName} (${line + 1},${character + 1})`;
    }
    message += ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    console.log(message);
  });
}

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
