import React, { useEffect, useState } from "react"
import style from '../styles/Form.module.css'
import {toast} from 'react-toastify';
import { SERVER } from "../server";

export default function Form({id,setIsOpen,getNotes,noteId,title,description,tags}){

    const [data,setData] = useState({
        id,
        title:"",
        description:"",
        tags : []
    })

    const [tag,setTag] =useState("")

    function onTitle(e){
        if(e.target.value.length <= 30){setData({...data,[e.target.name]:e.target.value})}
        return
    }
    function onDesc(e){
        if(e.target.value.length <= 300){setData({...data,[e.target.name]:e.target.value})}
        return
    }

    function onTags(e){
        if(e.target.value.length <11){setTag(e.target.value)}
    }

    function addTag(e){
        e.preventDefault()
        if(tag.length > 0 && data.tags && data.tags.length <3){
            if(!data.tags.includes(tag)){  
                setData({...data,tags:[...data.tags,tag]})          
                setTag("")}
        }
    }

    function removeTag(e){
        e.preventDefault()
        return(
            setData({
            ...data,
            tags: data.tags.filter(item => item !== e.target.value)
        })) 
    }

    async function onSubmit(e){
        e.preventDefault()
        let response = null;
        try {
            if(noteId && title && description){
            response = await fetch(`${SERVER}/note/edit`,
            {method:"PUT",
            headers: {
            "Content-Type": "application/json",
            },body: JSON.stringify(data)
            })
    
        const result = await response.json()
        if(result){
            if(result.msg === "Note updated"){
                setData({
                    id,
                    title: "",
                    description: ""
                })
            toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getNotes(id)
            setIsOpen(false)
    
            }else{
            toast.error(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            }
        }
    }else{

            response = await fetch(`${SERVER}/note/create`,
            {method:"POST",
            headers: {
                "Content-Type": "application/json",
            },body: JSON.stringify(data)
        })

        const result = await response.json()
        if(result){
            if(result.msg === "Note created"){
                setData({
                    id,
                    title: "",
                    description: ""
                })
            toast.success(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            getNotes(id)
            setIsOpen(false)

            }else{
            toast.error(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            }
        }}
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        if(!noteId && !title && !description){
            setData({
                id,
                title:"",
                description:"",
                tags: []
            })
        }
        if(noteId && title && description){
        setData({
            id:noteId,
            title,
            description,
            tags
        })}
      },[id,noteId,title,description,tags])

    return (
        <div className={style.FormBox} >
            <form onSubmit={onSubmit}>
                <h3>Title</h3>
                <input type="text" name="title" value={data.title} onChange={onTitle} placeholder="Set a title..."/>
                {data.title? <p>{`${data.title.length}/30`}</p> :<><p>0/30</p></>}
                
                <h3>Description</h3>
                <textarea  type="text" name="description" value={data.description} onChange={onDesc} placeholder="Add more info..."/>
                {data.description? <p>{`${data.description.length}/300`}</p> :<><p>0/300</p></>}
                <div className={style.categories}>
                    <input type="text" name="category" value={tag} onChange={onTags} placeholder="Add a #Tag..."/>
                    <button type="button" onClick={addTag}>Add</button>
                    {tag? <p>{`${tag.length}/10`}</p> :<><p>0/10</p></>}
                </div>
                <div className={style.tags}>
                {data.tags && data.tags.map((tag)=>{
                    return(
                        <div key={tag} className={style.tag}>
                            <button type="button" value={tag} onClick={removeTag}>X</button>
                            <p>{tag}</p>
                        </div>
                    )
                })}
                </div>
                <button type="submit" onSubmit={onSubmit}>{noteId ? "Save Note" : "Create Note"}</button>
            </form>
        </div>
    )
}