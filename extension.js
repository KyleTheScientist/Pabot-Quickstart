// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('qbot.dsuite', function () {
        // The code you place here will be executed every time your command is executed
        var suite_path = vscode.window.activeTextEditor.document.uri.path;
        var suite_name = suite_path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
        vscode.window.showQuickPick(["Windows", "Debian"]).then(
            (selection) => {
                if (!selection) {
                    return
                }
                var command = null;
                if (selection == "Windows") {
                    command = "wsuite"
                }else {
                    command = "dsuite"
                }
                const terminal = vscode.window.createTerminal("Pabot");// Display a message box to the user
                terminal.show(false);
                terminal.sendText(command + " " + suite_name)
            }
        )
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
