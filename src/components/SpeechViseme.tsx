import React, { useEffect } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const SpeechViseme = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const startSpeaking = () => {
    setIsSpeaking(true);

    // Mock viseme events for testing
    const mockVisemes = [
      { visemeId: 3, offset: 0 },
      { visemeId: 17, offset: 200 },
      { visemeId: 7, offset: 400 },
      { visemeId: 12, offset: 600 },
      { visemeId: 3, offset: 800 },
    ];

    console.log("Using mock viseme data for testing");
    mockVisemes.forEach((viseme, index) => {
      setTimeout(() => {
        console.log(
          "Viseme ID:",
          viseme.visemeId,
          "Audio Offset:",
          viseme.offset,
          "ms"
        );
      }, viseme.offset);
    });

    // Comment out the line below to use Azure SDK instead of mock data
    // return;

    // Azure SDK implementation
    const speechKey = "--------------";
    const serviceRegion = "southeastasia";

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      speechKey,
      serviceRegion
    );
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    speechConfig.setProperty(
      SpeechSDK.PropertyId.SpeechServiceConnection_SynthVoice,
      "en-US-JennyNeural"
    );
    speechConfig.setProperty("SpeechServiceResponse_RequestViseme", "true");

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(
      speechConfig,
      audioConfig
    );

    synthesizer.visemeReceived = (s, e) => {
      console.log(
        "Viseme ID:",
        e.visemeId,
        "Audio Offset:",
        e.audioOffset / 10000,
        "ms"
      );
    };

    synthesizer.synthesisStarted = () => {
      console.log("Synthesis started");
    };

    synthesizer.synthesisCompleted = () => {
      console.log("Synthesis completed");
      setIsSpeaking(false);
    };

    synthesizer.speakTextAsync(
      "Hello! This is an example of viseme sync with audio output.",
      (result) => {
        if (
          result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          console.log("Speech synthesis succeeded.");
        } else {
          console.error("Speech synthesis failed:", result.errorDetails);
          console.error("Reason:", result.reason);
        }
        synthesizer.close();
      }
    );
  };

  return (
    <div>
      <h2>Azure Speech with Viseme Events</h2>
      <p>
        Click the button below to start speech synthesis with audio and viseme
        events
      </p>
      <button
        onClick={startSpeaking}
        disabled={isSpeaking}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: isSpeaking ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isSpeaking ? "not-allowed" : "pointer",
        }}
      >
        {isSpeaking ? "Speaking..." : "Start Speech Synthesis"}
      </button>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Check the console for viseme output and listen for audio
      </p>
    </div>
  );
};

export default SpeechViseme;
