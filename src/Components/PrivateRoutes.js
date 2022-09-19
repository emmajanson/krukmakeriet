import { Outlet, Navigate,  } from 'react-router-dom';
import { auth, db } from '../firebase-config'
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore'


const PrivateRoutes = () => {
  const [user, setUser] = useState({})
  const [uid, setUid] = useState("");
  const [newUsers, setNewUsers] = useState([]); 

  const [permission, setPermission] = useState(false);
  const usersCollectionRef = collection(db, "users");


  useEffect(() => {  
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUid(currentUser.uid)
      
    });
  }, []);

  useEffect(() => {
    newUsers.forEach(user => { 
      console.log("kör vi detta? test")
      if(user.uid === uid) setPermission(user.admin)
      console.log(user.admin)
  })
  }, [])

  useEffect(() => {
    async function getUser(){
      let vadsomhelst = await getDocs(usersCollectionRef)
      setNewUsers(vadsomhelst.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getUser()
    
  }, []);

    

    return (
      <p>Detta är din nivå: {permission.toString()}</p>
        //permission ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes;