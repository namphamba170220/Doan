import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import { auth } from "../../firebase";
import { useAuthValue } from "../../contexts/AuthContext";
import {useSnackbar} from 'notistack';


const Login = () => {
  const adminUser = {
    email:"phambanamhaui@gmail.com",
    password:"12345678"
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()


  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log(auth.currentUser);
      if(auth.currentUser.email !== adminUser.email)  {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/')
          enqueueSnackbar("Sign Up Success");
        })
      .catch(err => alert(err.message))
    } else{
      navigate('/admin')
      enqueueSnackbar("Sign Up Success");
    }
    })
    .catch(err => setError(err.message))
  }
  return (
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have and account? 
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
