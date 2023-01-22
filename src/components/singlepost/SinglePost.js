import React,{useEffect,useContext} from 'react'
import "./singlepost.css"
import axios from "axios"
import ReactMarkdown from 'react-markdown'
import {Link,
  useParams,
} from "react-router-dom"
import { useState } from 'react'
import { Context } from "../../context/Context";
import { CommentForm } from '../comment/CommentForm'
import { Comments } from '../comment/Comments'
import { axiosInstance } from '../../config'
export const SinglePost = () => {
  const params = useParams()
  const PF = "https://bloggerashu.herokuapp.com/images/";
  const [post,setPost] = useState({})
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  useEffect(()=>{
    const fetchPost = async ()=>{
     const res= await axiosInstance.get(`/posts/${params.postId}`)
     setPost(res.data)
     setTitle(res.data.title)
     setDesc(res.data.description)
    
    }
    fetchPost()
 },[params])

 const handleDelete = async () => {
  try {
    await axiosInstance.delete(`/posts/${post._id}`, {
      data: { username: user.username },
    });
    window.location.replace("/");
  } catch (err) {}
};

const handleUpdate = async () => {
  try {
    await axiosInstance.put(`/posts/${post._id}`, {
      username: user.username,
      title:title,
      description:desc,
    });
    setUpdateMode(false)
  } catch (err) {}
};


  return (
    <>
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-5 pb-10 ml-6  mr-6  mb-8">
      <div className='flex flex-col mt-0'>
        {
          post.photo &&  (
            <div className='relative overflow-hidden shadow-md pb-80 mt-1 mb-6 mt-0'> 
            <img  src={post.photo} alt=''className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-md"/>
                    </div>
          )
        }
         {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
  
  <h1 className='singlePostTitle'>{title}
  {post.username === user?.username && (
  <div className='singlePostEdit'>
  <i className="singlePostIcon fa-solid fa-pen-to-square"  onClick={() => setUpdateMode(true)}></i>
  <i className="singlePostIcon fa-solid fa-trash-can"  onClick={handleDelete}></i>
  </div>
   )}
  </h1>
        )}

  <div className='singlePostInfo'>
    <span className='singlePostAuthor ml-5 md:text-base  sm:text-sm '>Author: <Link className='link' exact to={`/?user=${post.username}`}><b>{post.username}</b></Link></span>
    <span className='singlePostDate mr-2 md:text-base  sm:text-sm'>{new Date(post.createdAt).toDateString()}</span>

  </div>
  {updateMode ? (
           <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
         />
         
        ) : (
  <p className='SinglePostDescription md:ml-5 md:mr-5 ms:ml-5 ms:mr-5 md:text-base  sm:text-base'><ReactMarkdown>{desc}</ReactMarkdown></p>
        )}

    {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>


      </div>
      {
        user &&   <CommentForm postId={post._id}/>
      }
     
       <Comments postId={post._id}/>
      </>
  )
}
