import { ArrowLeft, Trash2Icon, LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios.js";
import toast from "react-hot-toast"

const NoteDetailPage = () => {
  const [note,setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving,setSaving] = useState(false) // saving tracks whether the note is currently being saved (or updated) to the backend.

const {id} = useParams();  // useParam() - it's job is to extract dynamic parameters from the given URL
const navigate = useNavigate()

const handleDelete = async () => {
   if (!window.confirm("Do you want to delete the note?")){return;}  
   try {
    await api.delete(`/notes/${id}`)
    toast.success("Note Deleted Successfully")
    navigate("/") //navigates back to homePage after deleting a note
   } catch (error) {
    console.log("Error to delete the note: ", error)
    toast.error("Error Deleting the Note")
   }
}

const handleSave = async () => {
  if (!note.title.trim() || !note.content.trim()){
    toast.error("Please enter both title and content")
  };
  setSaving(true) // tells that the saving process has started (displays "Saving..." UI)
  try {
    await api.put(`/notes/${id}`, note)
    toast.success("Note Update Successfully")
    navigate("/")
  } catch (error) {
    console.log("Error Updating Note: ", error)
    toast.error("Error Updating Note!")
  } finally {
    setSaving(false)
  }
};

useEffect(() => {
  const fetchNote = async () => {
    // use the noteID, to load the note title & content from the passed ID
    try {
      const res = await api.get(`/notes/${id}`)
      setNote(res.data)
    } catch (error) {
      console.log("Error Fetching Notes: ", error)
      toast.error("Error Fetching Notes");      
    } finally {
      setLoading(false);
    }
  } 
  fetchNote();
},[id]) //dependecies

if (loading){
  return <div className="min-h-screen bg-base-200 flex justify-center items-center"> 
  <LoaderIcon className="animate-spin size-10"> </LoaderIcon>
  </div>
}

console.log({note}) // console logging data to see if fetch succesfull

  return (
    <div className="max-h-screen"> 
    <div className="container mx-auto max-w-6xl border py-8 px-4 border-white "> 
    <div className="max-w-2xl mx-auto border border-white"> {/*Ensures the form doesn’t stretch too wide on big screens */}

      <div className="flex justify-between items-center">
      <Link to="/" className="btn btn-ghost mb-6"> 
      <ArrowLeft/>
      Back to Note</Link>
      <div className="btn btn-primary flex flex-row">  
        <Trash2Icon className="size-4"/>
        <button onClick={handleDelete}>  Delete Note </button>
      </div>
      </div>

      <div className="card bg-base-100">
      <div className="card-body border border-black">
        <h2 className="card-title text-2xl mb-4 border border-white"> Note Details Page </h2>
        <div className="form-control mb-4"> {/* form-control = wrapper that neatly stacks a label and its input with proper spacing and alignment.  */}
          <label className="label"> {/*label & label-text: styles the text inside the label nicely according to DaisyUI */}
            <span className="label-text"> Title </span> 
          </label>
          <input 
          type="text"
          placeholder="Enter Title"
          className="input input-bordered"
          value = {note.title} 
          onChange={(e) => setNote( {...note,title: e.target.value})}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text"> Content here </span>
          </label>
          <textarea
          placeholder="Enter Content"
          className="textarea textarea-bordered h-32"
          value = {note.content} 
          onChange={(e) => setNote({...note,content: e.target.value})}
          />
        </div> 

        <div className="card-action flex justify-end"> 
          <button className="btn btn-primary " disabled={saving} onClick={handleSave}>
            {saving? "Saving...":"Save Changes"}
          </button>
        </div>

      </div>
      </div>

    </div>
    </div>
    </div>
  )
}

export default NoteDetailPage;
