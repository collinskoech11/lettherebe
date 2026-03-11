import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand(
    "voiceCoder.start",
    () => {

      const panel = vscode.window.createWebviewPanel(
        "voiceRecorder",
        "Voice Recorder",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = getHtml();
    }
  );

  context.subscriptions.push(disposable);
}

function getHtml() {
  return `
    <html>
      <body>
        <button id="start">Start</button>
        <button id="stop">Stop</button>

        <script>
        const start = document.getElementById("start");

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;

        start.onclick = () => {
          recognition.start();
        };

        recognition.onresult = (event) => {
          const text = event.results[event.results.length - 1][0].transcript;

          vscode.postMessage({
            command: "insertText",
            text
          });
        };
        </script>
      </body>
    </html>
  `;
}