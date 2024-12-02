import React from "react";
import '../styles/SignInOrOutPage.css';
import SignInButton from "../components/SignInButton";

export const SignInPage = () => {
    return(
        <div className="signin-container">
            <h1 className="title">TritonFit</h1>
            <SignInButton/>
        </div>
    );
};
