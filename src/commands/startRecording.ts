import * as vscode from "vscode";
import { WebviewLoader } from "../utils/webviewLoader";
import { EditorService } from "../services/editorService";

export function startRecording(
  context: vscode.ExtensionContext,
  editorService: EditorService
) {
  const panel = vscode.window.createWebviewPanel(
    "voiceRecorder",
    "Voice Recorder",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const webviewLoader = new WebviewLoader(context);
  panel.webview.html = webviewLoader.loadWebviewContent("recorder");

  panel.webview.onDidReceiveMessage(
    (message) => {
      switch (message.command) {
        case "insertText":
          editorService.insertText(message.text);
          return;
      }
    },
    undefined,
    context.subscriptions
  );
}