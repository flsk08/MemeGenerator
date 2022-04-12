import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";

import TextInput from "./components/TextInput";
import UploadImage from "./components/UploadImage";

export default function App() {
  const [start, setStart] = useState(false);
  const [meme, setMeme] = useState();
  const [randomImg, setRandomImg] = useState();
  const [userInput, setUserInput] = useState({ top: "", bottom: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImg, setUserImg] = useState(false);

  // console.log(userInput);

  useEffect(() => {
    const getMemes = async () => {
      try {
        const resp = await axios.get("https://api.imgflip.com/get_memes");
        setMeme(resp.data.data.memes);
        // console.log(resp.data.data.memes);
      } catch (err) {
        console.log(err);
      }
    };
    getMemes();
  }, []);

  const changeImg = () => {
    setRandomImg(meme[Math.floor(Math.random() * meme.length)].url);
    setUserInput({ top: "", bottom: "" });
  };

  const handleStart = () => {
    if (start === false) {
      setStart(true);
      setRandomImg(meme[Math.floor(Math.random() * meme.length)].url);
      setUserInput({ top: "", bottom: "" });
    }
  };

  const handleUserImgUpload = () => {
    if (userImg === false) {
      setUserImg(true);
      setUserInput({ top: "", bottom: "" });
    }
  };

  return (
    <div className="App">
      <h1>Meme Generator</h1>

      <div className="input">
        {start && (
          <TextInput
            setUserInput={setUserInput}
            userInput={userInput}
            userImg={userImg}
          />
        )}
      </div>
      {start && <p>drag & drop the text to your liking</p>}
      <div className="btn">
        {start && (
          <UploadImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            userImg={userImg}
            setUserImg={setUserImg}
            setUserInput={setUserInput}
          />
        )}
        {!start && <button onClick={handleStart}>CREATE A MEME</button>}
        {start && !userImg && <button onClick={changeImg}>CHANGE IMAGE</button>}
        {start && !userImg && (
          <button
            onClick={() => {
              // setRandomImg(null);
              setUserInput({ top: "", bottom: "" });
            }}
          >
            DELETE TEXT
          </button>
        )}
        {start && !userImg && (
          <button onClick={handleUserImgUpload}>UPLOAD IMAGE</button>
        )}
      </div>

      <div className="memeImg">
        {!userImg && <img src={randomImg} alt="" />}
        <Draggable>
          <div className="top">{userInput.top.toUpperCase()}</div>
        </Draggable>
        <Draggable>
          <div className="bottom">{userInput.bottom.toUpperCase()}</div>
        </Draggable>
      </div>
    </div>
  );
}
