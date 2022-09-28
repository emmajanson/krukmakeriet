import { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [notValidEmail, setNotValidEmail] = useState(false);
  const [notSameEmail, setNotSameEmail] = useState(false);

  async function resetClickHandler() {
    if (email === auth.currentUser.email) {
      try {
        const checkEmail = await sendPasswordResetEmail(auth, email);
        console.log(checkEmail);
        navigate("/signin");
      } catch (error) {
        console.log(error.message);
        switch (error.message) {
          case "Firebase: Error (auth/user-not-found).":
            setNotValidEmail(false);
            setUserNotFound(true);
            console.log("User not found!");
            break;
          case "Firebase: Error (auth/invalid-email).":
            setNotValidEmail(false);
            setNotValidEmail(true);
            break;
          default:
            break;
        }
      }
    } else {
      setNotSameEmail(true);
    }
  }

  return (
    <main className={styles.wrapperResetPassword}>
      <section>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        {userNotFound ? <p style={{ color: "red" }}>User not found!</p> : ""}
        {notValidEmail ? <p style={{ color: "red" }}>Email not valid!</p> : ""}
        {notSameEmail ? <p style={{ color: "red" }}>Not the registered email!</p> : ""}

        <button
          onClick={resetClickHandler}
          className={styles.resetPasswordButton}
        >
          Återställ
        </button>
      </section>
    </main>
  );
}

export default ResetPassword;
