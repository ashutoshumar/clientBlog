import React,{useState,useContext} from 'react'
import "./write.css"
import { projectStorage } from '../../firbase/config';
import { Context } from '../../context/Context';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { axiosInstance } from '../../config';
export const Write = () => {
  const [selectedCategories,setSelectedCategories]=useState([])
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [userpic,setUserpic] = useState("")
  const { user } = useContext(Context);
  console.log("hiiq")
  console.log(user.username)
  const style = {
    control: (base, state) => ({
      ...base,
      border: '1px solid rgb(59,59,59)',
      boxShadow: 'none',
      '&:hover': {
          border: '1px solid rgb(59,59,59)',
      }
  })
  };
  const options = [
    { value: 'dance', label: 'dance' },
    { value: 'music', label: 'music'},
    { value: 'love', label: 'love' },
    { value: 'tech', label: 'tech' },
    { value: 'movies', label: 'movies' },
    { value: 'nature', label: 'nature' }
  ]
  const animatedComponents = makeAnimated();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.username)
    console.log("user.username")
    const newPost = {
      username: user.username,
      title:title,
      description: desc,
      categories:selectedCategories,
      photo:userpic
    };
   
    if (file) {
      // const data =new FormData();
      // const filename = Date.now() + file.name;
      // data.append("name", filename);
      // data.append("file", file);
      // newPost.photo = filename;
      // try {
      //  const res= await axiosInstance.post("/upload", data);
      //   console.log(res)
      // } catch (err) {}
      const storageRef = projectStorage.ref(file.name);
      storageRef.put(file).on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        //setProgress(percentage);
      }, (err) => {
        // setError(err);
       console.log(err)
      }, async () => {
        const url = await storageRef.getDownloadURL();
        const newPost = {
          username: user.username,
          title:title,
          description: desc,
          categories:selectedCategories,
          photo:url
        };
        console.log(url)
        try {
          console.log(newPost.photo)
         const res = await axiosInstance.post("/posts/post", newPost);
          window.location.replace("https://creative-cajeta-34d982.netlify.app/post/" + res.data._id);
        } catch (err) {
          console.log(err)
        }
       
      });
     

      
    }
    else
    {
      try {
        console.log(newPost.photo)
       const res = await axiosInstance.post("/posts/post", newPost);
        window.location.replace("https://creative-cajeta-34d982.netlify.app/post/" + res.data._id);
        
      } catch (err) {
        console.log(err)
      }
    }
  
  };

  const handleChangemulti=(optionss)=>{
    var i=[]

    
      for (const opt of optionss) {
        i.push(opt.value)}

        setSelectedCategories(i)
    }

    
  
  return (
    <div className='write'>
 {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
         <div className='writeFormGroup'>
             <label htmlFor='fileInput'><i className="writeIcon fa-solid fa-plus "></i></label>
             <input type='file' id='fileInput' style={{display:"none"}}  onChange={(e) => setFile(e.target.files[0])}/>
             <input type='text' placeholder='Title' className='writeInput' autoFocus={true}    onChange={e=>setTitle(e.target.value)}/>

         </div>
       
         <div  className='multiSelect'>
         <Select  placeholder="Select Categories..." 
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      styles={style}
      onChange={(e)=>{handleChangemulti(e)}}/>

         </div>
         <div className='writeFormGroup'>
           <textarea placeholder='Tell your story...
           
{      MARKDOWN SUPPORTED
   for Headings use
     # Heading 1
     ## Heading 2
     ### Heading 3
   for Text use
     *italic*
     **bold**
     ***bold-italic***
     [link](https://example.com)
   for Images use
     ![m](https://i.imgur.com/v8IVDka.jpg)
}' type='text' className='writeInput writeText md:text-base  sm:text-base'   onChange={e=>setDesc(e.target.value)}></textarea> 
            {/* <ReactQuill className='writeInputt writeText'  value={desc} modules={modules} formats={formats}  placeholder='Tell your story...' onChange={onChangeH}></ReactQuill> */}
         </div>
         <button className='writeSubmit transition duration-500 ease hover:bg-indigo-900 inline-block bg-teal-600  rounded-full text-white  cursor-pointer' type='submit'>Publish</button>
          </form>  
        
        
        </div>
  )
}
