import * as vscode from "vscode";

export class EditorService {
  public insertText(text: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, text);
      });
    } else {
      vscode.window.showWarningMessage("No active editor found to insert text.");
    }
  }
}