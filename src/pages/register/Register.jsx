import React,{useState} from 'react'
import "./register.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config'
export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    console.log(username)
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(res)
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className='register '>
        <span className='registerTitle'>Register</span>
        <form className='registerForm' onSubmit={handleSubmit}> 
        <lable>UserName</lable>
            <input type='text' placeholder='Enter your name...'  onChange={(e) => setUsername(e.target.value)} /> 
            <lable>Email</lable>
            <input type='email' placeholder='Enter your email...'  onChange={(e) => setEmail(e.target.value)}/>
            <lable>Password</lable>
            <input type='password' placeholder='Enter your Password...'  onChange={(e) => setPassword(e.target.value)}/>
            
            <button type='submit' className='transition duration-500 transform hover:-translate-y-1 inline-block bg-red-600 text-lg  font-medium rounded-full text-white px-8 py-3 mt-10 cursor-pointer'>Register</button>
          
        </form>
        {/* <button className='registerLoginButton'> <Link className='link' to='/login'  >Login</Link></button> */}
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
  )
}
