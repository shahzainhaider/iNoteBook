import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
  const { addNote} = context;

  const [note,setNote] = useState({title:"",description:"",tag:""})

  const handleClick=(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
    setNote({title:"",description:"",tag:""})
    props.showAlert(' Note added successfully','success')
  };

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  
  return (
    <>
    <div className="container">
     <h1>Add Notes</h1>
    <form className='my-4'>
   <div className="mb-3">
     <label htmlFor="title" className="form-label">Title</label>
     <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
   </div>
   <div className="mb-3">
     <label htmlFor="description" className="form-label">Description</label>
     <input type="text" className="form-control" name='description' value={note.description} id="description" onChange={onChange}/>
   </div>
   <div className="mb-3">
     <label htmlFor="tag" className="form-label">Tag</label>
     <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onChange}/>
   </div>
   
   <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
 </form>
    </div>
    </>
  )
}

export default AddNote
