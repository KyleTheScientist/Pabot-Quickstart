// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

var default_plaform = "Debian";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let suiteCommand = vscode.commands.registerCommand('pabot-quickstart.runSuite', function () {
        // The code you place here will be executed every time your command is executed
        var suite_path = vscode.window.activeTextEditor.document.uri.path;
        var suite_name = suite_path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");

        var options = ["Debian", "Windows"]
        if (default_plaform == "Windows") {
            options =["Windows", "Debian"]
        }

        vscode.window.showQuickPick(options).then(
            (selection) => {
                if (!selection) {
                    return
                }
                default_plaform = selection

                var command = vscode.workspace.getConfiguration('pabot-quickstart').get("commandSuiteDebian");
                if (selection == "Windows") {
                    command = vscode.workspace.getConfiguration('pabot-quickstart').get("commandSuiteWindows")
                }
                const terminal = vscode.window.createTerminal("Pabot");// Display a message box to the user
                terminal.show(false);
                terminal.sendText(command.replace("${SUITE}", suite_name))
            }
        )
    });
    context.subscriptions.push(suiteCommand);

    let tagCommand = vscode.commands.registerCommand('pabot-quickstart.runTag', function () {
        // The code you place here will be executed every time your command is executed
        var tag = vscode.workspace.getConfiguration('pabot-quickstart').get("debugTag");

        var options = ["Debian", "Windows"]
        if (default_plaform == "Windows") {
            options =["Windows", "Debian"]
        }

        vscode.window.showQuickPick(options).then(
            (selection) => {
                if (!selection) {
                    return
                }
                default_plaform = selection

                var command = vscode.workspace.getConfiguration('pabot-quickstart').get("commandTagDebian");
                if (selection == "Windows") {
                    command = vscode.workspace.getConfiguration('pabot-quickstart').get("commandTagWindows")
                }
                const terminal = vscode.window.createTerminal("Pabot");// Display a message box to the user
                terminal.show(false);
                terminal.sendText(command.replace("${DEBUG_TAG}", tag))
            }
        )
    });

    context.subscriptions.push(tagCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
