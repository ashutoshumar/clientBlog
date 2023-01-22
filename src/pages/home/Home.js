import React,{useState} from 'react'


import axios from "axios"
import { Header } from '../../components/header/Header'
import { Posts } from '../../components/posts/Posts'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { useEffect } from 'react'
import { useLocation} from "react-router-dom";
import { Category } from '../../components/category/Category'
import { axiosInstance } from '../../config'
export const Home = () => {
  const [posts,setPosts] = useState([])
  const {search} =useLocation()
  useEffect(()=>{
     const fetchPost = async ()=>{
      const res= await axiosInstance.get("/posts"+search)
      setPosts(res.data)
     
     }
     fetchPost()
  },[search])
  return (
  
    <div >
      <Header/> 
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'>
          <Posts posts={posts}/> 
          </div>
          <div className='lg:col-span-4 col-span-1'>
          <Sidebar /> 
            <div className='lg:sticky relative top-8'>
         
            <Category/>
            </div>
          
            </div>
            </div> 
        </div>
    
   
  )
}
