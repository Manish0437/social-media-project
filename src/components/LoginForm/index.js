import { Component } from "react";
import { Navigate } from "react-router-dom";
import {
  LoginFormContainer,
  LoginBg1,
  LoginBg2,
  LoginBg3,
  LoginBg4,
  LoginBg5,
  LoginBg6,
  LoginBg7,
  LoginBg8,
  LoginBg9,
  FormAuthContainer,
  AuthHeadingContainer,
  AuthLogoImg,
  AuthHeading,
  AuthParaDesp,
  FormHeadingContainer,
  SignInButton,
  GoogleImg,
  GoogleBtnTxt,
  ButtonCont,
} from "./styledComponents";

import lgI1 from "../../login-images/lg-i-1.jpg";
import lgI2 from "../../login-images/lg-i-2.jpg";
import lgI3 from "../../login-images/lg-i-3.jpg";
import lgI4 from "../../login-images/lg-i-4.jpg";
import lgI5 from "../../login-images/lg-i-5.jpg";
import lgI6 from "../../login-images/lg-i-6.jpg";
import lgI7 from "../../login-images/lg-i-7.jpg";
import lgI8 from "../../login-images/lg-i-8.jpg";
import lgI9 from "../../login-images/lg-i-9.jpg";
import vibesnapLogo from "../../login-images/vibesnap-logo.png";

import "./index.css";
import { auth, provider } from "../GoogleSignin/config";
import { signInWithPopup } from "firebase/auth";
// import { signInWithRedirect } from "firebase/auth";
class LoginForm extends Component {
  state = { email: "" };
  componentDidMount() {
    const email = localStorage.getItem("email");
    if (email) {
      this.setState({ email });
    }
  }

  handleClick = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      // const data =  await signInWithRedirect(auth, provider);
      const email = data.user.email;
      this.setState({ email });
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  render() {
    const { email } = this.state;

    if (email) {
      return <Navigate to="/feeds" />;
    }
    return (
      <LoginFormContainer>
        <div className="images-cont">
          <LoginBg1 src={lgI1} alt="login-bg-1" />
          <LoginBg2 src={lgI2} alt="login-bg-2" />
          <LoginBg3 src={lgI3} alt="login-bg-3" />
          <LoginBg4 src={lgI4} alt="login-bg-4" />
          <LoginBg5 src={lgI5} alt="login-bg-5" />
          <LoginBg6 src={lgI6} alt="login-bg-6" />
          <LoginBg7 src={lgI7} alt="login-bg-7" />
          <LoginBg8 src={lgI8} alt="login-bg-8" />
          <LoginBg9 src={lgI9} alt="login-bg-9" />
        </div>
        <FormAuthContainer>
          <FormHeadingContainer>
            <AuthHeadingContainer>
              <AuthLogoImg
                src={vibesnapLogo}
                alt="auth-logo-img"
              />
              <AuthHeading>Vibesnap</AuthHeading>
            </AuthHeadingContainer>
            <AuthParaDesp>Moments That Matter, Shared Forever.</AuthParaDesp>
          </FormHeadingContainer>
          <SignInButton type="button" onClick={this.handleClick}>
            <ButtonCont>
              <GoogleImg
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google-logo"
              />
              <GoogleBtnTxt>Continue with Google</GoogleBtnTxt>
            </ButtonCont>
          </SignInButton>
        </FormAuthContainer>
      </LoginFormContainer>
    );
  }
}

export default LoginForm;









