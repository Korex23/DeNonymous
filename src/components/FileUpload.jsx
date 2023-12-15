import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const maxSize = 20 * 1024 * 1024; // 20MB

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.size <= maxSize) {
      setFile(selectedFile);
      setError(""); // Reset error state

      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    } else {
      // Handle file size error
      setFile(null);
      setError("File size exceeds the maximum limit.");
      console.log("File size exceeds the maximum limit.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the file to the server
    // ...
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*, video/*, audio/*"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div>
          <h2>Preview:</h2>
          {file.type.startsWith("image") && <img src={preview} alt="Preview" />}
          {file.type.startsWith("video") && <video src={preview} controls />}
          {file.type.startsWith("audio") && <audio src={preview} controls />}
        </div>
      )}
      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
