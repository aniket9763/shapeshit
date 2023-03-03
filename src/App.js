import React, { useState } from "react";
import axios from "axios";
import './App.css';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [imageData, setImageData] = useState("");
  const [videoData, setVideoData] = useState("");

  const handleSearch = async () => {
    const data = {
      prompt: searchTerm,
      negative_prompt: "string",
      scheduler: "EulerAncestralDiscreteScheduler",
      image_height: 512,
      image_width: 512,
      num_images: 1,
      guidance_scale: 7,
      steps: 50,
      seed: 42,
    };

    try {
      const response = await axios.post("http://localhost:5000/text2img", data);

      const base64Image = response.data.images;
      setImageData(base64Image[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoData(reader.result);
    };
  };

  return (
    <div className="search-container">
      
       <div className="search-heading">Start your stable diffusion adventure now!</div>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button id="searchButton" onClick={handleSearch} className="search-button">
        Search
      </button>
      <div id="imagecontainer">
        {imageData && <img src={`data:image/png;base64,${imageData}`} alt="Generated" />}
      </div>
      <div className="file-upload-container">
        <input type="file" id="fileInput" className="file-upload" onChange={handleFileInputChange} />
      </div>
      <div className="video-container">
        {videoData && (
          <video width="320" height="240" controls>
            <source src={videoData} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}

export default SearchInput;


