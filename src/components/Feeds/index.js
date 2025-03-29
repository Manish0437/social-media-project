import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef,useCallback } from "react";
import Post from "../Post";
import {
  FaTwitter,
  FaFacebook,
  FaRedditAlien,
  FaDiscord,
  FaFacebookMessenger,
} from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { RiTelegram2Fill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

import SyncLoader from "react-spinners/SyncLoader";

import "./style.css";

const Feeds = () => {
  const navigate = useNavigate();
  const linkInputRef = useRef(null);

  const [backendData, setBackendData] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [shareLink, setShareLink] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);


      await new Promise(resolve => setTimeout(resolve, 2000));


      try {
        const response = await fetch(
          `http://localhost:8080/api/posts?page=${pageNumber}&size=2`
        );
        const data = await response.json();
        setIsLastPage(data.last);

        const posts = data.content || [];
        const uniquePosts = posts.map((post) => ({
          ...post,
          uniqueKey: `${post.id}-${pageNumber}`,
        }));
        // setIsLoading(false);
        setBackendData((previousPosts) => {
          const combinedPosts = [...previousPosts, ...uniquePosts];

          // Deduplicate posts
          const dedupedPosts = combinedPosts.filter(
            (post, currentIndex, allPosts) =>
              currentIndex ===
              allPosts.findIndex((otherPost) => otherPost.id === post.id)
          );
          setIsLoading(false);
          return dedupedPosts;
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !isLoading &&
      !isLastPage
    ) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [isLoading, isLastPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isSharing && currentPostId) {
      const baseUrl = window.location.origin || "https://yourapp.com";
      const link = `${baseUrl}/post/${currentPostId}`;
      setShareLink(link);
    }
  }, [isSharing, currentPostId]);

  const onClickLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const cancelShare = () => {
    setIsSharing(false);
    setCurrentPostId(null);
  };

  const clickShare = (id) => {
    setCurrentPostId(id);
    setIsSharing(true);
  };

  const copyToClipboard = () => {
    if (linkInputRef.current) {
      linkInputRef.current.select();
      document.execCommand("copy");
      alert("Link copied to clipboard!");
    }
  };

  const shareToSocialMedia = (platform) => {
    if (!shareLink) return;

    const encodedUrl = encodeURIComponent(shareLink);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}`,
      discord: `https://discord.com/channels/@me?content=${encodedUrl}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=YOUR_FACEBOOK_APP_ID&redirect_uri=${encodedUrl}`,
      instagram: () => {
        copyToClipboard();
        alert(
          "Link copied to clipboard! Instagram doesn't support direct sharing via web. Please paste this link in your Instagram app."
        );
      },
    };

    if (platform === "instagram") {
      shareUrls.instagram();
      return;
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const renderBackend = () => (
    <div className="posts-container">
      {backendData.map((eachPost) => (
        <Post
          userDetails={eachPost}
          key={eachPost.id || eachPost.uniqueKey}
          clickShare={() => clickShare(eachPost.id)}
        />
      ))}
      {isLoading && (
        <div className="feed-loader">
          <SyncLoader color="#3172ce" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );

  const handleAddPost = () => {
    navigate("/add-post");
  };

  return (
    <div className="feeds-container">
      <div
        className="feeds-header-container"
        onClick={() => navigate("/profile")}
      >
        <img
          src={
            localStorage.getItem("lsProfilePicImg") ||
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt="logo"
          className="header-logo-img"
        />
        <div className="feed-info-container">
          <p className="welcome-text">Welcome Back,</p>
          <h2 className="username-feed-heading">
            {localStorage.getItem("lsProfileUsername") || "Unknown"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClickLogout}
          className="feed-logout"
        >
          <BiLogOut />
        </button>
      </div>
      <h1>Feeds</h1>

      <button type="button" className="add-post-btn" onClick={handleAddPost}>
        <BsPlusLg />
      </button>

      {isSharing && (
        <div className="share-bg-container">
          <div className="share-container">
            <div className="share-header">
              <h3>Share post</h3>
              <button onClick={cancelShare} id="cancelbutton-icon">
                <IoClose />
              </button>
            </div>
            <div className="share-apps-cont">
              <div className="app-cont">
                <button
                  id="twitter"
                  onClick={() => shareToSocialMedia("twitter")}
                >
                  <FaTwitter />
                </button>
                <p className="app-desp">Twitter</p>
              </div>
              <div className="app-cont">
                <button
                  id="facebook"
                  onClick={() => shareToSocialMedia("facebook")}
                >
                  <FaFacebook />
                </button>
                <p className="app-desp">Facebook</p>
              </div>
              <div className="app-cont">
                <button
                  id="reddit"
                  onClick={() => shareToSocialMedia("reddit")}
                >
                  <FaRedditAlien />
                </button>
                <p className="app-desp">Reddit</p>
              </div>
              <div className="app-cont">
                <button
                  id="discord"
                  onClick={() => shareToSocialMedia("discord")}
                >
                  <FaDiscord />
                </button>
                <p className="app-desp">Discord</p>
              </div>
              <div className="app-cont">
                <button
                  id="whatsapp"
                  onClick={() => shareToSocialMedia("whatsapp")}
                >
                  <IoLogoWhatsapp />
                </button>
                <p className="app-desp">WhatsApp</p>
              </div>
              <div className="app-cont">
                <button
                  id="messenger"
                  onClick={() => shareToSocialMedia("messenger")}
                >
                  <FaFacebookMessenger />
                </button>
                <p className="app-desp">Messenger</p>
              </div>
              <div className="app-cont">
                <button
                  id="telegram"
                  onClick={() => shareToSocialMedia("telegram")}
                >
                  <RiTelegram2Fill />
                </button>
                <p className="app-desp">Telegram</p>
              </div>
              <div className="app-cont">
                <button
                  id="instagram"
                  onClick={() => shareToSocialMedia("instagram")}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_168)">
                    <path d="M1.50034 1.6328C-0.385665 3.5918 0.000335511 5.6728 0.000335511 11.9948C0.000335511 18.3308 -0.157664 19.4938 0.602336 21.0698C1.23734 22.3878 2.45034 23.3778 3.87834 23.7468C5.02234 24.0408 5.78234 23.9998 11.9783 23.9998C17.1723 23.9998 18.7883 24.0928 20.1353 23.7448C22.1313 23.2298 23.7553 21.6108 23.9773 18.7878C24.0083 18.3938 24.0083 5.6028 23.9763 5.2008C23.7403 2.1938 21.8893 0.460802 19.4503 0.109802C18.8903 0.0288023 18.7783 0.00480225 15.9103 -0.000197746C5.73734 0.00480225 3.50734 -0.448198 1.50034 1.6328Z" fill="url(#paint0_linear_1_168)"/>
                    <path d="M11.998 3.139C8.367 3.139 4.919 2.816 3.602 6.196C3.058 7.592 3.137 9.405 3.137 12.001C3.137 14.279 3.064 16.42 3.602 17.805C4.916 21.187 8.392 20.863 11.996 20.863C15.473 20.863 19.058 21.225 20.391 17.805C20.936 16.395 20.856 14.609 20.856 12.001C20.856 8.539 21.047 6.304 19.368 4.626C17.668 2.926 15.369 3.139 11.994 3.139H11.998ZM11.204 4.736C15.55 4.729 19.015 4.129 19.21 8.419C19.282 10.008 19.282 13.99 19.21 15.579C19.021 19.716 15.871 19.262 11.999 19.262C8.587 19.262 6.895 19.383 5.755 18.242C4.598 17.085 4.736 15.431 4.736 11.997C4.736 7.926 4.351 4.971 8.419 4.784C9.236 4.747 9.553 4.736 11.204 4.734V4.736ZM16.728 6.207C16.141 6.207 15.665 6.683 15.665 7.27C15.665 7.857 16.141 8.333 16.728 8.333C17.315 8.333 17.791 7.857 17.791 7.27C17.791 6.683 17.315 6.207 16.728 6.207ZM11.998 7.45C9.485 7.45 7.448 9.488 7.448 12.001C7.448 14.514 9.485 16.551 11.998 16.551C14.511 16.551 16.547 14.514 16.547 12.001C16.547 9.488 14.511 7.45 11.998 7.45ZM11.998 9.047C13.629 9.047 14.951 10.37 14.951 12.001C14.951 13.632 13.629 14.955 11.998 14.955C10.367 14.955 9.045 13.632 9.045 12.001C9.045 10.369 10.367 9.047 11.998 9.047Z" fill="white"/>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear_1_168" x1="1.5649" y1="22.4431" x2="23.8428" y2="3.16101" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFDD55"/>
                    <stop offset="0.5" stopColor="#FF543E"/>
                    <stop offset="1" stopColor="#C837AB"/>
                    </linearGradient>
                    <clipPath id="clip0_1_168">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                </button>
                <p className="app-desp">Instagram</p>
              </div>
            </div>
            <div className="share-footer">
              <p>Page Link</p>
              <div className="copy-container">
                <input
                  id="clip-input"
                  type="text"
                  value={shareLink}
                  onChange={(e) => setShareLink(e.target.value)}
                  ref={linkInputRef}
                />
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={copyToClipboard}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d="M2.00037 3.10656L2 11.125C2 12.7819 3.28942 14.1375 4.91953 14.2434L5.125 14.25L10.643 14.2509C10.3854 14.9787 9.69106 15.5 8.875 15.5H4.5C2.42893 15.5 0.75 13.8211 0.75 11.75V4.875C0.75 4.05848 1.27193 3.36386 2.00037 3.10656ZM11.375 0.5C12.4105 0.5 13.25 1.33947 13.25 2.375V11.125C13.25 12.1605 12.4105 13 11.375 13H5.125C4.08947 13 3.25 12.1605 3.25 11.125V2.375C3.25 1.33947 4.08947 0.5 5.125 0.5H11.375Z"
                    fill="#212121"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {renderBackend()}
    </div>
  );
};

export default Feeds;