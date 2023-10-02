import { useState } from 'react';
import noteContext from './noteContext';
import React from 'react'

const noteState = (props) => {
    // const notesInitial = []

      const [notes,setNotes] = useState([]);

      //add note
      const addNote =async (title,description,tag)=>{
        const response =await fetch(`http://localhost:5000/api/notes/addnote`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        });
        const data  = await response.json();
        setNotes(notes.concat(data))

      };


      //get notes
      const getNotes =async ()=>{
        const response =await fetch(`http://localhost:5000/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const data  = await response.json();
        setNotes(data)

      };


      //delete note
      const deleteNote =async (id)=>{
        const response =await fetch(`http://localhost:5000/api/notes/deletenote/${id}`,{
              method:'DELETE',
              headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
              },
            });
            const data  = await response.json()
        setNotes(notes.filter((note)=>{
          return note._id !== id
        }))
        props.showAlert(' Note has successfully deleted','success')
        
      };
      //edit note
      const editNote = async (id,title,description,tag)=>{
            const response =await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
              method:'PUT',
              headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag})
            });
            // const data  = await response.json()
            const newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id == id){
            newNote[index].title = title
            newNote[index].description = description
            newNote[index].tag = tag
            break;
          }
        }
        setNotes(newNote)
      }

  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>{props.children}</noteContext.Provider>
  )
}

export default noteState
