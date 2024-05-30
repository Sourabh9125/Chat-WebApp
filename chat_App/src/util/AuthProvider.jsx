import { createContext, useContext, useEffect, useState } from "react"
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";


const AuthContext = createContext();
export const AuthProvider = ({children}) => {
     
     const [loading,setLoading] = useState(true)
     const [user, setUser] = useState(null)
     const navigate = useNavigate();

     useEffect(()=>{
      getUseronLoad()

   },[])

   const getUseronLoad = async()=>{
      try {
         let accountDetails = await account.get();
         setUser(accountDetails);
         
      } catch (error) {
         console.log(error);
      }
      setLoading(false);
         
   }

     const handleUserLogin = async (e, credentials) => {
      e.preventDefault();
      console.log("CREDS:", credentials);

      try {
          let response = await account.createEmailPasswordSession(
              credentials.email,
              credentials.password
          );
          console.log("hello");
          console.log("LOGGEDIN", response);
          let accountDetails = await account.get();
          setUser(accountDetails);
          navigate("/");
      } catch (error) {
          console.error(error);
      }
  };
  const handleUserLogout = async()=>{
    await account.deleteSession('current');
    setUser(null);
  }

   const handleUserRegister = async (e, credentials)=>{
      e.preventDefault();
      if(credentials.password1 !== credentials.password2){
         alert("Password does not Match!")
         return
      }
      try {
         let response = await account.create(
            ID.unique(),
         credentials.email,
         credentials.password1,
         credentials.name,
      );
      await account.createEmailPasswordSession(
         credentials.email,
         credentials.password1,
     );
      let accountDetails = await account.get();

      setUser(accountDetails);
      navigate('/')
      console.log("RESPONSE:", response);
         
      } catch (error) {
         console.log(error);
      }

   }

     
     const contextData = {
        user, 
        handleUserLogin, 
        handleUserLogout,
        handleUserRegister,
     }

  return (
    <AuthContext.Provider value={contextData}>

        {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  )
}
export const useAuth = ()=>{return useContext(AuthContext)}
export default AuthContext;
