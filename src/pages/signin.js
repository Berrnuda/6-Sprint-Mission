import React from "react";
import { Link } from "react-router-dom";
import SigninForm from "../components/Signin/SigninForm";
import SocialLogin from "../components/SocialLogin";
import pandaLogo from "../assets/img/panda_logo.svg";
import "../style/signin.css";

export default function Signin() {
  return (
    <div id="signin-form" className="signin-container">
      <Link to="/" className="signin-logo">
        <img src={pandaLogo} alt="판다마켓" width="396px" />
      </Link>
      <SigninForm />
      <SocialLogin />
      <div className="switch-signup">
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}
