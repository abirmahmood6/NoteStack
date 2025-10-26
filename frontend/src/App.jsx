import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast"; //import toast for success/error msg animations

/*
  Todo - 1) Review the frontend Setup, 25 min
         2) Start the HomePage, 25min
         3) !! codepath review Unit, 25 min
*/

const App = () => {
  return (
    <div data-theme="aqua">
      {/*
      <button className="btn btn-primary" > Click me </button>
      <button onClick={()=> toast.success("YUR")}> Test Button </button> 
        ✅ onClick={ () => toast.success("YUR")} → means “run this when clicked.” 
        ❌ onClick{toast.success("YUR")} → means “run this right now.” */}
      
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>

      <Routes>
        <Route path ="/" element={<HomePage />}/>
        <Route path ="/create" element={<CreatePage />}/>
        <Route path ="/note/:id" element={<NoteDetailPage />}/>
      </Routes>
      
    </div>
  )
}

export default App;
