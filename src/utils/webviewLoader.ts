import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class WebviewLoader {
  private readonly _extensionPath: string;
  private readonly _webview: vscode.Webview; // Store the webview object

  constructor(context: vscode.ExtensionContext, webview: vscode.Webview) {
    this._extensionPath = context.extensionPath;
    this._webview = webview; // Initialize the webview object
  }

  public loadWebviewContent(webviewName: string, cspSource: string): string {
    const webviewPath = path.join(this._extensionPath, "src", "webview");
    const htmlPath = path.join(webviewPath, `${webviewName}.html`);
    let htmlContent = fs.readFileSync(htmlPath, "utf8");

    // Replace placeholders for CSS and JS paths
    htmlContent = htmlContent.replace(
      /\$\{webview.cspSource\}/g,
      cspSource // Use the cspSource passed from the extension
    );
    htmlContent = htmlContent.replace(
      /\$\{webview.css\}/g,
      this.getWebviewUri(webviewPath, `${webviewName}.css`)
    );
    htmlContent = htmlContent.replace(
      /\$\{webview.js\}/g,
      this.getWebviewUri(webviewPath, `${webviewName}.js`)
    );

    return htmlContent;
  }

  private getWebviewUri(webviewPath: string, fileName: string): string {
    const onDiskPath = vscode.Uri.file(path.join(webviewPath, fileName));
    // Use this._webview.asWebviewUri() to convert the URI
    return this._webview.asWebviewUri(onDiskPath).toString();
  }
}