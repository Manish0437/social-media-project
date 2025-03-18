
import { HiArrowSmLeft } from "react-icons/hi";
import { FaFolderOpen } from "react-icons/fa6";

import { FaCamera } from "react-icons/fa6";

import { HiMiniPhoto } from "react-icons/hi2";

import { BiSolidVideos } from "react-icons/bi";

import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import SelectedItem from "../SelectedItem/index";
import { ProfileDetailsContext } from "../../App";

import "./style.css";


const AddPost = () => {
  const [comment, setComment] = useState("");

  const [fileList, setFilesList] = useState([]);

  const [cameraList, setCameraList] = useState([]);

  const [photosList, setPhotosList] = useState([]);

  const [videoList, setVideoList] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { profileName, profilePicImage} = useContext(ProfileDetailsContext);

  const goBacktoFeeds = () => {
    navigate("/feeds", { replace: true });
  };

  const onChangeTextArea = (e) => {
    setComment(e.target.value);
  };

  const addFileToList = (file, currentList) => {
    const exists = currentList.some(
      (existingFile) =>
        existingFile.name === file.name && existingFile.size === file.size
    );

    if (!exists) {
      return [...currentList, file];
    }

    return currentList;
  };

  // const handleImageUpload = async(files) => {
  //   const uploadedImages = [];

  //   for (const file of files) {
  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("upload_preset","sm_pre_name");
  //     data.append("cloud_name","dfeyufa3x");
  //     try {
  //       const response = await fetch("https://api.cloudinary.com/v1_1/dfeyufa3x/image/upload", data);
  //       const imageUlr=response.data.url.toString();
  //       uploadedImages.push(imageUlr);
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  //   console.log("uploadedImages:",uploadedImages);
  //   return uploadedImages;
  // };

  const onChangeFileInput = async (e) => {
    const files = Array.from(e.target.files);

    let updatedList = [...fileList];

    files.forEach((file) => {
      updatedList = addFileToList(file, updatedList);
    });

    setFilesList(updatedList);

    // const previewFiles=e.target.files;
    // const previewImageArray=[]
    // const uploadPromises=Array.from(previewFiles).map((file)=>{
    //   return new Promise ((resolve)=> {
    //     const reader = new FileReader();
    //     reader.onload=(event)=> {
    //       previewImageArray.push(event.target.result);
    //       resolve();
    //     };
    //     reader.readAsDataURL(file);
    //   });
    // });
    // await Promise.all(uploadPromises);
    // setFilesList(previewImageArray);
    // handleImageUpload(previewFiles);
  };

  const onChangeCameraInput = (e) => {
    const files = Array.from(e.target.files);

    let updatedList = [...cameraList];

    files.forEach((file) => {
      updatedList = addFileToList(file, updatedList);
    });

    setCameraList(updatedList);
  };

  const onChangePhotoInput = (e) => {
    const files = Array.from(e.target.files);

    let updatedList = [...photosList];

    files.forEach((file) => {
      updatedList = addFileToList(file, updatedList);
    });

    setPhotosList(updatedList);
  };

  const onChangeVideoInput = (e) => {
    const files = Array.from(e.target.files);

    let updatedList = [...videoList];

    files.forEach((file) => {
      updatedList = addFileToList(file, updatedList);
    });

    setVideoList(updatedList);
  };

  const removeSelectedFileEle = (index) => {
    const updatedFiles = [...fileList];

    updatedFiles.splice(index, 1);

    setFilesList(updatedFiles);
  };

  const removeSelectedCameraEle = (index) => {
    const updatedFiles = [...cameraList];

    updatedFiles.splice(index, 1);

    setCameraList(updatedFiles);
  };

  const removeSelectedPhotoEle = (index) => {
    const updatedFiles = [...photosList];

    updatedFiles.splice(index, 1);

    setPhotosList(updatedFiles);
  };

  const removeSelectedVideoEle = (index) => {
    const updatedFiles = [...videoList];

    updatedFiles.splice(index, 1);

    setVideoList(updatedFiles);
  };





  const uploadToCloudinary = async (files) => {
    const uploadedUrls = [];
    
    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "sm_pre_name"); // Your preset name
      data.append("cloud_name", "dfeyufa3x");      // Your cloud name
      
      try {
        let resourceType = 'image'; // Default
      
        if (file.type.startsWith('video/')) {
          resourceType = 'video';
        } else if (
          file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'text/plain' ||
          !file.type.startsWith('image/')
        ) {
          resourceType = 'raw';
        }
        
        const uploadUrl=`https://api.cloudinary.com/v1_1/dfeyufa3x/${resourceType}/upload`;
        const response = await fetch(
          uploadUrl,
          {
            method: "POST",
            body: data,
          }
        );
        
        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }
        
        const responseData = await response.json();
        // Store the secure URL from Cloudinary response
        uploadedUrls.push({
          url: responseData.secure_url,
          publicId: responseData.public_id,
          resourceType: responseData.resource_type, // 'image' or 'video'
          originalName: file.name,
          format: responseData.format,
          fileType: file.type,
        });
        
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    
    console.log("uploadedUrls:",uploadedUrls);
    return uploadedUrls;
  };
  














  const createPostMethod = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Combine all files

      const allFiles = [
        ...fileList,

        ...cameraList,

        ...photosList,

        ...videoList,
      ];

      console.log("All files to upload:", allFiles);

      if (allFiles.length === 0) {
        alert("Please select at least one file to upload");

        setIsSubmitting(false);

        return;
      }


      const cloudinaryUrls = await uploadToCloudinary(allFiles);

      const postData = {
        userName: profileName||"Username",
        userImage: profilePicImage||"default.jpg",
        createdAt: new Date().toISOString(),
        comment: comment,
        files: cloudinaryUrls.map(item => item.url)// Send just the URLs to your backend
      };
  
      console.log("Post data:", postData);

      // Post creation request to your backend
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Post created successfully:", data);
  













      // Create FormData and append files and metadata

      // const formData = new FormData();

      // // Add metadata

      // formData.append("userName", "User");

      // formData.append("userImage", "default.jpg");

      // formData.append("comment", comment);

      // // Add files

      // allFiles.forEach((file) => {
      //   formData.append("files", file);
      // });

      // formData.append("file", allFiles);
      // formData.append("upload_preset", "sm_pre_name");
      // formData.append("cloud_name", "dfeyufa3x");

      // console.log("formData:", formData);

      // // Post creation request to the correct endpoint

      // const response = await fetch("http://localhost:8080/api/files/upload", {
      //   method: "POST",

      //   body: formData,
      // });

      // if (!response.ok) {
      //   const errorText = await response.text();

      //   console.error("Server response:", errorText);

      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const data = await response.json();

      // console.log("Post created successfully:", data);

      // Reset form

      setComment("");

      setFilesList([]);

      setCameraList([]);

      setPhotosList([]);

      setVideoList([]);

      // Navigate to feeds

      navigate("/feeds", { replace: true });
    } catch (error) {
      console.error("Error creating post:", error);

      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

          {fileList.length > 0 && (
            <fieldset className="selected-files">
              <legend>Selected Files</legend>

              {fileList.map((file, index) => (
                <SelectedItem
                  key={`file-${index}`}
                  file={file}
                  index={index}
                  removeItem={removeSelectedFileEle}
                />
              ))}
            </fieldset>
          )}

          <br />

          {cameraList.length > 0 && (
            <fieldset className="selected-files">
              <legend>Selected Camera Files</legend>

              {cameraList.map((file, index) => (
                <SelectedItem
                  key={`camera-${index}`}
                  file={file}
                  index={index}
                  removeItem={removeSelectedCameraEle}
                />
              ))}
            </fieldset>
          )}

          <br />

          <button
            type="submit"
            className="create-button"
            onClick={createPostMethod}
            disabled={isSubmitting}
          >
            {isSubmitting ? "CREATING..." : "CREATE"}
          </button>
        </form>
        <form className="mobile-add-post-form">
           <textarea
             id="mobile-comment"
             rows="4"
             cols="50"
             placeholder="What's on your mind?"
             value={comment}
             onChange={onChangeTextArea}
             required
           ></textarea>
           <br />
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
           {photosList.length > 0 && (
             <fieldset className="selected-files">
               <legend>Selected Photos</legend>
               {photosList.map((file, index) => (
                 <SelectedItem
                   key={`photo-${index}`}
                   file={file}
                   index={index}
                   removeItem={removeSelectedPhotoEle}
                 />
               ))}
             </fieldset>
           )}
           <br />
           {videoList.length > 0 && (
             <fieldset className="selected-files">
               <legend>Selected Videos</legend>
               {videoList.map((file, index) => (
                 <SelectedItem
                   key={`video-${index}`}
                   file={file}
                   index={index}
                   removeItem={removeSelectedVideoEle}
                 />
               ))}
             </fieldset>
           )}
           <br />
           {cameraList.length > 0 && (
             <fieldset className="selected-files">
               <legend>Selected Camera Files</legend>
               {cameraList.map((file, index) => (
                 <SelectedItem
                   key={`mobile-camera-${index}`}
                   file={file}
                   index={index}
                   removeItem={removeSelectedCameraEle}
                 />
               ))}
             </fieldset>
           )}
           <br />
           <button
             type="submit"
             className="create-button"
             onClick={createPostMethod}
             disabled={isSubmitting}
           >
             {isSubmitting ? "CREATING..." : "CREATE"}
           </button>
         </form>
      </main>
    </div>
  );
};

export default AddPost;
