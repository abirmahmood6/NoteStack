import { useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import api from "../lib/axios.js"

// !! understand usage of .card in the divs below
// 1) Continue vdo - 2hr49min,  finish delete functionality UI !!

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false) //false by default, as its true only when "create" btn is clicked

  const navigate = useNavigate(); // useNavigated imported from "react-router"

  const handleSubmit  = async (e) => {
    {/* input validation for title, content */}
    e.preventDefault(e); // prevent from refreshing the page after a submission, allows us to see the toast error messages properly, see the console log(data) etc.
    if (!title.trim() || !content.trim()) { // if no title or content provided, return error. trim() make sure that if user enter "spaces" as input, program will reject it.
      toast.error("All fields are required!");
      return;
    }

    setLoading(true) 
    {/* try–catch–finally: send data to the API, handle any errors, and always stop loading afterward */}
    try {
      await api.post("/notes",{
        title,
        content
      });
      toast.success("Note Created Successfully")
      navigate("/") // after creating a note, it redirects to our homePage
    } catch (error) {
      console.log("Error Creating Note");
      {/* check RateLimiting, finally loading set to false */}
      if (error.response?.status === 429){ //error.response.status can crash if there’s no response. AND error.response?.status safely checks it first.
        toast.error("Stop sending notes too fast!")
      } else {
        toast.error("Failed to create note")
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200"> {/* The big canvas for the whole page.*/}
      <div className="container mx-auto px-4 py-8"> {/* centers content horizontally, adds padding */}
        <div className="max-w-2xl mx-auto"> {/*Ensures the form doesn’t stretch too wide on big screens */}
          {/* top: backArrow button */}
          <Link to={"/"} className="btn btn-ghost mb-6"> 
          <ArrowLeftIcon className="size-5" />
            Back to Note
          </Link>
          {/* middle: content */} 
          {/* the double divs containers style is part of the DaisyUI component style system — card adds outer layout & appearance.*/}
          <div className="card bg-base-100"> 
            <div className="card-body"> 
              <h2 className="card-title text-2xl mb-4"> Create New Note </h2>

              <form onSubmit={handleSubmit}> {/* call our submit function here*/}
                <div className="form-control mb-4"> {/* form-control = wrapper that neatly stacks a label and its input with proper spacing and alignment.  */}
                  <label className="label"> 
                    <span className="label-text"> Title </span>
                  </label>
                  {/* input field for the title */}
                  <input type="text" 
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* input field for the content */}
                <div className="form-control mb-4"> {/* form-control: this div wraps one form input group — keeps label + input neatly aligned */}
                  <label className="label"> 
                    <span className="label-text"> Content </span>
                  </label>
                  <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value = {content}
                  onChange={(e) => setContent(e.target.value)}
                  />
                </div>

              {/* bottom: create note btn */}
              <div className="card-actions mb-6 justify-end"> 
                <button type="submit" className="btn btn-primary" disabled = {loading}> {/*while loading is true, the button is disabled (can’t be clicked again) */}
                  {loading ? "Creating..." : "Create Note"}{/* If loading is true then "Creating..." || If loading is false then "Create Note" */}
                </button>
              </div>
              </form>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
