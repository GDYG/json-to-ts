// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import jsonToTs from "json-to-ts";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "json2ts.convertJsonToTs",
    async () => {
      try {
        // 读取剪切板内容
        const clipboardContent = await vscode.env.clipboard.readText();

        if (!clipboardContent) {
          vscode.window.showErrorMessage("Clipboard is empty.");
          return;
        }

        // 解析JSON
        let jsonObject;
        try {
          jsonObject = JSON.parse(clipboardContent);
        } catch (error) {
          vscode.window.showErrorMessage("Invalid JSON in clipboard.");
          return;
        }

        // 获取用户输入的接口名称
        const interfaceName = await vscode.window.showInputBox({
          prompt: "Enter the name of the root interface",
          placeHolder: "RootObject",
        });

        if (!interfaceName) {
          vscode.window.showErrorMessage("Interface name is required.");
          return;
        }

        // 将JSON转换为TypeScript接口
        const tsInterfacesArray = jsonToTs(jsonObject);
        const tsInterfaces = tsInterfacesArray
          .map((tsInterface) =>
            tsInterface.replace("RootObject", interfaceName)
          )
          .join("\n\n");

        const editor = vscode.window.activeTextEditor;

        if (editor) {
          // 在当前激活的编辑器中插入生成的接口
          const document = editor.document;
          const position = editor.selection.active;
          editor.edit((editBuilder) => {
            editBuilder.insert(position, tsInterfaces);
          });
        } else {
          // 如果没有打开的编辑器，显示生成的接口
          vscode.window.showInformationMessage(tsInterfaces);
        }
      } catch (error: any) {
        vscode.window.showErrorMessage(`An error occurred: ${error.message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
