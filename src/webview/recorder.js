const vscode = acquireVsCodeApi();

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const statusParagraph = document.getElementById("status");

let recognition;
let isRecording = false;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    isRecording = true;
    statusParagraph.textContent = "Recording...";
    startButton.disabled = true;
    stopButton.disabled = false;
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      vscode.postMessage({
        command: "insertText",
        text: finalTranscript,
      });
    }
    // You can also display interimTranscript if needed
    // statusParagraph.textContent = `Recording... ${interimTranscript}`;
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    statusParagraph.textContent = `Error: ${event.error}`;
    isRecording = false;
    startButton.disabled = false;
    stopButton.disabled = true;
  };

  recognition.onend = () => {
    if (isRecording) {
      // If recording was stopped by an error or external factor, try to restart
      // This can happen if the microphone is disconnected or permissions change
      recognition.start();
    } else {
      statusParagraph.textContent = "Idle";
      startButton.disabled = false;
      stopButton.disabled = true;
    }
  };

  startButton.onclick = () => {
    recognition.start();
  };

  stopButton.onclick = () => {
    recognition.stop();
    isRecording = false;
  };
} else {
  statusParagraph.textContent =
    "Speech recognition not supported in this browser.";
  startButton.disabled = true;
  stopButton.disabled = true;
}