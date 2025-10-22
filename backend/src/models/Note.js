import mongoose from "mongoose";


// 1- define a schema
// 2- model based off that schema, below we create a model from the schema

// ** so all the method like find(), save() comes from mongoose (bridge between database and backend server)
const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Note = mongoose.model("Note", NoteSchema); // created the model from the schema
//This model is like a constructor function + helper methods for your collection (notes in MongoDB).
//All the built-in query methods like find(), findOne(), create(), update(), etc., come from this Model prototype 
export default Note;
