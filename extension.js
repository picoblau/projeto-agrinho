"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
let statusBar;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("tetris.start-game", () => {
        const panel = vscode.window.createWebviewPanel("tetris", "Tetris", vscode.ViewColumn.One, {
            // Enable scripts in the webview
            enableScripts: true,
        });
        const filePath = path.join(context.extensionPath, "tetris.html");
        const html = fs.readFileSync(filePath, "utf8");
        panel.webview.html = html;
    }));
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.command = "tetris.start-game";
    context.subscriptions.push(statusBar);
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBar));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBar));
    updateStatusBar();
}
exports.activate = activate;
function updateStatusBar() {
    statusBar.text = `$(game)`;
    statusBar.tooltip = "Tetris";
    statusBar.show();
}
//# sourceMappingURL=extension.js.map