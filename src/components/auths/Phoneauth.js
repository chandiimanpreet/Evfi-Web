import React, { useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { useState } from 'react';

import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router';

const firebaseConfig = {
    apiKey: "AIzaSyAM-1D3n2gZfU05D8SKpDT7WWPYQlGH5mk",
    authDomain: "evfi-prod.firebaseapp.com",
    databaseURL: "https://evfi-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "evfi-prod",
    storageBucket: "evfi-prod.appspot.com",
    messagingSenderId: "758735537136",
    appId: "1:758735537136:web:f0cec73edea6123e55d335"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default function Phoneauth(props) {
    const {phone ,setNumber}=props;
    const navigate=useNavigate();
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
            size: "normal",
            callback: function (response) {
                submitPhoneNumberAuth();
            }
        }, auth);
        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
    },[])
    
    const submitPhoneNumberAuth = () => {
        let phone = document.getElementById('phone').value;
        phone = "+91" + phone;
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                navigate('/otpauth',{replace:true})
            })
            .catch((error) => {
                console.log("Wrong");
            })
    }
    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
            }}>
                <div style={{
                    display: "flex",
                    position: "relative",
                    top: "6rem",
                    padding: "2rem",
                    backgroundColor: "#1F2937",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "24rem",
                    borderRadius: "0.5rem",
                    borderColor: "#FBBF24",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}>
                    <img alt="img.." style={{
                        padding: "0.5rem",
                        marginLeft: "7rem",
                        marginLeft: "8rem",
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "0.5rem",
                        borderWidth: "2px",
                        borderColor: "#F59E0B",
                    }} src={require('../../light.png')} />
                    <div style={{
                        marginTop: "2.5rem",
                    }} >
                        <p style={{
                            color: "#ffffff",
                            fontSize: "1.5rem",
                            lineHeight: "2rem",
                            fontWeight: "700",
                        }}>&nbsp;&nbsp;&nbsp;Start Your Journey With<br /><span style={{
                            margin: "7rem",
                            color: "#FCD34D",
                        }}>&nbsp;&nbsp;EVFI</span></p>
                        <div style={{
                            display: "flex",
                            marginTop: "1rem",
                            flexDirection: "column",
                        }}>
                            <label htmlFor="name" style={{
                                marginTop: "0.5rem",
                                color: "#ffffff",
                            }}>Enter phone number </label>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <div style={{
                                    padding: "0.125rem",
                                    fontSize: "1.125rem",
                                    lineHeight: "1.75rem",
                                    width: "2.5rem",
                                    height: "2rem",
                                    borderRadius: "0.5rem",
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0",
                                    borderWidth: "2px",
                                    borderColor: "#1F2937",
                                }}>
                                    +91
                                </div>
                                <input onChange={(e) => {
                                    setNumber(e.target.value)
                                }} style={{
                                    paddingLeft: "0.5rem",
                                    fontSize: "1.125rem",
                                    lineHeight: "1.75rem",
                                    fontSize: "1.25rem",
                                    lineHeight: "1.75rem",
                                    letterSpacing: "0.1em",
                                    width: "18rem",
                                    height: "2rem",
                                    borderRadius: "0.5rem",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0",
                                    borderWidth: "2px",
                                    borderLeftWidth: "0",
                                    borderColor: "#1F2937",
                                    outline: "0",
                                }} maxLength="10" id="phone" name="phone" type="tel" ></input>
                            </div>
                            <div style={{
                                marginLeft: "0.75rem",
                            }} id="recaptcha-container"></div>
                            <button onClick={(e) => {
                            }} style={{
                                margin: "6rem",
                                backgroundColor: "#FBBF24",
                                fontSize: "1.125rem",
                                lineHeight: "1.75rem",
                                fontWeight: "600",
                                width: "8rem",
                                height: "2rem",
                                borderRadius: "9999px",
                            }}>Get OTP</button>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}
