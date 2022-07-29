import React, { useState } from "react"
import style from '../styles/Note.module.css'
import {toast} from 'react-toastify';
import FormModal from "./FormModal";
import Form from "./Form";


export default function Note ({userId,id,title,description,isActive,getNotes,tags}){
  const SERVER = process.env.REACT_APP_SERVER
  const data = {id,isActive}
  const note = {id}
 
  const [isOpen,setIsOpen] =useState(false)
  const [isOpen2,setIsOpen2] =useState(false)

  function openModal(e){
    e.preventDefault()
    setIsOpen(!isOpen)
}

  async function onArchive(e){
    e.preventDefault()
    let response = null
    try {
      response = await fetch(`${SERVER}/note/archive`,
      {method:"PUT",
      headers: {
          "Content-Type": "application/json",
      },body: JSON.stringify(data)
  })
  const result = await response.json()
        if(result){
            if(result.msg === "Note archived"){
            toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getNotes(userId)
            }else if(result.msg === "Note unarchived"){
              toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getNotes(userId)
            }else{
            toast.error(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            }
        }
    } catch (error) {
      console.error(error)
    }
  }

  function confirmDelete(e){
    e.preventDefault()
    setIsOpen2(!isOpen2)
  }
  async function onDelete(e){
    e.preventDefault()
    let response = null
    try {
      response = await fetch(`${SERVER}/note/delete`,
      {method:"DELETE",
      headers: {
          "Content-Type": "application/json",
      },body: JSON.stringify(note)
  })
  const result = await response.json()
        if(result){
            if(result.msg === "Note deleted"){
            toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getNotes(userId)
            }else{
            toast.error(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            }
        }
    } catch (error) {
      console.error(error)
    }
  }


    return(
        <div className={style.Box}>
            <div className={style.info}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={style.tags}>
                {tags && tags.map((tag)=>{
                    return(
                        <div key={tag} className={style.tag}>
                            <p>{tag}</p>
                        </div>
                    )
                })}
                </div>
            </div>
            <div className={style.Buttons}>

<svg width="30" height="30" fill="#50244a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={openModal}>
  <path d="M16.303 4.303a2.4 2.4 0 1 1 3.394 3.394l-.952.951-3.393-3.393.951-.952Zm-2.648 2.649L3.6 17.006V20.4h3.394L17.05 10.345l-3.396-3.393Z"></path>
</svg>

{isActive? 
<svg width="30" height="30" fill="#50244a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={onArchive}>
  <path fillRule="evenodd" d="M4.8 4.8a2.4 2.4 0 0 0-2.4 2.4v9.6a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4V9.6a2.4 2.4 0 0 0-2.4-2.4h-6l-2.4-2.4h-6Zm8.4 6a1.2 1.2 0 0 0-2.4 0V12H9.6a1.2 1.2 0 0 0 0 2.4h1.2v1.2a1.2 1.2 0 0 0 2.4 0v-1.2h1.2a1.2 1.2 0 0 0 0-2.4h-1.2v-1.2Z" clipRule="evenodd"></path>
</svg>
:
<svg width="30" height="30" fill="#50244a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={onArchive}>
  <path d="m21.75 20.625-1.318-1.505c-1.054-1.203-2.031-2.13-3.379-2.752-1.247-.574-2.812-.874-4.888-.93v4.812L2.25 11.812l9.915-8.437v4.838c3.417.14 5.962 1.27 7.574 3.363 1.334 1.736 2.011 4.136 2.011 7.14v1.909Z"></path>
</svg>
}

<svg width="30" height="30" fill="#50244a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={confirmDelete}>
  <path fillRule="evenodd" d="M10.8 2.4a1.2 1.2 0 0 0-1.073.664L8.858 4.8H4.8a1.2 1.2 0 0 0 0 2.4v12a2.4 2.4 0 0 0 2.4 2.4h9.6a2.4 2.4 0 0 0 2.4-2.4v-12a1.2 1.2 0 1 0 0-2.4h-4.058l-.87-1.736A1.2 1.2 0 0 0 13.2 2.4h-2.4ZM8.4 9.6a1.2 1.2 0 0 1 2.4 0v7.2a1.2 1.2 0 1 1-2.4 0V9.6Zm6-1.2a1.2 1.2 0 0 0-1.2 1.2v7.2a1.2 1.2 0 1 0 2.4 0V9.6a1.2 1.2 0 0 0-1.2-1.2Z" clipRule="evenodd"></path>
</svg>
            </div>
            <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Form id={userId} setIsOpen={setIsOpen} getNotes={getNotes} noteId={id} title={title} description={description} tags={tags}/>
           </FormModal>
           <FormModal isOpen={isOpen2} setIsOpen={setIsOpen2}>
            <div>
              <h2>Are you sure you want to delete this note?</h2>
              <div className={style.select}>
              <button type='button' onClick={onDelete}>Yes</button>
              <button type='button' onClick={confirmDelete}>No</button>
              </div>
            </div>
           </FormModal>

        </div>
    )
}