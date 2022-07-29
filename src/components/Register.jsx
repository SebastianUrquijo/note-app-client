import style from '../styles/Login.module.css'
import ReCAPTCHA from "react-google-recaptcha"
import React,{useRef,useState} from 'react'


export default function Register ({newUser,setNewUser,handleRegister}){
    const API = process.env.REACT_APP_API
    const captcha = useRef(null);
    const [trueUser, setTrueUser] = useState(true);


function onModify(e){
    setNewUser({...newUser,[e.target.name]:e.target.value})
}

function onChange(e){
    if(captcha.current.getValue()){
        setTrueUser(true)
    }
}

function onSubmit(e){
    e.preventDefault()
    if(captcha.current.getValue()){
        handleRegister()
        setTrueUser(true)
    }else{
        setTrueUser(false)
        console.log("Please check the CAPTCHA")
    }
}

    return(
        <div className={style.Back}>
            <div className={style.LoginBox}>
                <div className={style.pictureBox}>
                <img src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1658964398/undraw_join_re_w1lh_ytf3rm.svg" alt='signuppic'/>
                </div>
                <form onSubmit={onSubmit}>
                    <h2>Notes App</h2>
                    <p>Create an account...</p>
                    <input type="text" name ="username" value={newUser.username} onChange={onModify} placeholder='Username...'/>
                    <input type="password" name="password" value={newUser.password} onChange={onModify} placeholder='Password...'/>
                    <input type="password" name="validation" value={newUser.validation} onChange={onModify} placeholder='Verify password...'/>
                    <div className={style.captcha}>
                        <ReCAPTCHA
                        ref={captcha}
                        sitekey={API}
                        onChange={onChange}
                        />
                    </div>
                    {trueUser === false ? 
                    <p>Please verify the CAPTCHA</p>
                    :
                    <button type="submit" onSubmit={onSubmit}>Sign up</button>
                    }
                    
                </form>
            </div>
        </div>
    )
}