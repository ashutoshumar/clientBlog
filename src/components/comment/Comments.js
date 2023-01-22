import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { axiosInstance } from '../../config';
export const Comments = ({postId}) => {
  const [comments, setComments] = useState([]);
  useEffect(()=>{
    const fetchPost = async ()=>{
     const res= await axiosInstance.get(`/comment/${postId}`)
     setComments(res.data)
    
    
    }
    fetchPost()
 },[postId])
  return (
    <>
    {comments.length > 0 && (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ml-6 mr-6">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {comments.length}
          {' '}
          Comments
        </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.username}</span>
               
                <span className=' float-right text-xs text-gray'>
                {' '}
                on
                {' '}
                {new Date(comment.createdAt).toDateString()} </span>
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">{comment.comment}</p>
            </div>
          ))}
      </div>
    )}
  </>
  )
}
