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
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

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
      switch (error.message) {
        case "Firebase: Error (auth/wrong-password).":
          setUserNotFound(false);
          setIsPasswordWrong(true);
          console.log("Wrong password!");
          break;
        case "Firebase: Error (auth/user-not-found).":
          setIsPasswordWrong(false);
          setUserNotFound(true);
          console.log("User not found!");
          break;
        default:
          break;
      }
    }
  }

  function navToSignUp() {
    navigate("/signup");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <main className={styles.wrapper}>
      <div>
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
            setUserNotFound(false);
          }}
        />
        <label name="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => {
            setUserPassword(e.target.value);
            setIsPasswordWrong(false);
          }}
        />
        {isPasswordWrong ? (
          <p style={{ color: "red" }}>Password is wrong!</p>
        ) : (
          ""
        )}
        {userNotFound ? <p style={{ color: "red" }}>User not found!</p> : ""}
        <button onClick={signin}>Log In</button>
        <p>Don't have an account?</p>
      </div>
      <button onClick={navToSignUp}>Sign up</button>
    </main>
  );
}

export default SignIn;
