
import { IoIosCloseCircle } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import './style.css';

const SelectedItem = (props) => {
  const { file, index, removeItem } = props;
  
  // Determine file type for existing and new files
  const fileType = file.isExisting ? 
    (file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) ? 'image' : 
     file.url.toLowerCase().match(/\.(mp4|avi|mov)$/) ? 'video' : 'file') :
    (file.type.split('/')[0] === 'image' ? 'image' :
     file.type.split('/')[0] === 'video' ? 'video' : 'file');

  return (
    <div className="selected-item">
      <button className="remove-item" onClick={() => removeItem(index)}>
        {/* Preview for existing image files */}
        {file.isExisting && fileType === 'image' && (
          <img 
            src={file.url} 
            alt="existing file" 
            className="existing-file-preview"
          />
        )}

        {/* Preview for new image files */}
        {!file.isExisting && fileType === 'image' && (
          <img 
            src={URL.createObjectURL(file)} 
            alt="selected" 
            className="new-file-preview"
          />
        )}

        {/* Preview for video files */}
        {fileType === 'video' && (
          <video width={75} height={60}>
            <source 
              src={file.isExisting ? file.url : URL.createObjectURL(file)} 
              type={file.type || 'video/mp4'} 
            />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Preview for other file types */}
        {fileType !== 'image' && fileType !== 'video' && (
          <div className="file-preview">
            <FaFileAlt className="file-icon" />
            <br />
            <span className="file-name">
              {file.name || `Existing file ${index + 1}`}
            </span>
          </div>
        )}

        <IoIosCloseCircle className="close-button-icon"/>
      </button>
    </div>
  );
};

export default SelectedItem;