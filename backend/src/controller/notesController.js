// example to understand a controller structure (or route)
// export function getAllNotes(req, res) { //You (the client) tell the waiter what you want (req = request).
//   // send the notes or waiter goes to kitchen
//   res.status(200).send("you just fetched the notes"); //The waiter brings back your food (res = response).
// }

import Note from "../models/Note.js";
// ** so all this method like find(), save() comes from mongoose (bridge between database and backend server)
// we give async as we will have some promises (note.find())
export async function getAllNotes(req, res) {
  //we request getallNotes
  try {
    // Note.find() = Promise (future array of notes)
    const notes = await Note.find().sort({createdAt:-1}); //always returns an array, even if it’s empty.  -1 sort in desc order (newest note first)
    res.status(200).json(notes); //we respond by finding all notes and return all
  } catch (error) {
    console.error("Error in getAllNotes controller", error); //console log error for debugging purpose
    res.status(500).json({ message: "Internal Server Error"});
  }
}

export async function getNoteById(req,res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({message:"Note not found!"})
      res.json(note);

  } catch (error) {
    console.error("Error in getNoteById controller", error); //console log error for debugging purpose
    res.status(500).json({ message: "Internal Server Error"});
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body; // we receive the content from req.BODY (postman)
    const note = new Note({ title, content }); // Note model file that already used Mongoose.
    
    // we store the new note into a variable and return instead of a json {'note created successful'}
    const savedNote = await note.save(); // .save() from mongoose, actually stores the note in MongoDB; without it, the note only exists in memory. 'await' pauses until saving is done.
    res.status(201).json(savedNote); // return the savedNote instead of "note successfully created"
  } catch (error) {
    console.error("Error in createNote controller", error); //console log the error for debugging
    res.status(500).json({message:"Internal Server Error"});
  }
}

export async function updateNote(req, res) {
  try {
    const {title,content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate( //WAIT until find note by id then proceed
      req.params.id,
      {title,content},
      {
        new: true, //tells Mongoose to return the updated document, not the old one.
      }
    );
    if (!updatedNote) return res.status(404).json({message:"Note not found"}); // 404 - Not Found
    res.status(200).json(updatedNote);
    
  } catch (error) {
    console.error("Error in updateNote controller", error); //console log the error for debugging
    res.status(500).json({message:"Internal Server Error"});
  }
}

export async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if (!deleteNote) return res.status(404).json("Note not found!")
    res.status(200).json("Note Deleted Successfully!")

  } catch (error) {
    console.error("Error in deleteNote controller", error); //console log the error for debugging
    res.status(500).json({message:"Internal Server Error"});
  }
}
