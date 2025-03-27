// import { HiPencil, HiArrowSmLeft } from "react-icons/hi";
// import { useState,useEffect,useContext} from 'react';
// import { useNavigate } from "react-router-dom";
// import './style.css';
// import { ProfileDetailsContext } from "../../App";
// const EditProfile=()=>{

//     const defaultBgImage='./login-images/profile-bg-1.jpg';

//     const [profileUsername,setProfileUsername]=useState('');
//     const [profileBio,setProfileBio]=useState('');
//     const [profilePicImage,setProfilePicImage]=useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg');
//     const [profilePicBgImg,setProfilePicBgImg]=useState(defaultBgImage);
//     const navigate=useNavigate();

//     // const profileData=useContext(ProfileDetailsContext);



//     // useEffect(() => {
//     //     if (profileData) {
//     //         setProfileUsername(profileData.profileName || '');
//     //         setProfileBio(profileData.profileBio || '');
//     //     }
//     // }, [profileData]);


//     const { profileName, profileBio: contextProfileBio, profilePicImage: contextProfilePic,profilePicBgImg:contextProfilePicBg ,setProfileData } = useContext(ProfileDetailsContext);

//     useEffect(() => {
//         // Set initial values from context
//         setProfileUsername(profileName || '');
//         setProfileBio(contextProfileBio || '');
//         if (contextProfilePic) {
//             setProfilePicImage(contextProfilePic);
//         }
//         if(contextProfilePicBg){
//             setProfilePicBgImg(contextProfilePicBg && contextProfilePicBg !== '' ? contextProfilePicBg : defaultBgImage);
//         }
//     }, [profileName, contextProfileBio, contextProfilePic,contextProfilePicBg]);





//     const handleProfileUsername=(e)=>{
//         setProfileUsername(e.target.value);
//     }

//     const handleProfileBio=(e)=> {
//         setProfileBio(e.target.value);
//     }

//     // const handleProfilePicImage = () => {
//     //     const fileInput = document.createElement('input');
//     //     fileInput.type = 'file';
//     //     fileInput.accept = 'image/*';
//     //     fileInput.onchange = (e) => {
//     //         const file = e.target.files[0];
//     //         if (file) {
//     //             const reader = new FileReader();
//     //             reader.onload = (e) => setProfilePicImage(e.target.result);
//     //             reader.readAsDataURL(file);
//     //         }
//     //     };
//     //     fileInput.click();
//     // };







//     const handleProfilePicImage = () => {
//         const fileInput = document.createElement('input');
//         fileInput.type = 'file';
//         fileInput.accept = 'image/*';
//         fileInput.onchange = async (e) => {
//             const file = e.target.files[0];
//             if (file) {
//                 const formData = new FormData();
//                 formData.append('file', file);
//                 formData.append('upload_preset', 'sm_pre_name');
//                 formData.append("cloud_name", "dfeyufa3x");
    
//                 try {
//                     const response = await fetch(`https://api.cloudinary.com/v1_1/dfeyufa3x/image/upload`, {
//                         method: 'POST',
//                         body: formData
//                     });
//                     const data = await response.json();
//                     setProfilePicImage(data.secure_url);
//                 } catch (error) {
//                     console.error('Error uploading image to Cloudinary:', error);
//                 }
//             }
//         };
//         fileInput.click();
//     };


//     const handleProfilePicBgImage=() => {
//         const fileInput = document.createElement('input');
//         fileInput.type = 'file';
//         fileInput.accept = 'image/*';
//         fileInput.onchange = async (e) => {
//             const file = e.target.files[0];
//             if (file) {
//                 const formData = new FormData();
//                 formData.append('file', file);
//                 formData.append('upload_preset', 'sm_pre_name');
//                 formData.append("cloud_name", "dfeyufa3x");
    
//                 try {
//                     const response = await fetch(`https://api.cloudinary.com/v1_1/dfeyufa3x/image/upload`, {
//                         method: 'POST',
//                         body: formData
//                     });
//                     const data = await response.json();
//                     setProfilePicBgImg(data.secure_url);
//                 } catch (error) {
//                     console.error('Error uploading image to Cloudinary:', error);
//                 }
//             }
//         };
//         fileInput.click();

//     }




//     const handleProfileSave = (e) => {
//         e.preventDefault();

//         const bgImageToSave=profilePicBgImg || defaultBgImage;
//         setProfileData({
//             profileName: profileUsername,
//             profileBio: profileBio,
//             profilePicImage: profilePicImage,
//             profilePicBgImg:bgImageToSave,
//         });
//         localStorage.setItem("lsProfileUsername",profileUsername);
//         localStorage.setItem("lsProfileBio",profileBio);
//         localStorage.setItem("lsProfilePicImg",profilePicImage);
//         localStorage.setItem("lsProfilePicBgImg",bgImageToSave);
//         navigate("/profile");
//     }

//     const backgroundImageStyle = profilePicBgImg || defaultBgImage;

//     return (
//         <div className="edit-profile-component">
//             <div className="edit-profile-top-container" style={{backgroundImage:`url(${backgroundImageStyle})`,backgroundSize:'cover',backgroundPosition:'center'}}>
//                 <div className="edit-profile-top-nav-container">
//                     <div className="edit-profile-nav-cont">
//                         <button className="edit-profile-back-button" onClick={()=>navigate("/profile")}><HiArrowSmLeft /></button>
//                         <h2 className="edit-profile-title">Edit Profile</h2>
//                     </div>
//                     <button className="edit-profile-bg-pic" onClick={handleProfilePicBgImage}><HiPencil /></button>
//                 </div>
//             </div>
//             <div className="ep-profile-pic-edit-cont">
//                 <img src={profilePicImage} className="profile-pic-edit" alt="profile-pic-edit" />
//                 <button className="edit-profile-pic-button"
//                 onClick={handleProfilePicImage}
//                 >
//                     <HiPencil />
//                 </button>
//             </div>
//             <form onSubmit={handleProfileSave}>
//                 <label htmlFor="profile-name" className="profile-name-label">Name</label>
//                 <br />
//                 <input type="text" id="profile-name" className="profile-name-input" 
//                 value={profileUsername}
//                 placeholder="Enter your Username"
//                 onChange={handleProfileUsername}/>
//                 <br />
//                 <label htmlFor="profile-bio" className="profile-bio-label">Bio</label>
//                 <br />
//                 <input type="text" id="profile-bio" className="profile-bio-input"
//                 value={profileBio}
//                 placeholder="Enter your Bio"
//                 onChange={handleProfileBio}/>
//                 <br />
//                 <button className="save-button" onClick={handleProfileSave}>SAVE</button>
//             </form>
//         </div>
//     )
// }

// export default EditProfile;



















































































































































































































import { HiPencil, HiArrowSmLeft } from "react-icons/hi";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';
import { ProfileDetailsContext } from "../../App";

const EditProfile = () => {
    const defaultBgImage = './login-images/profile-bg-1.jpg';

    const [profileUsername, setProfileUsername] = useState('');
    const [profileBio, setProfileBio] = useState('');
    const [profilePicImage, setProfilePicImage] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg');
    const [profilePicBgImg, setProfilePicBgImg] = useState(defaultBgImage);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    const { profileName, profileBio: contextProfileBio, profilePicImage: contextProfilePic, profilePicBgImg: contextProfilePicBg, setProfileData } = useContext(ProfileDetailsContext);

    // Get previous profile data from localStorage
    const previousProfileName = localStorage.getItem("previousProfileName");
    const previousProfilePicImage = localStorage.getItem("previousProfilePicImage");

    useEffect(() => {
        // Set initial values from context
        setProfileUsername(profileName || '');
        setProfileBio(contextProfileBio || '');
        if (contextProfilePic) {
            setProfilePicImage(contextProfilePic);
        }
        if (contextProfilePicBg) {
            setProfilePicBgImg(contextProfilePicBg && contextProfilePicBg !== '' ? contextProfilePicBg : defaultBgImage);
        }
    }, [profileName, contextProfileBio, contextProfilePic, contextProfilePicBg]);

    const handleProfileUsername = (e) => {
        setProfileUsername(e.target.value);
    }

    const handleProfileBio = (e) => {
        setProfileBio(e.target.value);
    }

    const handleProfilePicImage = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'sm_pre_name');
                formData.append("cloud_name", "dfeyufa3x");
    
                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/dfeyufa3x/image/upload`, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    setProfilePicImage(data.secure_url);
                } catch (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                }
            }
        };
        fileInput.click();
    };

    const handleProfilePicBgImage = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'sm_pre_name');
                formData.append("cloud_name", "dfeyufa3x");
    
                try {
                    const response = await fetch(`https://api.cloudinary.com/v1_1/dfeyufa3x/image/upload`, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    setProfilePicBgImg(data.secure_url);
                } catch (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                }
            }
        };
        fileInput.click();
    }

    const updatePostsWithNewProfileData = async () => {
        try {
            setIsUpdating(true);
            console.log('Fetching posts...');
            
            // First, get all posts
            const response = await fetch('http://localhost:8080/api/posts');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const posts = await response.json();
            console.log('All posts:', posts);
            
            // Print the values we're comparing against
            console.log('Looking for posts with:', {
                previousName: previousProfileName,
                previousImage: previousProfilePicImage
            });
            
            // Filter posts that belong to the current user - using more lenient matching
            const userPosts = posts.filter(post => {
                // Check if the post has an author field (profileName or userName or author)
                const postHasMatchingName = 
                    (post.userName && post.userName === previousProfileName);
                
                // Check if the post has a profile image field
                const postHasMatchingImage = 
                    (post.userImage && post.userImage === previousProfilePicImage);
                
                // If any username field matches, count it as a user post
                return postHasMatchingName || postHasMatchingImage;
            });
            
            console.log('Found user posts:', userPosts);
            
            if (userPosts.length === 0) {
                console.warn('No matching posts found for this user');
                setIsUpdating(false);
                // Continue with profile update even if no posts are found
                localStorage.removeItem("previousProfileName");
                localStorage.removeItem("previousProfilePicImage");
                navigate("/profile");
                return;
            }
            
            // Update each post with new profile data
            for (const post of userPosts) {
                console.log(`Updating post with ID: ${post.id}`);
                
                // Create updated post object with new profile data
                const updatedPost = { ...post };
                
                // Update all possible name fields
                if (updatedPost.userName) updatedPost.userName = profileUsername;
                
                // Update all possible image fields
                if (updatedPost.userImage) updatedPost.userImage = profilePicImage;
                
                try {
                    const updateResponse = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedPost)
                    });
                    
                    if (!updateResponse.ok) {
                        console.error(`Failed to update post ${post.id}:`, await updateResponse.text());
                    } else {
                        console.log(`Post ${post.id} updated successfully`);
                    }
                } catch (error) {
                    console.error(`Error updating post ${post.id}:`, error);
                }
            }
            
            console.log('All posts updated successfully');
            setIsUpdating(false);
            
            // Clear previous profile data from localStorage
            localStorage.removeItem("previousProfileName");
            localStorage.removeItem("previousProfilePicImage");
            
            navigate("/profile");
        } catch (error) {
            console.error('Error in updatePostsWithNewProfileData:', error);
            setIsUpdating(false);
            
            // Even if there's an error, update the profile and navigate
            localStorage.removeItem("previousProfileName");
            localStorage.removeItem("previousProfilePicImage");
            navigate("/profile");
        }
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();

        const bgImageToSave = profilePicBgImg || defaultBgImage;
        
        // Update profile data in context and localStorage
        setProfileData({
            profileName: profileUsername,
            profileBio: profileBio,
            profilePicImage: profilePicImage,
            profilePicBgImg: bgImageToSave,
        });
        
        localStorage.setItem("lsProfileUsername", profileUsername);
        localStorage.setItem("lsProfileBio", profileBio);
        localStorage.setItem("lsProfilePicImg", profilePicImage);
        localStorage.setItem("lsProfilePicBgImg", bgImageToSave);
        
        // Update posts with new profile data if previous data exists
        if (previousProfileName && 
            (previousProfileName !== profileUsername || previousProfilePicImage !== profilePicImage)) {
            console.log("Profile data changed, updating posts...");
            await updatePostsWithNewProfileData();
        } else {
            console.log("No profile name change or no previous data, skipping post updates");
            navigate("/profile");
        }
    }

    const backgroundImageStyle = profilePicBgImg || defaultBgImage;

    return (
        <div className="edit-profile-component">
            <div className="edit-profile-top-container" style={{backgroundImage:`url(${backgroundImageStyle})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                <div className="edit-profile-top-nav-container">
                    <div className="edit-profile-nav-cont">
                        <button className="edit-profile-back-button" onClick={() => navigate("/profile")}><HiArrowSmLeft /></button>
                        <h2 className="edit-profile-title">Edit Profile</h2>
                    </div>
                    <button className="edit-profile-bg-pic" onClick={handleProfilePicBgImage}><HiPencil /></button>
                </div>
            </div>
            <div className="ep-profile-pic-edit-cont">
                <img src={profilePicImage} className="profile-pic-edit" alt="profile-pic-edit" />
                <button className="edit-profile-pic-button" onClick={handleProfilePicImage}>
                    <HiPencil />
                </button>
            </div>
            <form onSubmit={handleProfileSave}>
                <label htmlFor="profile-name" className="profile-name-label">Name</label>
                <br />
                <input 
                    type="text" 
                    id="profile-name" 
                    className="profile-name-input" 
                    value={profileUsername}
                    placeholder="Enter your Username"
                    onChange={handleProfileUsername}
                />
                <br />
                <label htmlFor="profile-bio" className="profile-bio-label">Bio</label>
                <br />
                <input 
                    type="text" 
                    id="profile-bio" 
                    className="profile-bio-input"
                    value={profileBio}
                    placeholder="Enter your Bio"
                    onChange={handleProfileBio}
                />
                <br />
                <button 
                    className="save-button" 
                    onClick={handleProfileSave} 
                    disabled={isUpdating}
                >
                    {isUpdating ? 'UPDATING...' : 'SAVE'}
                </button>
            </form>
        </div>
    )
}

export default EditProfile;