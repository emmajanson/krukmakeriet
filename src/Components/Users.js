
import { useState, useEffect } from "react";
import {db} from "./firebase-config.js"
import { collection, getDocs, addDoc } from "firebase/firestore"; 

function UsersFB () {
    
//för inlogg/auth
const [newName, setNewName] = useState("")
const [newEmail, setNewEmail] = useState("")
const [newPwd, setNewPwd] = useState("")

const [users, setUsers] = useState([]);
const usersCollectionRef = collection(db, "users");

 const createUser = async () => {
  await addDoc(usersCollectionRef, {name: newName, email: newEmail, password: newPwd});
 }

useEffect (() => {
  const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
   /* console.log(data); */ 
  setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
  };

  getUsers();
}, []);

{users.map((user) => {
    return <div> <h1>Name: {user.name}</h1>
    <h1>Email: {user.email}</h1>
    <h1>Password: {user.password}</h1>
    </div>;
  })}
}
    
export default UsersFB;

//på app

 <input 
type="text" 
name="name" 
placeholder="Enter your name..." 
onChange={(event) => {
setNewName(event.target.value);
}}
/>
 <input 
type="email" 
email="email"
placeholder="Enter your email..." 
onChange={(event) => {
  setNewEmail(event.target.value);
  }}
/>
<input 
type="password" 
name="password" 
placeholder="Enter your password..." 
onChange={(event) => {
  setNewPwd(event.target.value);
  }}
/>

<button onClick={createUser}> Create User </button>
{users.map((user) => {
  return <div> <h1>Name: {user.name}</h1>
  <h1>Email: {user.email}</h1>
  <h1>Password: {user.password}</h1>
  </div>;
})} 

// på app
 //för inlogg/auth
   const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPwd, setNewPwd] = useState("")

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  
   const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, email: newEmail, password: newPwd});
   }

  useEffect (() => {
    const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
     /* console.log(data); */ 
     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    };

    getUsers();
  }, []);  

   import UsersFB from "./Components/Users";

//för inlogg/auth

import { useState, useEffect } from "react";
import {db} from "./firebase-config.js"
import { collection, getDocs, addDoc } from "firebase/firestore";  