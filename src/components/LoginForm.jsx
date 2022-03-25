import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import userApi from "../Api/userApi";


const LoginForm = () => {

    const [details, setDetails] = useState({email:"", password:""});
    const history = useHistory();
    const [dataUser, setDataUser] = useState([]);
    const [handelLogin,setHandelLogin] = useState(false)


    const getLocal = () => {
       return window.localStorage.getItem('admin');
    }
    getLocal();


    useEffect(()=>{
        userApi.getAll().then(res => {
            if(res.statusText === "OK") {
              setDataUser(res.data);
            }
        })
    },[])


    const submitHandler = e => {
        e.preventDefault()
        loginData(details);
    }
    
             
    
    const loginData = (details) => {
        console.log(details);
        dataUser.forEach(item => {
            if(details.email ===item.email && details.password === item.password ) {
                setHandelLogin(true)
                window.localStorage.setItem("admin", JSON.stringify(item));
                history.push('/');
            }
        })
    
        
      };
    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {/*Error*/}
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email:e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}

export default LoginForm;