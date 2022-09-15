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

function backToSignIn() {
    navigate("/signin")
}

async function resetClickHandler() {
    await sendPasswordResetEmail(auth, email)
    navigate("/signin")
}

console.log(email)

return (
    <main className={styles.wrapper}>
    <section>
        <input 
            type="text" 
            placeholder="Enter your email" 
            onChange={(e) => {
                setEmail(e.target.value);
          }}></input>
        <button onClick={backToSignIn}>Back to signin</button>
        <button onClick={resetClickHandler}>Reset password</button>
    </section>
    </main>
  );
}

export default ResetPassword;