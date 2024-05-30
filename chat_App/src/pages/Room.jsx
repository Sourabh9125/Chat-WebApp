import React , {useState , useEffect} from 'react'
import { DATABASES_ID,COLLECTION_MESSAGE_ID, databases } from '../appwriteConfig'
import { ID , Query , Role, Permission } from 'appwrite';
import {Trash2} from "react-feather";
import client from '../appwriteConfig';
import Header from "../components/Header"
import { useAuth } from '../util/AuthProvider';

function Room() {
  const {user} = useAuth();
   const [messages, setMessages] = useState([]);
   const [messageBody, setMeassageBody] = useState('');

  useEffect(()=>{
    getMessges();
    const unsubscribe = client.subscribe(`databases.${DATABASES_ID}.collections.${COLLECTION_MESSAGE_ID}.documents`, response => {

      if(response.events.includes("databases.*.collections.*.documents.*.create")){
          console.log('A MESSAGE WAS CREATED')
          setMessages(prevState => [response.payload, ...prevState])
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
          console.log('A MESSAGE WAS DELETED!!!')
          setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }
  });

  console.log('unsubscribe:', unsubscribe)

  return () => {
    unsubscribe();
  };
  },[])
      

   const handleSubmit = async(e)=>{
       e.preventDefault();

          let payload  = {
            user_id: user.$id,
            userName: user.name,
            body : messageBody
          }
          let permissions=[
                 Permission.write(Role.user(user.$id))
          ]

       let response = await databases.createDocument(
        DATABASES_ID, 
        COLLECTION_MESSAGE_ID,
        ID.unique(), 
        payload,
        permissions,
       )  
       console.log("Created", response);
      //  setMessages(prevState => [response, ...messages])
       setMeassageBody('');
   }
    const getMessges = async()=>{
      const response = await databases.listDocuments(DATABASES_ID, 
        COLLECTION_MESSAGE_ID,
      [Query.orderDesc('$createdAt'),
        Query.limit(100),
      ]);
      
      console.log("RESPONE:", response);
      setMessages(response.documents);

    }

    const deleteMeassage = async (message_id) =>{
      const response = await databases.deleteDocument(
        DATABASES_ID,
        COLLECTION_MESSAGE_ID,
         message_id)
        //  setMessages(prevState => messages.filter((message)=> message.$id !== message_id))

    }
  return (
    <div className='container'>
      <Header/>
      <div className='room--container' >

      <form onSubmit={handleSubmit} id='message--form'>
        <div>
          <textarea
          required
          maxLength ="1000"  
          placeholder='Say Something...'
          onChange={(e)=>{setMeassageBody(e.target.value)}}
            value = {messageBody}
          ></textarea>
           </div>
          <div className='send-btn--wrapper'>
            <input className='btn btn--secondary' type='submit' value="Send"/>
          </div>  
            </form>

      <div>
        {messages.map(message=>(
         <div key={message.$id} className='message--wrapper'>
          <div className='message--header'>
            <p> {message?.userName?(
              <span>{message.userName}</span>
            ):(
              <span>Anonymous User</span>
            )}
            
            <small className='message-timestamp'> {new Date(message.$createdAt).toLocaleDateString()}</small>
            </p>
             
            {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn"  onClick={()=>{deleteMeassage(message.$id)}}/>
                            
                        )}
             {/* <Trash2 className='delete--btn'
              onClick={()=>{deleteMeassage(message.$id)}} /> */}
          </div>
          <div className='message--body'>
          <span>
            {message.body}
            </span>
          </div>
         </div> 
        ))}
      </div>
      </div>
    </div>
  )
}

export default Room