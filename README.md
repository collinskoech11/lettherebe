# Let There Be

**Let There Be** is a Visual Studio Code extension that aims to eliminate the keyboard in the coding experience. It allows you to write and edit code using voice commands, and to directly prompt and control CLI agents like Gemini and Copilot.

## Roadmap

### Phase 1: Core Functionality (In Progress)

*   [x] Basic webview for voice recording.
*   [ ] Integration with a speech-to-text API.
*   [ ] Basic text insertion into the editor.

### Phase 2: Advanced Voice Commands

*   [ ] Commands for code navigation (e.g., "go to line 10", "find function foo").
*   [ ] Commands for code editing (e.g., "delete line", "copy this block").
*   [ ] Context-aware commands (e.g., "rename this variable to 'newName'").

### Phase 3: CLI Agent Integration

*   [ ] Integrate with the Gemini CLI.
*   [ ] Integrate with the Copilot CLI.
*   [ ] Allow users to seamlessly switch between coding and prompting the agents.

### Phase 4: Customization and Extensibility

*   [ ] Allow users to define their own voice commands.
*   [ ] Create an API for other extensions to integrate with "Let There Be".

## Getting Started & Development

### Prerequisites

*   [Node.js](https://nodejs.org/)
*   [Yarn](https://yarnpkg.com/)
*   [Visual Studio Code](https://code.visualstudio.com/)

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/lettherebe.git
    cd lettherebe
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Run the extension in a new VS Code window:**
    *   Press `F5` to open a new VS Code window with the extension loaded.

### Running the tests

To run the automated tests for this extension, run the following command:

```bash
yarn test
```

### Other Commands

*   **Compile the extension:**
    ```bash
    yarn compile
    ```
*   **Watch for changes and recompile:**
    ```bash
    yarn watch
    ```
*   **Package the extension for release:**
    ```bash
    yarn package
    ```

## Features

*   **Voice-to-Code**: Write and edit code in real-time using your voice.
*   **CLI Agent Control**: Directly prompt and control CLI agents like Gemini and Copilot with voice commands.
*   **Record and Playback**: Record your voice-driven coding sessions and play them back for review and sharing.

## How it Works

The `lettherebe.startRecording` command opens a webview that captures your voice commands. These commands are then transcribed and used to either edit the code in the active editor or to interact with a CLI agent.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.