// import { BsPlusLg } from "react-icons/bs";
// import {useNavigate} from 'react-router-dom';
// import { HiArrowSmLeft } from "react-icons/hi";
// import { useContext, useEffect, useState } from 'react';
// import { ProfileDetailsContext } from "../../App";
// import './style.css';
// const Profile=()=>{
//     const navigate = useNavigate();

//     const { profileName, profileBio, profilePicImage, profilePicBgImg } = useContext(ProfileDetailsContext);
    
//     const defaultBgImage = './login-images/profile-bg-1.jpg';
//     const backgroundImageStyle = profilePicBgImg || defaultBgImage;


//     const handleAddPost = () => {
//         navigate("/add-post");
//     }

//     const onEditProfileBtn = () => {
//         navigate("/editProfile");
//     }


//     return (
//         <div className="profile-container">
//             <div className="profile-top-container" style={{backgroundImage:`url(${backgroundImageStyle})`}}>
//                 <button className="back-button" onClick={()=>navigate("/feeds")}><HiArrowSmLeft /></button>
                
//             </div>
//             <img src={profilePicImage || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} className="profile-image" alt="profile-img"/>
//             <button className="edit-profile-button" onClick={onEditProfileBtn}>Edit Profile</button>
//             <div className="profile-details">
//                 <h2 className="profile-name">{profileName || 'Username'}</h2>
//                 <p className="profile-bio">{profileBio || 'Bio'}</p>
//                 <h4>My Posts</h4>
//                 <div className="my-posts-container">
                    
//                 </div>
//                 <button type="button" className="add-post-btn" onClick={handleAddPost}>
//                     <BsPlusLg />
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Profile;


























































































import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { HiArrowSmLeft } from "react-icons/hi";
import { useContext, useEffect, useState,useCallback} from 'react';
import { ProfileDetailsContext } from "../../App";
import './style.css';

const Profile = () => {
    const navigate = useNavigate();
    const { profileName, profileBio, profilePicImage, profilePicBgImg } = useContext(ProfileDetailsContext);
    const defaultBgImage = './login-images/profile-bg-1.jpg';
    const backgroundImageStyle = profilePicBgImg || defaultBgImage;

    const [myPosts, setMyPosts] = useState([]);

    const handleAddPost = () => {
        navigate("/add-post");
    }

    const onEditProfileBtn = () => {
        // Store the current profile info in localStorage before navigating to edit profile
        localStorage.setItem("previousProfileName", profileName);
        localStorage.setItem("previousProfilePicImage", profilePicImage);
        
        navigate("/editProfile");
    }

    const callMyPosts = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8080/api/posts");
            const allPosts = await response.json();
            const filteredPosts = allPosts.filter(post => post.userName === profileName);
            setMyPosts(filteredPosts);
            console.log("filteredPosts:", filteredPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [profileName]);

    useEffect(() => {
        callMyPosts();
    }, [callMyPosts]);


    return (
        <div className="profile-container">
            <div className="profile-top-container" style={{backgroundImage:`url(${backgroundImageStyle})`}}>
                <button className="back-button" onClick={()=>navigate("/feeds")}><HiArrowSmLeft /></button>
            </div>
            <img src={profilePicImage || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} className="profile-image" alt="profile-img"/>
            <button className="edit-profile-button" onClick={onEditProfileBtn}>Edit Profile</button>
            <div className="profile-details">
                <h2 className="profile-name">{profileName || 'Username'}</h2>
                <p className="profile-bio">{profileBio || 'Bio'}</p>
                <h4>My Posts</h4>
                <div className="my-posts-container">
                {myPosts.length > 0 ? (
                        myPosts.map(post => (
                            <div key={post.id} className="post-item">
                                {post.files.map(eachFile => (
                                    eachFile.endsWith('jpg') || eachFile.endsWith('jpeg') || eachFile.endsWith('png') ? (
                                        <img key={eachFile} src={eachFile} className="myposts-images" alt="myposts-image" />
                                    ) : eachFile.endsWith("mp4") ? (
                                        <video key={eachFile} src={eachFile} controls className="myposts-videos"></video>
                                    ) : null
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
                <button type="button" className="add-post-btn" onClick={handleAddPost}>
                    <BsPlusLg />
                </button>
            </div>
        </div>
    )
}

export default Profile;