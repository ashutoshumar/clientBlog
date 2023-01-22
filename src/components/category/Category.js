import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './category.css'
import { axiosInstance } from '../../config'
export const Category = () => {
    const [cats,setCats] = useState([])
    useEffect(()=>{
      const getCats = async ()=>{
       const res= await axiosInstance.get(`/categories`)
       console.log(res.data)
       setCats(res.data)
      
      }
      getCats()
   },[])
   
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-12 pb-12 mr-6 ml-6'>

    <h3 className='text-xl text-center mb-2 font-semibold border-b pb-4'>
          Categories
    </h3>
    <ul className='categoryList'>
         {
           cats.map((m)=>
           <Link className='link' exact to={`/?cat=${m.name}`}>
            <li className='categoryListItems'>{m.name}</li>
            </Link>
           )
         }
       
        
       </ul>
     </div>
  )
}
