import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import LogIn from "./pages/LogIn";
import styles from "./App.module.css";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

//för inlogg/auth
import { useState, useEffect } from "react";
import {db} from "./firebase-config.js"
import { collection, getDocs, addDoc } from "firebase/firestore"; 


//Lägg in nestlade routes för att hantera kategorier i webshopen & adminsidan

function App() {
  
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

  return (
    <div className={styles.wrapper}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
      
      <input 
      type="text" 
      name="name" 
      placeholder="Enter your name..." 
      onChange={(event) => {
      setNewName(event.target.value);
      }}
      />
      {/* förstår inte varför det blir name  */}
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
    </div>
  );
}

export default App;
