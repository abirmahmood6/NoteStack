import express from "express";
import {getAllNotes, postNotes, updateNotes, deleteNotes} from "../controller/notesController.js";

const router = express.Router();

// each of this are called "Routes"
router.get("/", getAllNotes)

// each of this are called "Routes"
router.post("/", postNotes)
router.put("/:id", updateNotes)
router.delete("/:id", deleteNotes)


export default router;