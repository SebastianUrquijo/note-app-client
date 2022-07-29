import React from 'react'
import style from '../styles/NavBar.module.css'
import {useNavigate } from 'react-router-dom'
import { useState } from 'react';
import UserLogo from './UserLogo'
import FormModal from "./FormModal"
import {toast} from "react-toastify"
import { SERVER } from "../server";

export default function NavBar (){
    const navigate = useNavigate()
    const [isOpen,setIsOpen] = useState(false)
    const [isOpen2,setIsOpen2] =useState(false)
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('userInfo')))
    const [deleteAc,setDeleteAc] = useState({
        id: user.id,
        password: ""
    })
  
    function onChange(e){
        setDeleteAc({...deleteAc,[e.target.name]:e.target.value})
    }
    
    function handleOut(e){
        e.preventDefault()
        setUser({
            email:"",
            password:""
          })
        window.localStorage.clear();
        navigate("/",{replace:true})
    }

    function confirmDelete(e){
        e.preventDefault()
        setIsOpen2(!isOpen2)
    }

    async function handleDelete(e){
        e.preventDefault()
        let response = null
        try {
          response = await fetch(`${SERVER}/user/delete`,
          {method:"DELETE",
          headers: {
              "Content-Type": "application/json",
          },body: JSON.stringify(deleteAc)
      })
        
          const result = await response.json()
          if(result){
            if(result.msg === "User deleted"){
              window.localStorage.clear();
              setDeleteAc({
                id: user.id,
                password: ""
            })
            toast.success(`${result.msg}`, {
              position: toast.POSITION.BOTTOM_RIGHT
          });
          navigate("/",{replace:true})
            }
            else if(result.msg === "Invalid password"){
              toast.error(`${result.msg}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            }else{
              toast.error(`${result.msg}`, {
                  position: toast.POSITION.BOTTOM_RIGHT
              });
          }
          }
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <div className={style.NavBar}>
            <div className={style.Text}>
                <p>{`${user.username}'s Notes`}</p>
            </div>
            <div className={style.Text}>
                <UserLogo onClick={(e)=> setIsOpen(!isOpen)} id={isOpen ? style.Link2 : style.Link}/>
            </div>
            <div className={isOpen ? style.Opened : style.Closed}>
                {user ? 
                    <div className={style.UserData}>
                    <button type='button' onClick={handleOut}>Sign out</button>
                    <button type='button' onClick={confirmDelete}>Delete account</button>
                    </div>
                : 
                <div className={style.UserData}></div>}
            </div>
            <FormModal isOpen={isOpen2} setIsOpen={setIsOpen2}>
            <div>
              <h2>Confirm your password to delete this account</h2>
              <div className={style.select}>
                <form onSubmit={handleDelete} >
            <input type="password" name='password' value={deleteAc.password} onChange={onChange} placeholder='Password...'/>
              <button type='submit' onSubmit={handleDelete}>Delete</button>
              </form>
              </div>
            </div>
           </FormModal>
        </div>
    )
}