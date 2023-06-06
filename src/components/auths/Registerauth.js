import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export default function Registerauth(props) {
  const navigate = useNavigate();
  const { setData} = props;
  const [data, setUserData] = useState(null);
  const onChange = (e) => {
    setUserData({ ...data, [e.target.name]: e.target.value })
  }
  useEffect(()=>{
    if(localStorage.getItem('registered')==='true'){
      navigate('/');
    }
  })
  const saveData = () => {
    if (localStorage.getItem('user')) {
      fetch(`https://apifromfb.onrender.com/api/update/Users?id=${localStorage.getItem('user')}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data, registered: true
        })
      })
        .then(() => {
          localStorage.setItem('registered', true)
          navigate('/', { replace: true })
          setData({...data, registered: true })
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      navigate('/auth');
    }
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
            display: "flex",
            marginTop: "1rem",
            flexDirection: "column",
          }}>
            <h1 style={{
              fontSize: "1.5rem",
              lineHeight: "2rem",
            }}>Register</h1>
            <label htmlFor="username">Name&nbsp;</label>
            <input onChange={(e) => onChange(e)} style={{
              borderRadius: "0.5rem",
            }} name="username" type="text" />
            <label htmlFor="email">Email&nbsp;</label>
            <input onChange={(e) => onChange(e)} style={{
              borderRadius: "0.5rem",
            }} name="email" type="text" />
            <label htmlFor="demo">Demo&nbsp;</label>
            <input onChange={(e) => onChange(e)} style={{
              borderRadius: "0.5rem",
            }} name="demo" type="text" />
            <button onClick={() => saveData()} style={{
              backgroundColor: "#FBBF24",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              fontWeight: "600",
              width: "7rem",
              height: "2.5rem",
              borderRadius: "9999px",
            }}>Submit</button>
            <Link to={'/'}>Skip for now</Link>
          </div>
        </div>
      </div>
    </>
  )
}
