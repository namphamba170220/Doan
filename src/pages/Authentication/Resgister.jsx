import React, { useState } from "react"
import { Link } from "react-router-dom"
import {useAuthValue} from '../../contexts/AuthContext'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import { auth } from "../../firebase";



const Resgister = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const {setTimeActive} = useAuthValue()
  
    const validatePassword = () => {
      let isValid = true
      if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
          isValid = false
          setError('Passwords does not match')
        }
      }
      return isValid
    }
  
    const register = e => {
      e.preventDefault()
      setError('')
      if(validatePassword()) {
        // Create a new user with email and password using firebase
          createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            sendEmailVerification(auth.currentUser)   
            .then(() => {
              setTimeActive(true)
            }).catch((err) => alert(err.message))
          })
          .catch(err => setError(err.message))
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  return (
    <div className="center">
      <div className="auth">
        <h1>Register</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            value={confirmPassword}
            required
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
        <span>
          Already have an account?
          <Link to="/login">login</Link>
        </span>
      </div>
    </div>
  );
};

export default Resgister;
