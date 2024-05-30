import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../util/AuthProvider'

const Header = () => {
    const {user, handleUserLogout} = useAuth();
  return (
    <div id='header--wrapper'>
        {user ? ( <>
        Welcome {user.name}
        <LogOut className='header--link' onClick={handleUserLogout} />
        </>):(
            <button>Login</button>
        )}
    </div>
  )
}

export default Header