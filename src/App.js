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

import { useState, useEffect } from "react";
 import {db} from "./firebase-config.js"
import { collection, getDocs } from "firebase/firestore"; 


//Lägg in nestlade routes för att hantera kategorier i webshopen & adminsidan

function App() {
  /* const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db,"users")
  useEffect(() => {
  
    const getUsers = async () => {

    }
    getUsers()
  }, []) */
  
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect (() => {
  
    const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
     console.log(data); 
    setUsers(data.docs.map((doc) => ({})))
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
    </div>
  );
}

export default App;
