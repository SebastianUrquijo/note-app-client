import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Note from "./Note";
import style from '../styles/Notes.module.css';
import FormModal from "./FormModal";
import Form from "./Form";
import { SERVER } from "../server";

export default function Notes(){

const userData =JSON.parse(localStorage.getItem('userInfo'))
const userId = userData.id ?? null;
const [isActive,setIsActive] = useState(true)
const [myNotes, setMyNotes] =useState([])
const filterNotes = isActive ? myNotes.filter((note)=> note.isActive ===true) : myNotes.filter((note)=> note.isActive ===false)
const tags = filterNotes ? new Set (filterNotes.map((elem)=>elem.tags).flat()) : null
const filterTags = [...tags]

const [isOpen,setIsOpen] =useState(false)
const [filter,setFilter]= useState("All")
const renderArray = filter === "All" ? filterNotes : filterNotes.filter((note)=> note.tags.includes(filter))

function handleFilter(e){
    e.preventDefault()
    setFilter(e.target.value)
}

function openModal(e){
    e.preventDefault()
    setIsOpen(!isOpen)
}

function setActive(e){
    e.preventDefault()
    setIsActive(!isActive)
    setFilter("All")
}

async function getNotes(userId){
    try {
        let response = null
        response = await fetch(`${SERVER}/note/?userId=${userId}`)
        const result = await response.json()
        setMyNotes(result)
    } catch (error) {
        console.error(error)
    }
}

useEffect(()=>{
    getNotes(userId)
  },[userId])


    return(
        <div className={style.container}>
           <NavBar/>
           <div className={style.changeBtn}>
            <svg width="55" height="55" fill="#fda62b" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={openModal}>
            <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm4.5 10.5h-3.75v3.75h-1.5v-3.75H7.5v-1.5h3.75V7.5h1.5v3.75h3.75v1.5Z"></path>
            </svg>
            <button type='button' onClick={setActive}>{isActive? "Show archived" :"Show unarchived"}</button>
            {filterTags && filterTags.length?
                        <select name='tags' id='tags' onChange={handleFilter}>
                        <option value='All'>All</option>
                            {filterTags && filterTags.map((a)=>{
                                return(
                                <option key={a} value={a}>{a}</option>
                            )})}
                    </select>
            :
            <></>}

           </div>
           <h1>{isActive ? "My Notes" :"Archived Notes"}</h1>
           <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Form id={userData.id} setIsOpen={setIsOpen} getNotes={getNotes}/>
           </FormModal>
           {renderArray && renderArray.length > 0 ?
           <section className={style.myNotes}>
           {renderArray && renderArray.map((note)=>{
               return(
                   <div key={note.id}>
                       <Note
                       userId={userData.id}
                       id={note.id}
                       title={note.title}
                       description={note.description}
                       isActive={note.isActive}
                       getNotes={getNotes}
                       tags={note.tags}
                       />
                   </div>
                    )
                })}
            </section>
            : isActive === "true" ?
           <div className={style.alert}>
            <svg width="60" height="60" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m21 15-6 5.996L4.002 21A.998.998 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.456.993 1.002V15ZM19 5H5v14h8v-5a1 1 0 0 1 .883-.993L14 13l5-.001V5Zm-.829 9.999L15 15v3.169l3.171-3.17Z"></path>
            </svg>
            <h2>Wow, such empty!</h2>
            <h4>Try create your first note!</h4>
            </div>:
            <div className={style.alert}>
            <svg width="60" height="60" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2.992C3 2.444 3.445 2 3.993 2h16.014a1 1 0 0 1 .993.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 21.008V2.992ZM19 11V4H5v7h14Zm0 2H5v7h14v-7ZM9 6h6v2H9V6Zm0 9h6v2H9v-2Z"></path>
            </svg>
            <h2>Wow, such empty!</h2>
            <h4>Archive a note!</h4>
            </div>
            }
           
        </div>
    )
}