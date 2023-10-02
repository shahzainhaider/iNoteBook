import React, { useContext } from 'react'
import {MdDeleteForever,MdEditSquare} from 'react-icons/md';
import noteContext from '../context/notes/noteContext';
import '../CSS/card.css'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context

    const {note,updateNote,showAlert} = props;
  return (
    <>
    <div className="card mx-2 my-2" style={{width: 18 + 'em'}}>
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
      <a href="#" className="btn btn-primary">Read more</a><br/>
      <MdEditSquare className='size color-blue mt-2' onClick={()=>updateNote(note)}/>
      <MdDeleteForever className='size color-red mt-2 mx-4' onClick={()=>deleteNote(note._id)} />
    </div>
  </div>
    </>
  )
}

export default Noteitem
