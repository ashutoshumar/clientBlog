import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./sidebar.css"
import { useLocation} from "react-router-dom";
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config';
export const Sidebar = ({catt}) => {
  const PF = "https://bloggerashu.herokuapp.com/images/";
  const [posts,setPosts] = useState([])
  const {search} =useLocation()

  useEffect(()=>{
    setPosts([])
     const fetchPost = async ()=>{
      const res= await axiosInstance.get("/posts"+search)   
      var i=0  
     const revKey=Object.keys(res.data).reverse()
      console.log(revKey)
      revKey.forEach(key=>{
        if(i<=2){
          console.log(res.data[key])
          setPosts(posts => [...posts, res.data[key]])
        }
        i++
        
      })
       
        
        console.log(posts)
      
     
     }
     fetchPost()
  },[search])
 
 

  return (
    <div  className='bg-white shadow-lg rounded-lg p-8 mb-8 mr-6 ml-6'>
    
    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
    { search?( "Releted Post"):("Recent Post")}
        </h3>
        {
         
            posts.map((post)=>(
              <div key={post.title} className="flex items-center w-full mb-4">
              <div className='w-16 flex-none'>                                                
                    <img  alt={post.title}
                             height='60px'
                             width='60px'
                             className='align-middle rounded-full'
                             src={post.photo}
                    />
               </div>
               <div className='flex-grow ml-4'>
                  <p className='text-gray-500 font-xs'>
                  {new Date(post.createdAt).toDateString()}
                  </p>
                  <Link exact to={`/post/${post._id}`} key={post.title} className='text-md'>
                    {post.title}
                  </Link>
               </div>
               </div>
            
             ))
           }
    
          
          
       
        
     

    
    

    </div>
  )
}
