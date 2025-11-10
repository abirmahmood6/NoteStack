import { Link } from "react-router"
import { Trash2Icon, PenSquareIcon } from "lucide-react";
import { formatDate } from "../lib/utils"
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {

  // implement delete functionality, so when delete icon clicked -> run handleDelete function
  // first, we throw windowConfirm for user to confirm delete
  // try catch {}, try delete error api.delete, error(toast.error)

  const handleDelete = async (e, id) => {
    e.preventDefault(e); // why "e" passed as argumenet?

    if (!window.confirm("Do you want to delete the note?")) { return };
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(note=>note._id !== id)) // get rid of the deleted note (prevent from us having to refresh the screen!)
      toast.success("Note Deleted Successfully")
    } catch (error) {
      console.log("Cannot Delete Note", error)
      toast.error("Error deleting the note") 
    }
  }

  return <Link to={`/note/${note._id}`} // basically /note/:id
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
    <div className="card-body">
      <h3 className="card-title text-base-content">{note.title}</h3>
      <p className="text-base-content/70 line-clamp-3">{note.content}</p>
      <div className="card-actions justify-between items-center mt-4">
        <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex items-center gap-1">
          <PenSquareIcon className="size-4" />
          <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}> {/* understand SYNTAX */}
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  </Link>
}

export default NoteCard;
