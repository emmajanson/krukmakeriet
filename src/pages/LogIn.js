import React, { useRef } from "react";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { comparePassword } from '../Components/Kryptering';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
const bcrypt = require("bcryptjs");


//Det här ska finnas
// - formulär för registrering
// - som ska skickas till db användare

function SignUp() {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usersCollectionRef = collection(db, "users");


  function navToSignUp() {
    navigate("/signup");
  }

  async function handleLogin() {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const hashedPassword = bcrypt.hashSync(password);
    const hashedEmail = bcrypt.hashSync(email);

    
    

    navToProfile();
  }

  function navToProfile() {
    navigate("/profile");
  }

  return (
    <main className={styles.wrapper}>
      <form>
        <label name="email">E-mail</label>
        <input type="text" name="email" placeholder="Enter E-mail..." ref={emailInputRef}/>
        <label name="password">Password</label>
        <input type="password" name="password" placeholder="Enter Password" ref={passwordInputRef}/>
        <button onClick={handleLogin}>Log In</button>
        <p>Don't have an account?</p>
      </form>
      <button onClick={navToSignUp}>Sign up</button>
    </main>
  );
}

export default SignUp;
