import style from '../styles/Login.module.css'

export default function Login ({user,setUser,handleLogin}){

function onChange(e){
    setUser({...user,[e.target.name]:e.target.value})
}

    return(
        <div className={style.Back}>
            <div className={style.LoginBox}>
                <div className={style.pictureBox}>
                <img src="https://res.cloudinary.com/drcvcbmwq/image/upload/v1658959349/undraw_reminder_ypgp_egvwlp.svg" alt='signinpic'/>
                </div>
                <form onSubmit={handleLogin}>
                    <h2>Notes App</h2>
                    <p>Take your notes anywhere...</p>
                    <input type="text" name ="username" value={user.username} onChange={onChange} placeholder='Username...'/>
                    <input type="password" name="password" value={user.password} onChange={onChange} placeholder='Password...'/>
                    <button type="submit" onSubmit={handleLogin}>Sign in</button>
                    <p>You don't have an account?</p>
                    <a href='/signup'>Create an account</a>
                </form>
            </div>
        </div>
    )
}