import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { comparePassword } from "../Components/Kryptering";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
const bcrypt = require("bcryptjs");

//Det här ska finnas
// - formulär för registrering
// - som ska skickas till db användare

function SignUp() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [hashedEmail, setHashedEmail] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");

  function navToSignUp() {
    navigate("/signup");
  }

  async function handleLogin() {
    const hashedEmail = await bcrypt.hash(userEmail, 10);
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    setHashedEmail(bcrypt.hash(userEmail, 10));

    createUser(hashedEmail, hashedPassword);

    async function findByUsername(userEmail) {
      return await db.findOne({ name: userEmail });
    }

    console.log(
      `${hashedEmail}: ${userEmail} & ${hashedPassword}: ${userPassword}`
    );
  }

  async function createUser(hashEmail, hashPass) {
    await addDoc(usersCollectionRef, {
      email: hashEmail,
      password: hashPass,
      name: "",
      courseName: "",
      courseSpots: 0,
    });
  }

  function navToProfile() {
    navigate("/profile");
  }

  return (
    <main className={styles.wrapper}>
      <div>
        <label name="email">E-mail</label>
        <input
          type="text"
          name="email"
          placeholder="Enter E-mail..."
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <label name="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <button onClick={handleLogin}>Log In</button>
        <p>Don't have an account?</p>
      </div>
      <button onClick={navToSignUp}>Sign up</button>
    </main>
  );
}

export default SignUp;
