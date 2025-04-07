
import { FaFileAlt, FaFilePdf, FaFileWord } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import './style.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Post = props => {
    const { userDetails,clickShare } = props;
    const { userImage, userName, createdAt, comment, files, likes, id, listOfLikedUsers} = userDetails;
    
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
    
    // State to store processed file data
    const [fileData, setFileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked,setIsLiked]=useState(false);
    const [currentLikes,setCurrentLikes]=useState(likes||0);
    const [likedUsers,setLikedUsers]=useState(listOfLikedUsers||[]);
    
    const profileUsername=localStorage.getItem("email");
    // console.log("userName:",localStorage.getItem("email"));

    const isPresent=likedUsers.includes(profileUsername);
    // console.log("likedUsers:",likedUsers);

    
    useEffect(() => {
        // Process the file URLs from Cloudinary
        const processFiles = () => {
            // If no files, set loading to false and return
            if (!files || files.length === 0) {
                setIsLoading(false);
                return;
            }
            
            try {
                // Process each file URL
                const processedFiles = files.map(url => {
                    // Default file type and icon
                    let fileType = 'file';
                    let fileIcon = <FaFileAlt />;
                    
                    // Get filename from URL
                    const urlParts = url.split('/');
                    const fileNameWithParams = urlParts[urlParts.length - 1];
                    const fileName = fileNameWithParams.split('?')[0];
                    
                    // Get file extension
                    const extension = fileName.split('.').pop().toLowerCase();
                    
                    // Set file type based on URL and extension
                    if (url.includes('/image/upload/')) {
                        fileType = 'image';
                    } else if (url.includes('/video/upload/')) {
                        fileType = 'video';
                    } else if (url.includes('/raw/upload/')) {
                        if (extension === 'pdf') {
                            fileType = 'pdf';
                            fileIcon = <FaFilePdf />;
                        } else if (['doc', 'docx'].includes(extension)) {
                            fileType = 'word';
                            fileIcon = <FaFileWord />;
                        } else if (extension === 'txt') {
                            fileType = 'text';
                            fileIcon = <FaFileAlt />;
                        }
                    }
                    
                    // Create PDF preview URL
                    let previewUrl = null;
                    if (fileType === 'pdf') {
                        // Convert raw URL to image URL for PDF preview
                        const baseUrl = url.replace('/raw/upload/', '/image/upload/');
                        
                        // Get version and filename
                        const match = url.match(/\/v(\d+)\/([^/]+)$/);
                        if (match) {
                            const version = match[1];
                            const filename = match[2];
                            // Create thumbnail URL
                            previewUrl = `${baseUrl.split('/v')[0]}/c_thumb,w_400,h_400,pg_1/v${version}/${filename}`;
                        }
                    }
                    
                    return {
                        name: fileName,
                        type: fileType,
                        url: url,
                        previewUrl: previewUrl,
                        icon: fileIcon,
                        extension: extension
                    };
                });
                
                setFileData(processedFiles);
            } catch (error) {
                console.error("Error processing files:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        processFiles();
    }, [files]);

    // Format date to readable string
    const formatDate = (dateString) => {
        if (!dateString) return "Unknown date";
        
        try {
            // Parse the date string properly
            const createdAtDate = new Date(dateString);
            
            // Check if the date is valid
            if (isNaN(createdAtDate.getTime())) {
                return "Invalid date";
            }
            
            const now = new Date();
            const diffInSeconds = Math.floor((now - createdAtDate) / 1000);
            
            // Handle future dates (in case of clock mismatch)
            if (diffInSeconds < 0) return "Just now";
            
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInDays > 0) {
                if (diffInDays === 1) return "Yesterday";
                if (diffInDays < 7) return `${diffInDays} days ago`;
                
                // For older dates, show the actual date
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return createdAtDate.toLocaleDateString(undefined, options);
            } else if (diffInHours > 0) {
                return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
            } else if (diffInMinutes > 0) {
                return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;
            } else {
                return diffInSeconds < 10 ? "Just now" : `${diffInSeconds} seconds ago`;
            }
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Date error";
        }
    };

    // Handle document errors
    const handleDocumentError = (e) => {
        e.preventDefault();
        alert('This file cannot be accessed. It may require authentication or has been deleted.');
    };



    // Add this to your existing useEffect or create a new one for initialization
    useEffect(() => {
        // Try to get liked users from localStorage for this specific post
        const storedLikedUsers = localStorage.getItem(`likedUsers_${id}`);
        if (storedLikedUsers) {
            const parsedLikedUsers = JSON.parse(storedLikedUsers);
            setLikedUsers(parsedLikedUsers);
            
            // Also update isLiked state based on whether current user is in the array
            setIsLiked(parsedLikedUsers.includes(profileUsername));
        }

    }, [id, profileUsername]);

    
    const handleLike = async () => {
        // Check if the current user has already liked this post
        const hasLiked = likedUsers.includes(profileUsername);
        
        try {
            if (hasLiked) {
                // User has already liked, so unlike the post
                const updatedLikedUsers = likedUsers.filter(username => username !== profileUsername);
                const updatedLikesCount = Math.max(0, currentLikes - 1); // Prevent negative counts
                
                // Optimistically update UI first
                setIsLiked(false);
                setCurrentLikes(updatedLikesCount);
                setLikedUsers(updatedLikedUsers);
                
                // Store in localStorage to persist between reloads
                localStorage.setItem(`likedUsers_${id}`, JSON.stringify(updatedLikedUsers));
                
                // Update the backend
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ likes: updatedLikesCount , listOfLikedUsers: updatedLikedUsers})
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update likes');
                }
                
                console.log("Unlike successful");
            } else {
                // User hasn't liked yet, proceed with liking
                const updatedLikedUsers = [...likedUsers, profileUsername];
                const updatedLikesCount = currentLikes + 1;
                
                // Optimistically update UI first
                setIsLiked(true);
                setCurrentLikes(updatedLikesCount);
                setLikedUsers(updatedLikedUsers);
                
                // Store in localStorage to persist between reloads
                localStorage.setItem(`likedUsers_${id}`, JSON.stringify(updatedLikedUsers));
                
                // Then update the backend
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ likes: updatedLikesCount ,listOfLikedUsers: updatedLikedUsers})
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update likes');
                }
                
                console.log("Like successful");
            }
        } catch (error) {
            // If the API call fails, revert the UI changes
            console.error("Error updating likes:", error);
            
            // Revert to previous state
            if (hasLiked) {
                // Revert back to liked state
                setIsLiked(true);
                setCurrentLikes(currentLikes);
                setLikedUsers(likedUsers);
            } else {
                // Revert back to unliked state
                setIsLiked(false);
                setCurrentLikes(currentLikes);
                setLikedUsers(likedUsers.filter(username => username !== profileUsername));
            }
            
            // Ensure localStorage matches the reverted state
            localStorage.setItem(`likedUsers_${id}`, JSON.stringify(likedUsers));
            
            alert("Failed to update like status. Please try again.");
        }
    };


    

    const handleShare=() => {
        clickShare(id);
    }



    return (
        <div className="post-container" style={{backgroundColor:`${randomBgClr}`}}>
            {/* User profile section */}
            <Link to={`/view-post/${id}`} className="user-details">
                <img src={userImage} alt="user" className="user-profile-image" />
                <div>
                    <p className="username">{userName}</p>
                    <p className="created-at">{formatDate(createdAt)}</p>
                </div>
            </Link>

            {/* Post content section */}
            <div className="post-details">
                <p className="post-comment">{comment}</p>
                
                {/* File display section */}
                {isLoading ? (
                    <div className="loading-indicator">Loading files...</div>
                ) : fileData.length > 0 ? (
                    <ul className="media-list">
                        {fileData.map((file, index) => (
                            <li key={`file-${index}`} className="media-item">
                                {/* Image files */}
                                {file.type === 'image' && (
                                    <div className="image-container">
                                        <img 
                                            src={file.url} 
                                            alt={file.name} 
                                            className="post-image" 
                                            loading="lazy"
                                            onError={(e) => {
                                                // Show placeholder if image fails to load
                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30,30 L70,70 M30,70 L70,30' stroke='%23999' stroke-width='5'/%3E%3C/svg%3E";
                                                e.target.alt = "Image unavailable";
                                            }}
                                        />
                                    </div>
                                )}
                                
                                {/* Video files */}
                                {file.type === 'video' && (
                                    <div className="video-container">
                                        <video controls className="post-video">
                                            <source src={file.url} />
                                            Your browser does not support video playback.
                                        </video>
                                    </div>
                                )}
                                
                                {/* PDF files */}
                                {file.type === 'pdf' && (
                                    <div className="document-preview">
                                        <div className="document-thumbnail">
                                            {file.previewUrl ? (
                                                <img 
                                                    src={file.previewUrl} 
                                                    alt={`Preview of ${file.name}`} 
                                                    className="pdf-thumbnail" 
                                                    onError={(e) => {
                                                        // Show icon if preview fails
                                                        e.target.style.display = 'none';
                                                        const icon = document.createElement('div');
                                                        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50" fill="#E74C3C"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z"/></svg>';
                                                        e.target.parentNode.appendChild(icon);
                                                    }}
                                                />
                                            ) : (
                                                <FaFilePdf className="file-icon pdf-icon" />
                                            )}
                                        </div>
                                        <div className="document-info">
                                            <span className="file-name">{file.name}</span>
                                            <div className="document-actions">
                                                <a 
                                                    href={file.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="view-link"
                                                    onClick={(e) => {
                                                        if (file.url.includes('401') || file.url.includes('404')) {
                                                            handleDocumentError(e);
                                                        }
                                                    }}
                                                >
                                                    View
                                                </a>
                                                {/* <a 
                                                    href={file.url} 
                                                    download={file.name} 
                                                    className="download-link"
                                                    onClick={(e) => {
                                                        if (file.url.includes('401') || file.url.includes('404')) {
                                                            handleDocumentError(e);
                                                        }
                                                    }}
                                                >
                                                    Download
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Word and text files */}
                                {(file.type === 'word' || file.type === 'text') && (
                                    <div className="document-preview">
                                        <div className="document-thumbnail">
                                            {file.icon}
                                        </div>
                                        <div className="document-info">
                                            <span className="file-name">{file.name}</span>
                                            <a 
                                                href={file.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="view-link"
                                                onClick={(e) => {
                                                    if (file.url.includes('401') || file.url.includes('404')) {
                                                        handleDocumentError(e);
                                                    }
                                                }}
                                            >
                                                View
                                            </a>
                                            {/* <a 
                                                href={file.url} 
                                                download={file.name} 
                                                className="download-link"
                                                onClick={(e) => {
                                                    if (file.url.includes('401') || file.url.includes('404')) {
                                                        handleDocumentError(e);
                                                    }
                                                }}
                                            >
                                                Download
                                            </a> */}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Generic files */}
                                {file.type === 'file' && (
                                    <div className="file-preview">
                                        <FaFileAlt className="file-icon" />
                                        <span className="file-name">{file.name}</span>
                                        <a 
                                            href={file.url} 
                                            download 
                                            className="download-link"
                                            onClick={(e) => {
                                                if (file.url.includes('401') || file.url.includes('404')) {
                                                    handleDocumentError(e);
                                                }
                                            }}
                                        >
                                            Download
                                        </a>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No files attached to this post.</p>
                )}
            </div>
            
            
            <div className="post-footer-container">
                <div className="likes-section" onClick={handleLike} style={{ cursor: 'pointer' }}>
                    <p style={{ color: isPresent ? "#D95B7F" : "inherit" }}>
                        <HiHeart id="heart-icon" />
                        {currentLikes}
                    </p>
                </div>
                <div className="share-section" onClick={handleShare}>
                    <p><BiSolidNavigation id="share-icon"/> Share</p>
                </div>
            </div>
        </div>
    );
};

export default Post;