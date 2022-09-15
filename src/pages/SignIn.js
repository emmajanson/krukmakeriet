import { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

//Det här ska finnas
// - formulär för registrering
// - som ska skickas till db användare
function SignIn() {
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  async function signin() {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log(user);
      navigate("/profile", { state: { user: user.user.displayName } });
    } catch (error) {
      console.log(error);
    }
  }

  function navToSignUp() {
    navigate("/signup");
  }

  function navToResetPassword() {
    navigate("/resetpassword");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <main className={styles.wrapper}>
      <section className={styles.loginWrapper}>
        <label htmlFor="email" name="email">
          E-mail
        </label>
        <input
          id="email"
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
        <button className={styles.buttonClass}onClick={signin}>Log In</button>
        </section>
      
       
        <section className={styles.signUpWrapper}>
        <p>Don't have an account?</p>
      
        <button className={styles.buttonClass}onClick={navToSignUp}>Sign up</button>
        <button className={styles.buttonClass}onClick={navToResetPassword}>Forgot password?</button>
        </section>
        
    </main>
  );
}

export default SignIn;
