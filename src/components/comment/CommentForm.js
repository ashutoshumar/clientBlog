import React,{useState,useContext} from 'react'
import { Context } from '../../context/Context';
import axios from 'axios';
export const CommentForm = ({postId}) => {
    const { user, dispatch } = useContext(Context);
    const [error, setError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({ username:  user.username, email:  user.email, comment:null,postId:postId});
    
    const [comment, setComment] = useState("");
    
   

      const handlePostSubmission = async (e) => {
        e.preventDefault();
        setError(false);       
   
    const commentObj = {
      username: user.username,
      comment:comment,
      email: user.email,
      postId:postId,
    };

    console.log(commentObj)
        try {
          const res = await axios.post("http://localhost:5000/comment/post", commentObj);
          console.log(res)
          setShowSuccessMessage(true)
          setComment(' ')
        } catch (err) {
          console.log(err)
        }
    
    }
    
    
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ml-6 mr-6">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave A Reply</h3>
    <form  onSubmit={handlePostSubmission}>
    <div className="grid grid-cols-1 gap-4 mb-4">
  
      <textarea value={comment} onChange={e=>setComment(e.target.value)} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <input type="text" value={user.username}  disabled = {true} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="name" />
      <input type="email" value={user.email} disabled = {true}  className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
    </div>
   
    {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
    <div className="mt-8">
      <button type='submit'  className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
      {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted</span> }
    
    </div>
    </form>
  </div>
  )
}
