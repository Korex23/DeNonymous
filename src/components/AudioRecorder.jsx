import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordedTime, setRecordedTime] = useState(0);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const controlBarRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
          setRecordedTime((prevTime) => prevTime + event.data.size);
          //   updateControlBar();
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(audioBlob);
        });

        mediaRecorder.start();
        setIsRecording(true);
        setRecordedTime(0); // Reset recorded time when starting a new recording
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  //   const updateControlBar = () => {
  //     if (controlBarRef.current) {
  //       const controlBarWidth = `${(recordedTime / 1000) * 100}%`; // Calculate control bar width based on recorded time (in milliseconds)
  //       controlBarRef.current.style.width = controlBarWidth;
  //     }
  //   };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

      {audioBlob && (
        <div>
          <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} controls />
          <button onClick={playAudio}>Play Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
