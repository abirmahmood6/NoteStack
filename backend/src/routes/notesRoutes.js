 import express from "express";
import {getAllNotes, getNoteById, createNote, updateNote, deleteNote} from "../controller/notesController.js";

const router = express.Router();

// each of this are called "Routes"
router.get("/", getAllNotes)
router.post("/", createNote)
router.get("/:id", getNoteById)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)


export default router;