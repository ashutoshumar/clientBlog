import React from 'react'
import "./setting.css"  
import { projectStorage } from '../../firbase/config'  
import { useContext,useState } from 'react'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config'
import useStorage from '../../firebasehooks/useStorage'

export const Setting = () => {
  const [file, setFile] = useState(null);
 
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://bloggerashu.herokuapp.com/images/"
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [userpic,setUserpic] = useState(user.profilePic)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      profilePic:userpic
     
      
    };
    if (file) {
      // const data = new FormData();
      // const filename = Date.now() + file.name;
      // data.append("name", filename);
      // data.append("file", file);
      // updatedUser.profilePic = filename;
      // try {
      //   await axiosInstance.post("/upload", data);
      // } catch (err) {}
       const storageRef = projectStorage.ref(file.name);
       storageRef.put(file).on('state_changed', (snap) => {
         let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
         //setProgress(percentage);
       }, (err) => {
         // setError(err);
        console.log(err)
        },
        async () => {
         const url = await storageRef.getDownloadURL();
        
         const updatedUser = {
          userId: user._id,
          username,
          email,
          password,
          profilePic:url
         
          
        };
         console.log(url)

         try {
          console.log(updatedUser.profilePic)
          const res = await axiosInstance.put("/users/" + user._id, updatedUser);
          setSuccess(true);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
  
  
        }
      
       );
     
       
      
      
     

    }
    else{
      try {
        console.log(updatedUser.profilePic)
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }


    }

  

   
  };
  return (
    <div className='setting'>
        <div className='settingWrapper'>
             <div className='settingTitles'>
               <span className='settingUpdateTitle'>Update Your Account</span>
               <span className='settingDeleteTitle'>Delete Account</span>
             </div>
             <form className='settingForm' onSubmit={handleSubmit}>
               <label>Profile Picture</label>
               <div className='settingsPP'>
                  <img src={file ? URL.createObjectURL(file) : user.profilePic} alt=''/>
                  <label htmlFor='fileInput'>
                 <i className="settingPPIcon fa-solid fa-user"></i>
                 </label>
              
              
                 <input type='file' id='fileInput' style={{display:'none'}}   onChange={(e) => setFile(e.target.files[0])}/>
                 </div>
                 <label>UserName</label>
                 <input type='text' placeholder={user.username}   onChange={(e) => setUsername(e.target.value)} />
                 <label>Email</label>
                 <input type='email'   placeholder={user.email} 
                     onChange={(e) => setEmail(e.target.value)} />
                 <label>Password</label>
                 <input type='password'  onChange={(e) => setPassword(e.target.value)} />
                 <button className='settingSubmit'>Update</button>
                 {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
             </form>
        </div>
      
        </div>
  )
}
