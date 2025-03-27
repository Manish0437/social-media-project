import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowSmLeft } from "react-icons/hi";
import { HiHeart } from "react-icons/hi";
import './style.css';

const ViewPost = () => {
  const { id } = useParams(); // Using useParams hook to get the dynamic route parameter
  const [postDetails, setPostDetails] = useState(null);
  const navigate = useNavigate();

  const bgClrList=[
    "#C2B7E9",
    "#ADDEDF",
    "#C2F0BD",
    "#FFFDB4",
    "#FBD8A2",
    "#EEBAB9",
    "#B3EDDB",
    "#D1F4ED",
    "#F6E6CC",
    "#F1D2CD",
    "#A2BDE3"
    ];
  const randomBgClr=bgClrList[Math.floor(Math.random()*bgClrList.length)];

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts/' + id);
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        const data = await response.json();
        setPostDetails(data); // Update state with fetched data
      } catch (err) {
        console.log(err.message); // Update state with error message
      }
    };

    fetchPostDetails();
  }, [id]);

  const goBackFeeds = () => {
    navigate('/feeds');
  }

  const renderPostFiles = () => {
    if (!postDetails || !postDetails.files || !postDetails.files.length) return null;
    
    return postDetails.files.map((file, index) => {
      // Determine file type based on the URL extension
      const isVideo = file.toLowerCase().endsWith('.mp4') || 
                     file.toLowerCase().endsWith('.mov') || 
                     file.toLowerCase().endsWith('.webm');
      
      if (isVideo) {
        return (
          <div className="post-file video-container-vp" key={index}>
            <video controls className='image-file'>
              <source src={file} type="video/mp4"/>
              Your browser does not support video playback.
            </video>
          </div>
        );
      } else {
        // Assume it's an image if not video
        return (
          <div className="post-file image-container-vp" key={index}>
            <img src={file} alt={`Attachment ${index + 1}`} className='video-file'/>
          </div>
        );
      }
    });
  }
  return (
    <div className="view-post">
      {postDetails ? (
        <div className="post">
          <div className="post-header">
            <button onClick={goBackFeeds} className='go-back-button'><HiArrowSmLeft /></button>
            <h2>View Post</h2>
          </div>
          <div className="post-body" style={{backgroundColor: randomBgClr}}>
            <div className='user-info-vp'>
              <img className="profile-pic-vp" src={postDetails.userImage} alt={postDetails.userName} />
              <h2>{postDetails.userName}</h2>
            </div>
            <p>{postDetails.comment}</p>
            <div className='files-cont-vp'>
              {renderPostFiles()}
            </div>
            <p><HiHeart id="like-icon-vp" />{postDetails.likes}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewPost;