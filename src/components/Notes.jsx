import React, { useContext,useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate()
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(noteContext);
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
  }, []);


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };

  const handleClick=(e)=>{
    e.preventDefault()
    ref.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert(' Note updated successfully', 'success')
  };

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }

  return (
    <>
    
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className='my-4'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" name='edescription' value={note.edescription} id="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name='etag' value={note.etag} id="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h1>Your Notes</h1>
        <div className="container">
        {notes.length ===0 && 'No notes to display!'}
        </div>
        {notes.map((note, index) => {
          return <Noteitem key={index} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
