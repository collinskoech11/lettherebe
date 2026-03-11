import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class WebviewLoader {
  private readonly _extensionPath: string;

  constructor(context: vscode.ExtensionContext) {
    this._extensionPath = context.extensionPath;
  }

  public loadWebviewContent(webviewName: string): string {
    const webviewPath = path.join(this._extensionPath, "src", "webview");
    const htmlPath = path.join(webviewPath, `${webviewName}.html`);
    let htmlContent = fs.readFileSync(htmlPath, "utf8");

    // Replace placeholders for CSS and JS paths
    htmlContent = htmlContent.replace(
      /\${{webview.cspSource}}/g,
      `vscode-resource://`${webviewPath.replace(/\\/g, '/')}`
    );
    htmlContent = htmlContent.replace(
      /\${{webview.css}}/g,
      this.getWebviewUri(webviewPath, `${webviewName}.css`)
    );
    htmlContent = htmlContent.replace(
      /\${{webview.js}}/g,
      this.getWebviewUri(webviewPath, `${webviewName}.js`)
    );

    return htmlContent;
  }

  private getWebviewUri(webviewPath: string, fileName: string): string {
    const onDiskPath = vscode.Uri.file(path.join(webviewPath, fileName));
    return onDiskPath.with({ scheme: "vscode-resource" }).toString();
  }
}