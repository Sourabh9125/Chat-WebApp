
import PrivateRoutes from './components/PrivateRoutes'
import Room from './pages/Room'
import { AuthProvider } from './util/AuthProvider'
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'

function App() {
  

  return (
    <Router>
      <AuthProvider>
         <Routes>
            <Route path='/login'  element={<Login/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route element = {<PrivateRoutes/>}>
        <        Route path='/' element={<Room/>} />
            </Route>
      
      </Routes>
     </AuthProvider>
    </Router>
  )
}

export default App
