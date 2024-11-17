import React from "react";
import './styles/SignInOrOutPage.css';
import SignInButton from "../components/SignInButton";

export const SignOutPage = () => {
    return(
        <div className="signout-container">
            <h1 className="title">TritonFit</h1>
            <p className="message">You've been logged out!</p>
            <SignInButton/>
        </div>
    );
};
