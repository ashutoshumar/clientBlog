import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import { Transition } from "@headlessui/react";
export const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "https://bloggerashu.herokuapp.com/images/"
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return(
    
     
        <nav >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
            <div className="flex items-center  justify-between h-16  border-b w-full inline-block border-blue-400 py-8">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                <span className="cursor-pointer font-bold  text-white">
                   Ashu's Blog
                </span>
                </div>
                <div className="hidden md:block ">
                  <div className="ml-10 flex items-baseline space-x-4">
                  <Link className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/'  >Home</Link>
              
                  <Link className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/'  >About</Link>
  
                  <Link className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/'  >Contact</Link>
  
                  <Link className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"to='/write'  >Write</Link>
  
                
                 
                  {
                  user?(

                    <ul>

                     
                    <li className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>Logout</li>  
                    </ul>
                     
                   ):(
                      <>
                     
                    <Link className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/login'  >Login</Link>
                  
                    <Link className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium" to='/register'  >Register</Link>
                    </>
                 )
                 }
                  </div>
                </div>
               
               
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>


              {
                    user &&  <Link className="hidden md:block  py-2  mr-5  float-right"  to='/setting'  > <img class="object-cover h-12 w-12 rounded-full" src={user.profilePic} alt=''/> </Link>
                    
                    
                    }



            </div>
          
          </div>
  
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link  className=" text-white block px-3 py-2 rounded-md text-base font-medium" to='/'  >Home</Link>
              
              <Link  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium" to='/'  >About</Link>

              <Link  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium" to='/'  >Contact</Link>

              <Link  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium" to='/write'  >Write</Link>

              

              {
              user?(<>
              <Link  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium"  to='/setting'  >Setting </Link>
              <li  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={handleLogout}> Logout</li> 
              </> ):(<ul>
              <li >
             <Link  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium" to='/login'  >Login</Link>
              </li>
              <li >
              <Link  className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium" to='/register'  >Register</Link>
              </li>
    
    
    
           </ul>)
             }
                 
                </div>
              </div>
            )}
          </Transition>

        
        </nav>
  
  )

}

/*   return (
    <div className="container mx-auto px-10 mb-8">
      
      <div className="border-b w-full inline-block border-blue-400 py-8">
      <div className="md:float-left block">
          
                <span className="cursor-pointer font-bold text-4xl text-white">
                   Ashu's Blog
                </span>
           
       </div> 
        <ul>
          <li >
          <Link className='link md:float-left mt-2 align middle text-white ml-60 font-semibold cursor-pointer' to='/'  >Home</Link></li>
          <li >  <Link className='link md:float-left mt-2 align middle text-white ml-4 font-semibold cursor-pointer' to='/'  >About</Link></li>
          <li >  <Link className='link md:float-left mt-2 align middle text-white ml-4 font-semibold cursor-pointer' to='/'  >Contact</Link></li>
          <li >  <Link className='link md:float-left mt-2 align middle text-white ml-4 font-semibold cursor-pointer' to='/write'  >Write</Link></li>
          <li className=' md:float-left mt-2 align middle text-white ml-4 mr-10 font-semibold cursor-pointer' onClick={handleLogout}> {user && "Logout"}</li>   
        </ul>
        {
        user?( <Link className='link md:float-right mt-2 align middle text-white ml-4 font-semibold cursor-pointer'  to='/setting'  > <img className='topImage' src={PF+user.profilePic} alt=''/> </Link>):(<ul>
          <li >
          <Link className='link md:float-right mt-2 align middle text-white ml-4 font-semibold cursor-pointer' to='/login'  >Login</Link>
          </li>
          <li >
          <Link className='link md:float-right mt-2 align middle text-white ml-4 font-semibold cursor-pointer' to='/register'  >Register</Link>
          </li>
        
        
        
        </ul>)
      }
      </div>  
    
    
       
    
         
       
      </div>
    // </div>
  ) */