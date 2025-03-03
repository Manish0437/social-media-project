import { IoIosCloseCircle } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";
import './style.css';

const SelectedItem = (props) => {
    const { file, index, removeItem } = props;
    // const fileType = file.type.split('/')[0];
    const fileType=file.name.endsWith('.mp4') ? 'video' : file.name.endsWith('.png') || file.name.endsWith('.jpg') ? 'image' : 'file';
    console.log(fileType);

    const isValidFile = file instanceof File || file instanceof Blob;

    return (
    <div className="selected-item">
      <button className="remove-item" onClick={() => removeItem(index)}>
      {isValidFile && fileType === 'image' && (
          <img src={URL.createObjectURL(file)} alt="selected" />
        )}
        {isValidFile && fileType === 'video' && (
          <video width={75} height={60}>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        )}
        {isValidFile && fileType !== 'image' && fileType !== 'video' && (
          <div className="file-preview">
            <FaFileAlt className="file-icon" />
            <br />
            <span className="file-name">{file.name}</span>
          </div>
        )}
        <IoIosCloseCircle  className="close-button-icon"/>
      </button>
    </div>
  );
};


export default SelectedItem;