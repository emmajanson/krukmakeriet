import { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinPassword2, setSigninPassword2] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  async function register() {
    if (signinPassword === signinPassword2) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          signinEmail,
          signinPassword
        );
        const sendMail = getAuth();
        await sendEmailVerification(sendMail.currentUser);
        updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL: null,
        });
        await setDoc(doc(db, "users", user.user.uid), {
          name: userName,
          email: user.user.email,
          admin: false,
          uid: user.user.uid,
        });
        console.log(user);
        navigate("/profile", { state: { user: userName } });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Lösenorden matchar ej!");
    }
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.signUpWrapper}>
        <label name="name">Name</label>
        <input 
          type="text"
          name="name"
          placeholder="Enter your name..."
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label name="email">E-mail</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email..."
          onChange={(e) => {
            setSigninEmail(e.target.value);
          }}
        />
        <label name="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          onChange={(e) => {
            setSigninPassword(e.target.value);
          }}
        />
        <label name="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm password..."
          onChange={(e) => {
            setSigninPassword2(e.target.value);
          }}
        />
        <button className={styles.registerButton} onClick={register}>Register Account</button>
      </section>
    </main>
  );
}

export default SignUp;
