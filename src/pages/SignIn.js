import { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { AllContext } from "../context/AllContext";

//Det här ska finnas
// - formulär för registrering
// - som ska skickas till db användare
function SignIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const { setRefresh } = useContext(AllContext);

  const navigate = useNavigate();

  // Signing in the user and navigates to Profile-page

  async function signin() {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      setRefresh((curr) => !curr);

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
        <button className={styles.buttonClass} onClick={signin}>
          Log In
        </button>
      </section>

      <section className={styles.signUpWrapper}>
        <p>Don't have an account?</p>

        <button
          className={styles.buttonClass}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </button>
        <button
          className={styles.buttonClass}
          onClick={() => {
            navigate("/resetpassword");
          }}
        >
          Forgot password?
        </button>
      </section>
    </main>
  );
}

export default SignIn;
