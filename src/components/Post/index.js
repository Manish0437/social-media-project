// import { FaFileAlt } from "react-icons/fa";
// import './style.css';

// const Post = props => {
//     const { userDetails } = props;
//     const { userImage, userName, createdAt, comment, files, likes } = userDetails;

//     const isValidFile = (file) => file instanceof File || file instanceof Blob;

//     return (
//         <div className="post-container">
//             <div className="user-details">
//                 <img src={userImage} alt="user" className="user-profile-image" />
//                 <div>
//                     <p className="username">{userName}</p>
//                     <p className="created-at">{createdAt}</p>
//                 </div>
//             </div>
//             <div className="post-details">
//                 <p>{comment}</p>
//                 <ul>
//                     {files.map((eachFile, index) => (
//                         <li key={index}>
//                             {isValidFile(eachFile) && (eachFile.endsWith('.png') || eachFile.endsWith('.jpg') || eachFile.endsWith('.jpeg')) && (
//                                 <img src={URL.createObjectURL(eachFile)} className="post-image" alt="post" />
//                             )}
//                             {isValidFile(eachFile) && eachFile.endsWith('.mp4') && (
//                                 <video width={200} height={200} controls>
//                                     <source src={URL.createObjectURL(eachFile)} type={eachFile.type} />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             )}
//                             {isValidFile(eachFile) && !(eachFile.endsWith('.png') || eachFile.endsWith('.jpg') || eachFile.endsWith('.jpeg') || eachFile.endsWith('.mp4')) && (
//                                 <div className="file-preview">
//                                     <FaFileAlt className="file-icon" />
//                                     <br />
//                                     <span className="file-name">{eachFile}</span>
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="likes">
//                 <p>{likes}</p>
//             </div>
//         </div>
//     );
// }

// export default Post;


















// import { FaFileAlt } from "react-icons/fa";
// import './style.css';

// const Post = props => {
//     const { userDetails } = props;
//     const { userImage, userName, createdAt, comment, files, likes } = userDetails;

//     const isValidFile = (file) => file instanceof File || file instanceof Blob;

//     return (
//         <div className="post-container">
//             <div className="user-details">
//                 <img src={userImage} alt="user" className="user-profile-image" />
//                 <div>
//                     <p className="username">{userName}</p>
//                     <p className="created-at">{createdAt}</p>
//                 </div>
//             </div>
//             <div className="post-details">
//                 <p>{comment}</p>
//                 <ul>
//                     {files.map((eachFile, index) => {
//                         if (!isValidFile(eachFile)) {
//                             console.error(`Invalid file at index ${index}`, eachFile);
//                             return null;
//                         }

//                         const fileURL = isValidFile?URL.createObjectURL(eachFile):null;

//                         return (
//                             <li key={index}>
//                                 {isValidFile(eachFile)&&(eachFile.endsWith('.png') || eachFile.endsWith('.jpg') || eachFile.endsWith('.jpeg')) && (
//                                     <img src={fileURL} className="post-image" alt="post" />
//                                 )}
//                                 {isValidFile(eachFile)&&eachFile.endsWith('.mp4') && (
//                                     <video width={200} height={200} controls>
//                                         <source src={fileURL} type={eachFile.type} />
//                                         Your browser does not support the video tag.
//                                     </video>
//                                 )}
//                                 {isValidFile(eachFile)&&!(eachFile.endsWith('.png') || eachFile.endsWith('.jpg') || eachFile.endsWith('.jpeg') || eachFile.endsWith('.mp4')) && (
//                                     <div className="file-preview">
//                                         <FaFileAlt className="file-icon" />
//                                         <br />
//                                         <span className="file-name">{eachFile}</span>
//                                     </div>
//                                 )}
//                                 {!isValidFile(eachFile) && (
//                                     <div className="file-preview">
//                                         <FaFileAlt className="file-icon" />
//                                         <br />
//                                         <span className="file-name">{eachFile}</span>
//                                     </div>
//                                 )}
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//             <div className="likes">
//                 <p>{likes}</p>
//             </div>
//         </div>
//     );
// }

// export default Post;

































// import { FaFileAlt } from "react-icons/fa";
// import './style.css';

// const Post = props => {
//     const { userDetails } = props;
//     const { userImage, userName, createdAt, comment, files, likes } = userDetails;

//     // Modified to check if the file is a string (filename) or a File/Blob object
//     const isValidFile = (file) => file instanceof File || file instanceof Blob;
//     const isString = (file) => typeof file === 'string';

//     return (
//         <div className="post-container">
//             <div className="user-details">
//                 <img src={userImage} alt="user" className="user-profile-image" />
//                 <div>
//                     <p className="username">{userName}</p>
//                     <p className="created-at">{createdAt}</p>
//                 </div>
//             </div>
//             <div className="post-details">
//                 <p>{comment}</p>
//                 <ul>
//                     {files && files.map((eachFile, index) => {
//                         // Handle case when file is a string (filename)
//                         if (isString(eachFile)) {
//                             return (
//                                 <li key={index}>
//                                     <div className="file-preview">
//                                         <FaFileAlt className="file-icon" />
//                                         <br />
//                                         <span className="file-name">{eachFile}</span>
//                                     </div>
//                                 </li>
//                             );
//                         }

//                         // Handle case when file is a File/Blob object
//                         if (isValidFile(eachFile)) {
//                             const fileURL = URL.createObjectURL(eachFile);
                            
//                             // Check file type
//                             const fileName = eachFile.name || '';
//                             const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileName);
//                             const isVideo = /\.mp4$/i.test(fileName);

//                             return (
//                                 <li key={index}>
//                                     {isImage && (
//                                         <img src={fileURL} className="post-image" alt="post" />
//                                     )}
//                                     {isVideo && (
//                                         <video width={200} height={200} controls>
//                                             <source src={fileURL} type={eachFile.type} />
//                                             Your browser does not support the video tag.
//                                         </video>
//                                     )}
//                                     {!isImage && !isVideo && (
//                                         <div className="file-preview">
//                                             <FaFileAlt className="file-icon" />
//                                             <br />
//                                             <span className="file-name">{fileName}</span>
//                                         </div>
//                                     )}
//                                 </li>
//                             );
//                         }

//                         console.log(`Unprocessable file at index ${index}`, eachFile);
//                         return null;
//                     })}
//                 </ul>
//             </div>
//             <div className="likes">
//                 <p>{likes}</p>
//             </div>
//         </div>
//     );
// }

// export default Post;





































































import { FaFileAlt } from "react-icons/fa";
import './style.css';

const Post = props => {
    const { userDetails } = props;
    const { userImage, userName, createdAt, comment, files, likes } = userDetails;

    // Check if the file is a valid File/Blob object
    const isValidFile = (file) => file instanceof File || file instanceof Blob;
    
    // Check if the item is a string
    const isString = (file) => typeof file === 'string';
    
    // Determine file type from string or object
    const getFileType = (file) => {
        if (isString(file)) {
            // Check file extension from string
            if (/\.(jpg|jpeg|png|gif|bmp)$/i.test(file)) return 'image';
            if (/\.(mp4|mov|avi|wmv|mkv)$/i.test(file)) return 'video';
            return 'other';
        } else if (isValidFile(file)) {
            // Check MIME type or file name from File object
            const fileName = file.name || '';
            if (/\.(jpg|jpeg|png|gif|bmp)$/i.test(fileName) || file.type?.startsWith('image/')) return 'image';
            if (/\.(mp4|mov|avi|wmv|mkv)$/i.test(fileName) || file.type?.startsWith('video/')) return 'video';
            return 'other';
        }
        return 'unknown';
    };

    return (
        <div className="post-container">
            <div className="user-details">
                <img src={userImage} alt="user" className="user-profile-image" />
                <div>
                    <p className="username">{userName}</p>
                    <p className="created-at">{createdAt}</p>
                </div>
            </div>
            <div className="post-details">
                <p>{comment}</p>
                <ul>
                    {files && files.map((file, index) => {
                        const fileType = getFileType(file);
                        
                        // Handle string filenames
                        if (isString(file)) {
                            return (
                                <li key={index}>
                                    {fileType === 'image' && (
                                        <div className="image-preview">
                                            {/* You might need a way to get the actual URL for the image */}
                                            {/* For now, display placeholder or file name */}
                                            <div className="placeholder-image">
                                                <span>Image: {file}</span>
                                            </div>
                                        </div>
                                    )}
                                    {fileType === 'video' && (
                                        <div className="video-preview">
                                            {/* You might need a way to get the actual URL for the video */}
                                            {/* For now, display placeholder or file name */}
                                            <div className="placeholder-video">
                                                <span>Video: {file}</span>
                                            </div>
                                        </div>
                                    )}
                                    {fileType === 'other' && (
                                        <div className="file-preview">
                                            <FaFileAlt className="file-icon" />
                                            <br />
                                            <span className="file-name">{file}</span>
                                        </div>
                                    )}
                                </li>
                            );
                        }
                        
                        // Handle File/Blob objects
                        if (isValidFile(file)) {
                            const fileURL = URL.createObjectURL(file);
                            
                            return (
                                <li key={index}>
                                    {fileType === 'image' && (
                                        <img src={fileURL} className="post-image" alt="post" />
                                    )}
                                    {fileType === 'video' && (
                                        <video width={200} height={200} controls>
                                            <source src={fileURL} type={file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {fileType === 'other' && (
                                        <div className="file-preview">
                                            <FaFileAlt className="file-icon" />
                                            <br />
                                            <span className="file-name">{file.name}</span>
                                        </div>
                                    )}
                                </li>
                            );
                        }

                        console.log(`Unprocessable file at index ${index}`, file);
                        return null;
                    })}
                </ul>
            </div>
            <div className="likes">
                <p>{likes}</p>
            </div>
        </div>
    );
}

export default Post;