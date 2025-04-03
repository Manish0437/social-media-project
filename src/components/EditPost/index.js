import { HiArrowSmLeft } from "react-icons/hi";
import { FaFolderOpen, FaCamera } from "react-icons/fa6";
import { HiMiniPhoto } from "react-icons/hi2";
import { BiSolidVideos } from "react-icons/bi";

import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectedItem from "../SelectedItem/index";
import { ProfileDetailsContext } from "../../App";

import "./style.css";
import { FaRemoveFormat } from "react-icons/fa";

const EditPost = () => {
  const [comment, setComment] = useState("");
  const [fileList, setFilesList] = useState([]);
  const [cameraList, setCameraList] = useState([]);
  const [photosList, setPhotosList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingFiles, setExistingFiles] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { profileName, profilePicImage } = useContext(ProfileDetailsContext);

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Set initial form data
        setComment(data.comment || "");

        // Convert existing file URLs to File-like objects
        const convertedFiles = data.files.map((fileUrl, index) => ({
          name: `existing-file-${index}`,
          url: fileUrl,
          isExisting: true,
        }));

        setExistingFiles(convertedFiles);
        console.log("Existing files:", convertedFiles);
      } catch (error) {
        console.error("Error fetching post data:", error);
        alert("Failed to load post data. Please try again.");
      }
    };

    fetchPostData();
  }, [id]);

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


  const handleFileInputChange = (e, setList) => {
    const files = Array.from(e.target.files);
    
    setList(prevList => {
      let updatedList = [...prevList];
      
      files.forEach((file) => {
        // Check if file already exists in the list
        const exists = updatedList.some(
          (existingFile) =>
            existingFile.name === file.name && 
            (existingFile.size === file.size || existingFile.url === file.url)
        );
  
        if (!exists) {
          updatedList.push(file);
        }
      });
  
      return updatedList;
    });
  };



    const removeFile = (index, listSetter) => {
        listSetter(prevList => {
        const updatedFiles = [...prevList];
        updatedFiles.splice(index, 1);
        return updatedFiles;
        });
    };

  

  const uploadToCloudinary = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      // Skip existing files that already have URLs
      if (file.isExisting && file.url) {
        uploadedUrls.push({ url: file.url });
        continue;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "sm_pre_name");
      data.append("cloud_name", "dfeyufa3x");

      try {
        let resourceType = "image";

        if (file.type.startsWith("video/")) {
          resourceType = "video";
        } else if (
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "text/plain" ||
          !file.type.startsWith("image/")
        ) {
          resourceType = "raw";
        }

        const uploadUrl = `https://api.cloudinary.com/v1_1/dfeyufa3x/${resourceType}/upload`;
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        uploadedUrls.push({
          url: responseData.secure_url,
          publicId: responseData.public_id,
          resourceType: responseData.resource_type,
          originalName: file.name,
          format: responseData.format,
          fileType: file.type,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    return uploadedUrls;
  };

  const updatePostMethod = async (e) => {
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
        ...existingFiles,
      ];

      if (allFiles.length === 0) {
        alert("Please select at least one file to upload");
        setIsSubmitting(false);
        return;
      }

      const cloudinaryUrls = await uploadToCloudinary(allFiles);

      const postData = {
        userName: profileName || "Username",
        userImage: profilePicImage || "default.jpg",
        updatedAt: new Date().toISOString(),
        comment: comment,
        files: cloudinaryUrls.map((item) => item.url),
      };

      // Update post request to your backend
      const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    //   alert("Post updated successfully!");

      // Reset form and navigate
      setComment("");
      setFilesList([]);
      setCameraList([]);
      setPhotosList([]);
      setVideoList([]);

      navigate("/profile", { replace: true });
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayExistingFiles=()=> {
    console.log("Existing files inside container:", existingFiles);
  }

  return (
    <div className="add-post-container">
      <header className="add-post-header">
        <button className="goback-button" onClick={goBacktoFeeds}>
          <HiArrowSmLeft />
        </button>
        <h1>Edit Post</h1>
      </header>

      <main>
        <form className="desktop-add-post-form" onSubmit={updatePostMethod}>
          <textarea
            id="comment"
            rows="4"
            cols="50"
            placeholder="Edit your post..."
            required
            onChange={onChangeTextArea}
            value={comment}
          ></textarea>

          <label htmlFor="fileimage">
            <FaFolderOpen className="file-icon" /> Choose the file
          </label>
          <input
            type="file"
            id="fileimage"
            className="file-input"
            accept="*/*"
            multiple
            onChange={(e) => handleFileInputChange(e, setFilesList)}
          />

          <label htmlFor="deskcamera">
            <FaCamera className="camera-icon" /> Camera
          </label>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            className="camera-input"
            id="deskcamera"
            multiple
            onChange={(e) => handleFileInputChange(e, setCameraList)}
          />

          {/* Display selected files */}
          {(existingFiles.length > 0 ||
            fileList.length > 0 ||
            cameraList.length > 0 ||
            photosList.length > 0 ||
            videoList.length > 0) && (
            <fieldset className="selected-files">
              <legend>Selected Files</legend>
              {displayExistingFiles()}
              {existingFiles.map((file, index) => (
                <SelectedItem
                  key={`existing-${index}`}
                  file={file}
                  index={index}
                  removeItem={() => removeFile(index, setExistingFiles)}
                />
              ))}
              {fileList.map((file, index) => (
                <SelectedItem
                  key={`file-${index}`}
                  file={file}
                  index={index}
                  removeItem={() => removeFile(index, setFilesList)}
                />
              ))}
              {cameraList.map((file, index) => (
                <SelectedItem
                  key={`camera-${index}`}
                  file={file}
                  index={index}
                  removeItem={() => removeFile(index, setCameraList)}
                />
              ))}
              {photosList.map((file, index) => (
                <SelectedItem
                  key={`photo-${index}`}
                  file={file}
                  index={index}
                  removeItem={() => removeFile(index, setPhotosList)}
                />
              ))}
              {videoList.map((file, index) => (
                <SelectedItem
                  key={`video-${index}`}
                  file={file}
                  index={index}
                  removeItem={() => removeFile(index, setVideoList)}
                />
              ))}
            </fieldset>
          )}

          <button
            type="submit"
            className="create-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "UPDATING..." : "SAVE"}
          </button>
        </form>
        <form className="mobile-add-post-form">
          <textarea
            id="mobile-comment"
            rows="4"
            cols="50"
            placeholder="Edit your post..."
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
            onChange={(e)=>handleFileInputChange(e,setPhotosList)}
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
            onChange={(e)=>handleFileInputChange(e,setVideoList)}
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
            onChange={(e)=>handleFileInputChange(e,setCameraList)}
            multiple
          />
          <br />
          {/* Existing files display for mobile */}
          {existingFiles.length > 0 && (
            <fieldset className="selected-files">
              <legend>Existing Files</legend>
              {existingFiles.map((file, index) => (
                <SelectedItem
                  key={`mobile-existing-${index}`}
                  file={file}
                  index={index}
                  removeItem={() => {
                    removeFile(index, setExistingFiles);
                  }}
                />
              ))}
            </fieldset>
          )}

          {photosList.length > 0 && (
            <fieldset className="selected-files">
              <legend>Selected Photos</legend>
              {photosList.map((file, index) => (
                <SelectedItem
                  key={`photo-${index}`}
                  file={file}
                  index={index}
                  removeItem={()=>removeFile(index,setPhotosList)}
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
                  removeItem={()=>removeFile(index,setVideoList)}
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
                  removeItem={()=>removeFile(index,setCameraList)}
                />
              ))}
            </fieldset>
          )}
          <br />
          <button
            type="submit"
            className="create-button"
            onClick={updatePostMethod}
            disabled={isSubmitting}
          >
            {isSubmitting ? "UPDATING..." : "SAVE"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditPost;