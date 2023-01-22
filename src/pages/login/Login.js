import React from 'react'
import "./login.css"
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import axios from "axios"
import { axiosInstance } from '../../config'

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { user,dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
console.log(user)
  return (
    <div className='login'>
        <span className='loginTitle'>Login</span>
        <form className='loginForm' onSubmit={handleSubmit}>  
            <lable>Email</lable>
            <input type='email' placeholder='Enter your email...' ref={emailRef}/>
            <lable>Password</lable>
            <input type='password' placeholder='Enter your Password...' ref={passwordRef} />
            <button type='submit' className='transition duration-500 transform hover:-translate-y-1 inline-block bg-red-600 text-lg  font-medium rounded-full text-white px-8 py-3 mt-10 cursor-pointer' disabled={isFetching}>Login</button>
        </form>
        {/* <button className='loginRegisterButton'> <Link className='link' to='/register'  >Register</Link></button> */}
        </div>
  )
}
