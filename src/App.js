import { Home } from "./pages/home/Home";
import { Topbar } from "./components/topbar/Topbar";
import { SinglePage } from "./pages/singlePages/SinglePage";
import { Write } from "./pages/write/Write";
import { Setting } from "./pages/settings/Setting";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Route, Routes} from "react-router-dom"
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user}=useContext(Context)
  return (
    <div className="App">
       <Topbar/> 
       <Routes>
        <Route exact path="/" element={ <Home/>} />
        <Route path="/login" element={user? <Home/> :<Login />} />
        <Route path="/register" element={user? <Home/> : <Register/>} />
        <Route path="/setting" element={ user? <Setting/>: <Register/>} />
        <Route exact path="/write" element={user?<Write/>: <Register/>} />
        <Route exact path='/post/:postId' element={ <SinglePage/> }/>
       
         </Routes>
      
    
    
     
    </div>
  );
}

export default App;
