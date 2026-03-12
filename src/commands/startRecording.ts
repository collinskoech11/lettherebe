import * as vscode from "vscode";
import * as path from "path";
import { WebviewLoader } from "../utils/webviewLoader";
import { EditorService } from "../services/editorService";

export function startRecording(
  context: vscode.ExtensionContext,
  editorService: EditorService
) {

  const webviewRoot = vscode.Uri.file(
    path.join(context.extensionPath, "src", "webview")
  );

const panel = vscode.window.createWebviewPanel(
  "voiceRecorder",
  "Voice Recorder",
  vscode.ViewColumn.One,
  {
    enableScripts: true,
    retainContextWhenHidden: true,
    enableCommandUris: true,

    // REQUIRED for loading JS/CSS
    localResourceRoots: [
      vscode.Uri.file(path.join(context.extensionPath, "src", "webview"))
    ]
  }
);
  // Load the webview HTML
  const webviewLoader = new WebviewLoader(context, panel.webview);

  panel.webview.html = webviewLoader.loadWebviewContent(
    "recorder",
    panel.webview.cspSource
  );

  // Listen for messages from the webview
  panel.webview.onDidReceiveMessage(
    (message) => {

      if (!message || !message.command) {
        return;
      }

      switch (message.command) {

        case "insertText":
          if (message.text) {
            editorService.insertText(message.text);
          }
          break;

        case "log":
          console.log("[Voice Extension]", message.text);
          break;

      }

    },
    undefined,
    context.subscriptions
  );
}