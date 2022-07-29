import './App.css';
import React,{Fragment, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import Notes from './components/Notes';
import PrivateLogin from "./components/PrivateLogin"
import PrivateUser from "./components/PrivateUser"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const SERVER = process.env.REACT_APP_SERVER
  const navigate = useNavigate()

  const [user,setUser] = useState({
    username:"",
    password:""
  })

  const [newUser,setNewUser] = useState({
    username:"",
    password:"",
    validation:""
  })



  async function handleLogin(e){
    e.preventDefault()
    let response = null
    try {
      response = await fetch(`${SERVER}/user/login`,
      {method:"POST",
      headers: {
          "Content-Type": "application/json",
      },body: JSON.stringify(user)
  })
    
      const result = await response.json()
      if(result){
        if(result.msg === "Login success"){
          localStorage.setItem('userInfo', JSON.stringify(result.data))
          setUser({
            username: "",
            password: ""
        })
        toast.success(`${result.msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT
      });
      navigate("/myNotes",{replace:true})
        }
        else if(result.msg === "Invalid username or password"){
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

  async function handleRegister(){
    let response = null;
    try {
        response = await fetch(`${SERVER}/user/create`,
        {method:"POST",
        headers: {
            "Content-Type": "application/json",
        },body: JSON.stringify(newUser)
    })
    const result = await response.json()

    if(result){
      if(result.msg === "User registered"){
        setNewUser({
          username:"",
          password:"",
          validation:""
        })
        toast.success(`${result.msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT
      });
      navigate("/",{replace:true})
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


  return (
<Fragment>
  <ToastContainer/>
  <Routes>
    <Route path='/' element={
      <PrivateLogin>
        <Login user={user} setUser={setUser} handleLogin={handleLogin}/>
      </PrivateLogin>
    }/>

    <Route path='/signup' element={
      <PrivateLogin>
        <Register newUser={newUser} setNewUser={setNewUser} handleRegister={handleRegister}/>
      </PrivateLogin>
    }/>
    <Route path='/myNotes' element={
    <PrivateUser>
      <Notes/>
    </PrivateUser>
    }/>
  </Routes>
</Fragment>
  );
}

export default App;
