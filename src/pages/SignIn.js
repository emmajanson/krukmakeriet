import { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { AllContext } from "../context/AllContext";

function SignIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
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
          setInvalidEmail(false);
          setIsPasswordWrong(true);
          console.log("Wrong password!");
          break;
        case "Firebase: Error (auth/user-not-found).":
          setIsPasswordWrong(false);
          setInvalidEmail(false);
          setUserNotFound(true);
          console.log("User not found!");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setIsPasswordWrong(false);
          setUserNotFound(false);
          setInvalidEmail(true);
          console.log("User not found!");
          break;
        default:
          break;
      }
    }
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.signupWrapperDesk}>
        <h3>Registrera dig</h3>
        <p className={styles.text}>Registrera dig om du inte har ett konto</p>
        <button
          className={styles.buttonClassGreen}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Registrera
        </button>
      </section>

      <section className={styles.signinWrapper}>
        <form className={styles.signinOverlay}>
          <h3 className={styles.heading}>Logga in</h3>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="email">
              E-postadress
            </label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="exempel@exempel.se"
              onChange={(e) => {
                setUserEmail(e.target.value);
                setUserNotFound(false);
              }}
            />
            {userNotFound ? (
              <p style={{ color: "red" }}>* Användare hittas ej</p>
            ) : (
              ""
            )}
            {invalidEmail ? (
              <p style={{ color: "red" }}>* Felaktigt angiven e-post</p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="password">
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              onChange={(e) => {
                setUserPassword(e.target.value);
                setIsPasswordWrong(false);
              }}
            />
            {isPasswordWrong ? (
              <p style={{ color: "red" }}>* Felaktigt lösenord</p>
            ) : (
              ""
            )}
          </div>
          <button
            type="button"
            className={styles.buttonClassWhite}
            onClick={signin}
          >
            Logga in
          </button>
          <button
            className={styles.resetPassword}
            onClick={() => {
              navigate("/resetpassword");
            }}
          >
            Glöm lösenord? Klicka här
          </button>
        </form>
      </section>

      <section className={styles.signupWrapperMob}>
        <p className={styles.text}>Har du inget konto? Registrera dig nu.</p>
        <button
          className={styles.buttonClassGreen}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Registrera
        </button>
      </section>
    </main>
  );
}

export default SignIn;
