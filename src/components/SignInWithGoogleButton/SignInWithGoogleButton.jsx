import React from "react";
import "./signInWithGoogleButton.scss";

const SignInWithGoogleButton = ({ ...props }) => {
  return (
    <button type="button" className="login-with-google-btn" {...props}>
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
