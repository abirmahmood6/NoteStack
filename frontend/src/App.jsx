import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Navbar from "./components/Navbar";
import toast from "react-hot-toast"; //import toast for success/error msg animations
/*
  Todo - 1) Review: understand NOTECARD component and homepg line 55, 25min
         2) start CreatPage from vdo 2hr30min, 25min
         3) !! codepath review Unit, 25 min
*/

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path ="/" element={<HomePage />}/>
        <Route path ="/create" element={<CreatePage />}/>
        <Route path ="/note/:id" element={<NoteDetailPage />}/>
      </Routes>
      { /*<Footer/>*/ }
      
    </div>
  )
}

export default App;



{/*
      <button className="btn btn-primary" > Click me </button>
      <button onClick={()=> toast.success("YUR")}> Test Button </button> 
        ✅ onClick={ () => toast.success("YUR")} → means “run this when clicked.” 
        ❌ onClick{toast.success("YUR")} → means “run this right now.” */}
    