import React from 'react'
import { useNavigate } from 'react-router';

export default function Otpauth(props) {
    const navigate = useNavigate();
    const { phone, setData } = props;
    const submitCode = () => {
        let code = document.getElementById("codes").value;
        console.log(code);
        window.confirmationResult.confirm(code)
            .then((result) => {
                let user = result.user;
                console.log(user.uid);
                window.alert("user verified successfully");
                fetch(`https://apifromfb.onrender.com/api/get/Users?id=${user.uid}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.msg) {
                            fetch(`https://apifromfb.onrender.com/api/Users?id=${user.uid}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    "mobile": phone,
                                    "registered": false
                                })
                            }).then(() => {
                                localStorage.setItem("user", user.uid);
                                localStorage.setItem("registered", false)
                                setData({
                                    "mobile":phone,
                                    "registered":false
                                })
                                navigate('/register', { replace: true })
                            })
                                .catch((error) => {
                                    console.log(error);
                                })
                        } else {
                            console.log("e");
                            localStorage.setItem('user', user.uid)
                            setData(data);
                            if (data.registered === true) {
                                localStorage.setItem('registered', true)
                                navigate('/', { replace: true })
                            } else {
                                localStorage.setItem('registered', false)
                                navigate('/register');
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log("error");
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
                            <p style={{
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                            }}>Enter 6-digit OTP that has been sent to +91***{phone[7] + "" + phone[8] + "" + phone[9]}</p>
                            <input id="codes" style={{
                                paddingLeft: "1rem",
                                marginLeft: "6rem",
                                fontSize: "1.25rem",
                                lineHeight: "1.75rem",
                                letterSpacing: "0.1em",
                                width: "7rem",
                                height: "2rem",
                                borderRadius: "0.375rem",
                            }} type="text" maxLength={6} minLength={6} name="code" />
                            <p style={{
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                            }}>Did't receive the OTP? <button type="button" style={{
                                color: "#FBBF24",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                            }}>RESEND OTP</button></p>
                            <div style={{
                                display: "flex",
                                paddingTop: "1rem",
                                marginLeft: "2rem",
                            }}>
                                <button onClick={() => submitCode()} type="button" style={
                                    {
                                        backgroundColor: "#FBBF24",
                                        fontSize: "1.125rem",
                                        lineHeight: "1.75rem",
                                        fontWeight: "600",
                                        width: "7rem",
                                        height: "2rem",
                                        borderRadius: "9999px",
                                    }
                                }>Submit OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
