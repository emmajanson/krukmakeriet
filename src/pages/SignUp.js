import { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinPassword2, setSigninPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userInUse, setUserInUse] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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
        updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL: null,
        });
        console.log(user);
        navigate("/profile", { state: { user: userName } });
      } catch (error) {
        console.log(error.message);
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            setUserInUse(true);
            break;
          case "Firebase: Error (auth/invalid-email).":
            setInvalidEmail(true);
            break;
          default:
            break;
        }
      }
    } else {
      setPasswordMatch(false);
    }
  }

  return (
    <main className={styles.wrapper}>
      <section>
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
            setInvalidEmail(false);
            setUserInUse(false);
          }}
        />
        {invalidEmail ? <p style={{ color: "red" }}>Invalid E-mail!</p> : ""}
        <label name="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          onChange={(e) => {
            setSigninPassword(e.target.value);
            setPasswordMatch(true);
          }}
        />
        <label name="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm password..."
          onChange={(e) => {
            setSigninPassword2(e.target.value);
            setPasswordMatch(true);
          }}
        />
        {passwordMatch ? (
          ""
        ) : (
          <p style={{ color: "red" }}>Your password does not match!</p>
        )}
        {userInUse ? (
          <p style={{ color: "red" }}>This E-mail is already in use!</p>
        ) : (
          ""
        )}
        <button onClick={register}>Register Account</button>
        <h1>{user?.displayName}</h1>
      </section>
    </main>
  );
}

export default SignUp;
