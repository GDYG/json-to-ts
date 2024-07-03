# JSON to TypeScript

## Overview

The JSON to TypeScript extension for Visual Studio Code allows you to quickly convert JSON content from your clipboard into TypeScript type declarations. This tool is particularly useful for developers who frequently work with JSON data and need to generate TypeScript interfaces to type-check their data structures.

## Features

- Convert JSON from clipboard to TypeScript interfaces.
- Customizable root interface name.
- Accessible via command palette, context menu, and keyboard shortcuts.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for "JSON to TypeScript".
4. Click `Install` to install the extension.

## Usage

### Via Command Palette

1. Copy the JSON content you want to convert to your clipboard.
2. Open the Command Palette by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
3. Type `Convert JSON to TypeScript` and select the command.
4. Enter the desired name for the root interface when prompted.
5. The generated TypeScript interfaces will be inserted at the current cursor position in the active editor.

### Via Context Menu

1. Copy the JSON content you want to convert to your clipboard.
2. Right-click in the active editor to open the context menu.
3. Select `Convert JSON to TypeScript`.
4. Enter the desired name for the root interface when prompted.
5. The generated TypeScript interfaces will be inserted at the current cursor position.

### Via Keyboard Shortcut

1. Copy the JSON content you want to convert to your clipboard.
2. Press the following keyboard shortcut:
   - Windows/Linux: `Ctrl+Alt+J`
   - macOS: `Cmd+Alt+J`
3. Enter the desired name for the root interface when prompted.
4. The generated TypeScript interfaces will be inserted at the current cursor position in the active editor.

## Configuration

No additional configuration is required. The extension is ready to use out of the box.

## Contributing

If you have any suggestions, bug reports, or contributions, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/GDYG/json-to-ts).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/GDYG/json-to-ts/tree/main?tab=MIT-1-ov-file#readme) file for details.

## Credits

This extension was built using the [json-to-ts](https://www.npmjs.com/package/json-to-ts) library.

## Release Notes

### 0.0.1

- Initial release of JSON to TypeScript.
- Supports conversion of JSON from clipboard to TypeScript interfaces.
- Customizable root interface name.
- Accessible via command palette, context menu, and keyboard shortcuts.
