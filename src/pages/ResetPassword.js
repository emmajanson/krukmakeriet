import { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import {
  sendPasswordResetEmail
} from "firebase/auth";


function ResetPassword() {
const navigate = useNavigate();

const [email, setEmail] = useState("")
const [userNotFound, setUserNotFound] = useState(false)
const [notValidEmail, setNotValidEmail] = useState(false)


function backToSignIn() {
    navigate("/signin")
}

async function resetClickHandler() {   
    try {
      const checkEmail = await sendPasswordResetEmail(auth, email);
      console.log(checkEmail);
      navigate("/signin");
    } catch (error) {
        console.log(error.message)
      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          setNotValidEmail(false)
          setUserNotFound(true);
          console.log("User not found!");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setNotValidEmail(false)
          setNotValidEmail(true);
            break;
        default:
          break;
      }
    }
  }



return (
    <main className={styles.wrapper}>
    <section>
        <input 
            type="text" 
            placeholder="Enter your email" 
            onChange={(e) => {
              setEmail(e.target.value);
          }}></input>
        {userNotFound ? <p style={{ color: "red" }}>User not found!</p> : ""}
        {notValidEmail ? <p style={{ color: "red" }}>Email not valid!</p> : ""}
        <button onClick={backToSignIn}>Back to signin</button>
        <button onClick={resetClickHandler}>Reset password</button>
    </section>
    </main>
  );
}

export default ResetPassword;