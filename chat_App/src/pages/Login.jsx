import {useEffect, useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../util/AuthProvider'

const Login = () => {
  const {user , handleUserLogin} = useAuth() ;
  const [credentials, setCredentials] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate('/')
    }

  },[])
  const handleInputChange = (e)=>{
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials,[name]:value})
    // console.log(credentials);
  }

  return (
    <div className='auth--container'>
      <div className='form--wrapper'>

        <form onSubmit={(e)=>{handleUserLogin(e ,credentials)}} >
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
            name="password"
            placeholder='Enter your Password...'
            value={credentials.password}
            onChange={(e)=> {handleInputChange(e)}}
            />

          </div>

          <div className='field--wrapper'>
            <input className='btn btn--lg btn--main' type="submit" value="login" />

          </div>

        </form>
            <p>Dont have an account? Register <Link to="/register">here</Link></p>
      </div>
    </div>
  )
}

export default Login