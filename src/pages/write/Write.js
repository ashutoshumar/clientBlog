import React,{useState,useContext} from 'react'
import "./write.css"
import axios from "axios";
import { Context } from '../../context/Context';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export const Write = () => {
  const [selectedCategories,setSelectedCategories]=useState([])
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
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
    };
   
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
       const res= await axios.post("http://localhost:5000/upload", data);
        console.log(res)
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://localhost:5000/posts/post", newPost);
       window.location.replace("http://localhost:3000/post/" + res.data._id);
    } catch (err) {
      console.log(err)
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
             <label htmlFor='fileInput'><i className="writeIcon fa-solid fa-plus"></i></label>
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
           <textarea placeholder='Tell your story...' type='text' className='writeInput writeText'   onChange={e=>setDesc(e.target.value)}></textarea> 
            {/* <ReactQuill className='writeInputt writeText'  value={desc} modules={modules} formats={formats}  placeholder='Tell your story...' onChange={onChangeH}></ReactQuill> */}
         </div>
         <button className='writeSubmit' type='submit'>Publish</button>
          </form>  
        
        
        </div>
  )
}
