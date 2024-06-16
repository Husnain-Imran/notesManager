const express = require("express");

const {getNotes,createNote,getNoteById ,updateNoteById ,deleteNote} = require("../controller/noteController");
const userAuth = require("../Middlewares/authMiddleware");

const router = express.Router();    

router.get("/getNotes", userAuth ,getNotes);
router.post("/createNote", userAuth, createNote);
router.get("/:id", userAuth, getNoteById);
router.put("/:id", userAuth, updateNoteById);
router.delete("/:id", userAuth, deleteNote);

module.exports = router;