import React, { createContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Feeds from "./components/Feeds";
import AddPost from "./components/AddPost";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import "./App.css";

// Export the context so it can be imported in other files
export const ProfileDetailsContext = createContext();

const App = () => {

  const defaultBgImage = './login-images/profile-bg-1.jpg';


  // Use useState to make the profileData stateful
  const [profileData, setProfileData] = useState({
    contextprofileName: localStorage.getItem("lsProfileUsername") || '',
    contextprofileBio: localStorage.getItem("lsProfileBio") || '',
    contextprofilePicImage: localStorage.getItem("lsProfilePicImg") || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
    contextprofilePicBgImg: localStorage.getItem("lsProfilePicBgImg") || defaultBgImage,
  });

  return (
    <ProfileDetailsContext.Provider value={{ ...profileData, setProfileData }}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/view-post/:id"  element={<ViewPost />} />
        <Route path="/edit-post/:id"  element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    </ProfileDetailsContext.Provider>
  );
};

export default App;