const express = require("express");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//route 1: get all notes."/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

// route 2: add a notes"/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // email validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.send(saveNote);
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }
  }
);

//route 3: update an existing note Using PUT "/api/notes/updateallnote/:id"
router.put("/updatenote/:id", fetchuser,async (req, res) => {
  //Create a new note objeect
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  try {
    //find note and update it
 let note =await Note.findById(req.params.id);
  if (!note) {
    res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    res.status(404).send("Not allowed");
  };

  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json({note})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'})
  }
});

//route 4: delete an existing note Using DELETE "/api/notes/deletenote/:id"

router.delete("/deletenote/:id", fetchuser,async (req, res) => {
  //Create a new note objeect
  const { title, description, tag } = req.body;
  
  try {
    //find note and update it
 let note =await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(400).send("Not allowed");
  };

  note = await Note.findByIdAndDelete(req.params.id);

  res.json({Success:"Successfully Deleteed",note})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'})
  }
});

module.exports = router;
