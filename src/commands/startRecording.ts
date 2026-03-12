import * as vscode from "vscode";
import * as path from "path";
import { WebviewLoader } from "../utils/webviewLoader";
import { EditorService } from "../services/editorService";

export function startRecording(
  context: vscode.ExtensionContext,
  editorService: EditorService
) {
  const webviewPath = vscode.Uri.file(
    path.join(context.extensionPath, "src", "webview")
  );

  const panel = vscode.window.createWebviewPanel(
    "voiceRecorder",
    "Voice Recorder",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [webviewPath],
    }
  );

  // Pass the webview object to the WebviewLoader
  const webviewLoader = new WebviewLoader(context, panel.webview);
  panel.webview.html = webviewLoader.loadWebviewContent(
    "recorder",
    panel.webview.cspSource
  );

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