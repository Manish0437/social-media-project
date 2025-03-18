import React, { createContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Feeds from "./components/Feeds";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import "./App.css";

// Export the context so it can be imported in other files
export const ProfileDetailsContext = createContext();

const App = () => {

  const defaultBgImage = './login-images/profile-bg-1.jpg';


  // Use useState to make the profileData stateful
  const [profileData, setProfileData] = useState({
    profileName: localStorage.getItem("lsProfileUsername") || '',
    profileBio: localStorage.getItem("lsProfileBio") || '',
    profilePicImage: localStorage.getItem("lsProfilePicImg") || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    profilePicBgImg: localStorage.getItem("lsProfilePicBgImg") || defaultBgImage,
  });

  return (
    <ProfileDetailsContext.Provider value={{ ...profileData, setProfileData }}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </ProfileDetailsContext.Provider>
  );
};

export default App;