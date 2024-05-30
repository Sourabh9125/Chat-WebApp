import React ,{useState}from 'react'
import { useAuth } from '../util/AuthProvider'
import { Link } from 'react-router-dom';

const RegisterPage = () => {
   const{handleUserRegister} =useAuth();

  const [credentials, setCredentials] = useState({
    name:"",
    email:"",
    password1:"",
    password2:"",
  })
  const handleInputChange = (e)=>{
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials,[name]:value})
    // console.log(credentials);
  }
  return (
    <div>

<div className='auth--container'>
      <div className='form--wrapper'>

        <form onSubmit={(e)=>{handleUserRegister(e ,credentials)}} >
        <div className='field--wrapper'>
            <label>Name:</label>
            <input
             required
            type="text"
            name="name"
            placeholder='Enter your name...'
            value={credentials.name}
            onChange={(e)=> {handleInputChange(e)}}
            />

          </div>

          <div className='field--wrapper'>
            <label>Email:</label>
            <input
             required
            type="email"
            name="email"
            placeholder='Enter your Email...'
            value={credentials.email}
            onChange={(e)=> {handleInputChange(e)}}
            />

          </div>
          <div className='field--wrapper'>
            <label>Password:</label>
            <input 
            type="password"
            required
            name="password1"
            placeholder='Enter your Password...'
            value={credentials.password1}
            onChange={(e)=> {handleInputChange(e)}}
            />

          </div>
          <div className='field--wrapper'>
            <label>Confirm Password:</label>
            <input 
            type="password"
            required
            name="password2"
            placeholder='Confirm your Password...'
            value={credentials.password2}
            onChange={(e)=> {handleInputChange(e)}}
            />

          </div>

          <div className='field--wrapper'>
            <input className='btn btn--lg btn--main' type="submit" value="Register Now" />

          </div>

        </form>
            <p>Already have an account? <Link to="/login">here</Link></p>
      </div>
    </div>
  
    </div>
  )
}

export default RegisterPage