import React from 'react'
import { Link } from 'react-router-dom'
import "./post.css"
import ReactMarkdown from 'react-markdown'


export const Post = ({post}) => {
  const PF = "https://bloggerashu.herokuapp.com/images/";
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-5 pb-10 ml-6  mr-6  mb-8'>
      {
        post.photo && ( 
    <div className='relative overflow-hidden shadow-md pb-80 mt-1 mb-6'> 
<img  src={post.photo} alt=''className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-md"/>
        </div>
) }
<div className='flex items-center flex-col'>

    {/* <div className='postCats'>

   {post.categories.map((c)=> 
       <span className='postCat'>c.name</span>
      )
      }
    </div> */}
    <Link className='link' exact to={`/post/${post._id}`}>
    <span className='transition duration-700 text-center mb-8 cursor-pointer hover:text-red-600 text-3xl font-semibold'>   {post.title} </span>
    </Link>
    <div className='block lg:flex text-center items-center justify-center mb-2 w-full'>
               <div className='flex items-center justify-center   lg:mb-0 w-full lg:w-auto mr-8'>
               <hr/>
                     <span className='post'>{new Date(post.createdAt).toDateString()}</span>
                      <p className='post inline align-middle mt-3 text-gray-700 ml-2 text-lg'>{post.username}</p>
               </div>
        </div>
       
       
    </div>
    <p className='postDescription text-gray-700 font-normal px-4 lg:px-8 mb-8'><ReactMarkdown>{post.description}</ReactMarkdown></p>
    <div className='text-center mb-8'>
                 <Link exact to={`/post/${post._id}`}>
                     <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg  font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
                       Continue Reading
                     </span>
                 </Link>
            </div>
    </div>
  )
}
