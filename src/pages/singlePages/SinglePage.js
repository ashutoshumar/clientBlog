import React from 'react'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { SinglePost } from '../../components/singlepost/SinglePost'
import {Category} from '../../components/category/Category'
export const SinglePage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10'>
    <div className='lg:col-span-8 col-span-1'>
    <SinglePost/> 
    </div>
    <div className='lg:col-span-4 col-span-1'>
    <Sidebar /> 
      <div className='lg:sticky relative top-8'>
    
      <Category/>
      </div>
    
      </div>
      </div> 
  )
}
