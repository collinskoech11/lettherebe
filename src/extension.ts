import * as vscode from "vscode";
import { startRecording } from "./commands/startRecording";
import { EditorService } from "./services/editorService";

export function activate(context: vscode.ExtensionContext) {
  const editorService = new EditorService();

  context.subscriptions.push(
    vscode.commands.registerCommand("voiceCoder.startRecording", () =>
      startRecording(context, editorService)
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}