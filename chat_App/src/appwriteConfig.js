import { Client , Databases , Account  } from 'appwrite';

const client = new Client();
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
export const DATABASES_ID = import.meta.env.VITE_DATABASES_ID
export const COLLECTION_MESSAGE_ID = import.meta.env.VITE_COLLECTION_MESSAGE_ID


client
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);
    

    export const databases = new Databases(client);
    export const account = new Account(client);
    export default client