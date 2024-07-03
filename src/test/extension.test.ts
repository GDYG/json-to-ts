import * as assert from "assert";
import * as vscode from "vscode";
import jsonToTs from "json-to-ts";
import * as sinon from "sinon";
import { activate } from "../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Convert valid JSON to TypeScript", async () => {
    // 模拟剪切板内容
    const clipboardContent = `{
            "name": "John",
            "age": 30,
            "city": "New York"
        }`;

    const expectedInterface = `
        export interface RootObject {
            name: string;
            age: number;
            city: string;
        }
        `.trim();

    // 模拟读取剪切板内容
    const clipboardStub = sinon
      .stub(vscode.env.clipboard, "readText")
      .resolves(clipboardContent);
    // 模拟输入框内容
    const inputBoxStub = sinon
      .stub(vscode.window, "showInputBox")
      .resolves("RootObject");
    // 模拟活动编辑器
    const activeTextEditorStub = sinon
      .stub(vscode.window, "activeTextEditor")
      .get(() => {
        return {
          document: {
            getText: () => "",
            uri: vscode.Uri.parse("file://fake/path"),
          },
          selection: new vscode.Selection(
            new vscode.Position(0, 0),
            new vscode.Position(0, 0)
          ),
          edit: (callback: (editBuilder: vscode.TextEditorEdit) => void) => {
            const editBuilder = {
              insert: (position: vscode.Position, text: string) => {
                assert.strictEqual(text.trim(), expectedInterface);
                return true;
              },
            };
            callback(editBuilder as unknown as vscode.TextEditorEdit);
            return Promise.resolve(true);
          },
        } as unknown as vscode.TextEditor;
      });

    // 调用命令
    await vscode.commands.executeCommand("extension.convertJsonToTs");

    // 验证
    assert.strictEqual(
      clipboardStub.calledOnce,
      true,
      "Clipboard was not read."
    );
    assert.strictEqual(
      inputBoxStub.calledOnce,
      true,
      "Input box was not shown."
    );

    // 恢复
    clipboardStub.restore();
    inputBoxStub.restore();
    activeTextEditorStub.restore();
  });

  test("Handle invalid JSON gracefully", async () => {
    // 模拟剪切板内容
    const clipboardContent = `{ invalid json }`;

    // 模拟读取剪切板内容
    const clipboardStub = sinon
      .stub(vscode.env.clipboard, "readText")
      .resolves(clipboardContent);
    // 模拟显示错误消息
    const showErrorMessageStub = sinon.stub(vscode.window, "showErrorMessage");

    // 调用命令
    await vscode.commands.executeCommand("extension.convertJsonToTs");

    // 验证
    assert.strictEqual(
      clipboardStub.calledOnce,
      true,
      "Clipboard was not read."
    );
    assert.strictEqual(
      showErrorMessageStub.calledOnce,
      true,
      "Error message was not shown."
    );
    assert.strictEqual(
      showErrorMessageStub.firstCall.args[0],
      "Invalid JSON in clipboard."
    );

    // 恢复
    clipboardStub.restore();
    showErrorMessageStub.restore();
  });

  test("Handle empty clipboard gracefully", async () => {
    // 模拟剪切板内容为空
    const clipboardContent = ``;

    // 模拟读取剪切板内容
    const clipboardStub = sinon
      .stub(vscode.env.clipboard, "readText")
      .resolves(clipboardContent);
    // 模拟显示错误消息
    const showErrorMessageStub = sinon.stub(vscode.window, "showErrorMessage");

    // 调用命令
    await vscode.commands.executeCommand("extension.convertJsonToTs");

    // 验证
    assert.strictEqual(
      clipboardStub.calledOnce,
      true,
      "Clipboard was not read."
    );
    assert.strictEqual(
      showErrorMessageStub.calledOnce,
      true,
      "Error message was not shown."
    );
    assert.strictEqual(
      showErrorMessageStub.firstCall.args[0],
      "Clipboard is empty."
    );

    // 恢复
    clipboardStub.restore();
    showErrorMessageStub.restore();
  });
});
