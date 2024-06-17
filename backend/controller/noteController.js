
const note = require('../Models/noteModel');
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(async (req, res) => {
    const notes = await note.find({ user: req.body.user.userId });
    res.json({notes:notes,succes:true});
})

const createNote =  asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    if(!title || !content || !category)
    {
        res.status(400);
        next("Please fill all the fields")
    }
    else{
         console.log("req.body.user._id", req.body.user.userId);
        const Note = new note({
          user: req.body.user.userId,
          title: title,
          content: content,
          category: category,
        });
        const createdNote = await Note.save();
        res.status(201).json(createdNote)
    }
    
})
const getNoteById = asyncHandler(async (req, res) => {
    const Note = await note.findById(req.params.id);
    if(Note)
    {
        res.json({data:Note})
    }
    else{
        res.status(404);
        next("Note not found")
    }

})

const updateNoteById = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const Note = await note.findById(req.params.id);
    if(Note.user.toString() !== req.body.user.userId.toString())
    {
        res.status(401);
        next("You can't perform this action")
    }
    if(note)
        {
            Note.title = title;
            Note.content = content;
            Note.category = category;
            const updatedNote = await Note.save();
            res.json({data:updatedNote,succes:true})
        }
        else
        {
            res.status(404)
            next("Note not found")
        }
   
})
const deleteNote = asyncHandler(async (req, res, next) => {
  const Note = await note.findById(req.params.id);

  if (!Note) {
    res.status(404);
    next("Note not found")
  }

  // Check if the user is authorized to delete the note
  if (Note.user.toString() !== req.body.user.userId.toString()) {
    res.status(401);
   next("You can't perform this action")
  }

  // If the note is found and the user is authorized, delete the note
  await note.findByIdAndDelete(req.params.id);

  res.json({ message: "Note removed" });
});
module.exports = {getNotes , createNote, getNoteById,updateNoteById ,deleteNote};