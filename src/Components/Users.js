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