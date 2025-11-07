import { useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router"

// 1) under usage of .card in the divs below
// 2) Continue vdo - 2hr38min

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false) //false by default, as its true only when "create" btn is clicked

  const handleSubmit = () => {
    {/* function for submission of new notes*/}
  };

  return (
    <div className="min-h-screen bg-base-200 border border-black"> {/* The big canvas for the whole page.*/}
      <div className="container mx-auto px-4 py-8 border border-black"> {/* centers content horizontally, adds padding */}
        <div className="max-w-2xl mx-auto border border-black"> {/*Ensures the form doesn’t stretch too wide on big screens */}
          {/* top: backArrow button */}
          <Link to={"/"} className="btn btn-ghost mb-6"> 
          <ArrowLeftIcon className="size-5" />
            Back to Note
          </Link>

          {/* middle: content */} 
          {/* the double divs containers style is part of the DaisyUI component style system — card adds outer layout & appearance.*/}
          <div className="card bg-base-100 border border-black"> 
            <div className="card-body border border-black"> 
              <h2 className="card-title text-2xl mb-4"> Create New Note </h2>
              <form onSubmit={handleSubmit}> {/* call our submit function here*/}
                <div className="form-control mb-4"> {/* form-control: this div wraps one form input group — keeps label + input neatly aligned */}
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
                <button type="submit" className="btn btn-primary" disabled = {loading}> 
                  {loading ? "Creating..." : "Create Note"}
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
