import { HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa6";
import { HiMiniPhoto } from "react-icons/hi2";
import { BiSolidVideos } from "react-icons/bi";
import { useEffect, useState } from "react";
import SelectedItem from "../SelectedItem/index";

import "./style.css";

const AddPost = () => {
  const [comment, setComment] = useState("");
  const [fileList, setFilesList] = useState([]);
  const [cameraList, setCameraList] = useState([]);
  const [photosList, setPhotosList] = useState([]);
  const [videoList, setVideoList] = useState([]);

  const navigate = useNavigate();

  const goBacktoFeeds = () => {
    navigate("/feeds", { replace: true });
  };

  const onChangeTextArea = (e) => {
    setComment(e.target.value);
    console.log("comment:", comment);
  };

  const onChangeFileInput = (e) => {
    const files = Array.from(e.target.files);
    const uniqueFiles = [...fileList];

    files.forEach((file) => {
      if (
        !uniqueFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
      ) {
        uniqueFiles.push(file);
      }
    });

    setFilesList(uniqueFiles);
  };

  const onChangeCameraInput = (e) => {
    const files = Array.from(e.target.files);
    const uniqueCameraFiles = [...cameraList];
    files.forEach((file) => {
      if (
        !uniqueCameraFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
      ) {
        uniqueCameraFiles.push(file);
      }
    });

    setCameraList(uniqueCameraFiles);
  };

  const onChangePhotoInput = (e) => {
    const files = Array.from(e.target.files);
    console.log("changed photo input",e.target.value);
    console.log("files",files);
    const uniquePhotoFiles = [...photosList];

    files.forEach((file) => {
      if (
        !uniquePhotoFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
      ) {
        uniquePhotoFiles.push(file);
      }
    });
    console.log("uniquePhotoFiles",uniquePhotoFiles);
    setPhotosList(uniquePhotoFiles);
  };

  const onChangeVideoInput = (e) => {
    const files = Array.from(e.target.files);
    const uniqueVideoFiles = [...videoList];

    files.forEach((file) => {
      if (
        !uniqueVideoFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        )
      ) {
        uniqueVideoFiles.push(file);
      }
    });

    setVideoList(uniqueVideoFiles);
  };

  useEffect(() => {
    console.log("fileList:", fileList);
    console.log("cameraList:", cameraList);
    console.log("photosList:", photosList);
    console.log("videoList:", videoList);
  }, [fileList, cameraList, photosList, videoList]);

  const removeSelectedFileEle = (index) => {
    const uniqueFiles = [...fileList];
    uniqueFiles.splice(index, 1);
    setFilesList(uniqueFiles);
  }; 

  const removeSelectedCameraEle = (index) => {
    const uniqueCameraFiles = [...cameraList];
    uniqueCameraFiles.splice(index, 1);
    setCameraList(uniqueCameraFiles);
  };

  const removeSelectedPhotoEle = (index) => {
    const uniquePhotoFiles = [...photosList];
    uniquePhotoFiles.splice(index, 1);
    setPhotosList(uniquePhotoFiles);
  };

  const removeSelectedVideoEle = (index) => {
    const uniqueVideoFiles = [...videoList];
    uniqueVideoFiles.splice(index, 1);
    setVideoList(uniqueVideoFiles);
  };


  const createPostMethod = (e) => {
    e.preventDefault();
    
    const finalFileList=fileList.map((file)=>{
      return file.name
    });
    console.log(finalFileList);
    const finalCameraList=cameraList.map((file)=>{
      return file.name
    });
    console.log(finalCameraList); 
    const finalPhotosList=photosList.map((file)=>{
      return file.name
    });
    console.log(finalPhotosList);
    const finalVideoList=videoList.map((file)=>{
      return file.name
    });
    console.log(finalVideoList);



    const post = {
      comment: comment,
      files: [...finalFileList, ...finalCameraList, ...finalPhotosList, ...finalVideoList],
      // Add other required fields if needed
      userName: "User", // Optional: Add default user information
      userImage: "default.jpg",
      likes: 0
    };
    
    
    const backendApi="http://localhost:8080/api";
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
      },
      body:JSON.stringify(post),
      mode: "cors"
    };
    setComment("");
    setFilesList([]);
    setCameraList([]);
    setPhotosList([]);
    setVideoList([]);

    fetch(`${backendApi}/posts`,options)
    .then(response=>response.json())
    .then(data=>{
      console.log("data:",data);
      navigate("/feeds",{replace:true});
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  return (
    <div className="add-post-container">
      <header className="add-post-header">
        <button className="goback-button" onClick={goBacktoFeeds}>
          <HiArrowSmLeft />
        </button>
        <h1>New Post</h1>
      </header>
      <main>
        <form className="desktop-add-post-form">
          <textarea
            id="comment"
            rows="4"
            cols="50"
            placeholder="What's on your mind?"
            required
            onChange={onChangeTextArea}
            value={comment}
          ></textarea>
          <br />
          <label htmlFor="fileimage">
            <FaFolderOpen className="file-icon" /> Choose the file
          </label>
          <input
            type="file"
            id="fileimage"
            className="file-input"
            accept="*/*"
            multiple
            onChange={onChangeFileInput}
          />
          <br />
          <label htmlFor="deskcamera">
            <FaCamera className="camera-icon" /> Camera
          </label>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            className="camera-input"
            id="deskcamera"
            onChange={onChangeCameraInput}
            multiple
          />

          {fileList.length !== 0 && (
            <fieldset className="selected-files">
              <legend>Selected Files</legend>
              {fileList.map((file, index) => {
                return (
                  <SelectedItem
                    key={index}
                    file={file}
                    index={index}
                    removeItem={removeSelectedFileEle}
                  />
                );
              })}
            </fieldset>
          )}
          <br />

          {cameraList.length !== 0 && (
            <fieldset className="selected-files">
              <legend>Selected Camera Files</legend>
              {cameraList.map((file, index) => {
                return (
                  <SelectedItem
                    key={index}
                    file={file}
                    index={index}
                    removeItem={removeSelectedCameraEle}
                  />
                );
              })}
            </fieldset>
          )}
          <br />

          <button type="submit" className="create-button" onClick={createPostMethod}>
            CREATE
          </button>
        </form>
        <form className="mobile-add-post-form">
          <textarea
            id="comment"
            rows="4"
            cols="50"
            placeholder="What's on your mind?"
            value={comment}
            onChange={onChangeTextArea}
            required
          ></textarea>

          <label htmlFor="photo">
            <HiMiniPhoto className="photo-icon" /> Photos
          </label>
          <input
            type="file"
            id="photo"
            className="photo-input"
            accept="image/*"
            multiple
            onChange={onChangePhotoInput}
          />
          <br />

          <label htmlFor="video">
            <BiSolidVideos className="video-icon" /> Video
          </label>
          <input
            type="file"
            accept="video/*"
            capture="camera"
            id="video"
            className="video-input"
            onChange={onChangeVideoInput}
            multiple
          />
          <br />

          <label htmlFor="mobilecamera">
            <FaCamera className="mobile-camera-icon" /> Camera
          </label>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            className="mobile-camera-input"
            id="mobilecamera"
            onChange={onChangeCameraInput}
            multiple
          />

          <br />

          {photosList.length !== 0 && (
            <fieldset className="selected-files">
              <legend>Selected Photos</legend>
              {photosList.map((file, index) => {
                return (
                  <SelectedItem
                    key={index}
                    file={file}
                    index={index}
                    removeItem={removeSelectedPhotoEle}
                  />
                );
              })}
            </fieldset>
          )}
          <br />
          {videoList.length !== 0 && (
            <fieldset className="selected-files">
              <legend>Selected Videos</legend>
              {videoList.map((file, index) => {
                return (
                  <SelectedItem
                    key={index}
                    file={file}
                    index={index}
                    removeItem={removeSelectedVideoEle}
                  />
                );
              })}
            </fieldset>
          )}

          <br />
          {cameraList.length !== 0 && (
            <fieldset className="selected-files">
              <legend>Selected Camera Files</legend>
              {cameraList.map((file, index) => {
                return (
                  <SelectedItem
                    key={index}
                    file={file}
                    index={index}
                    removeItem={removeSelectedCameraEle}
                  />
                );
              })}
            </fieldset>
          )}
          <br />

          <button type="submit" className="create-button" onClick={createPostMethod}>
            CREATE
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddPost;