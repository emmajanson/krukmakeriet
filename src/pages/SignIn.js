import { useState, useContext } from "react";
import styles from "./SignIn.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { AllContext } from "../context/AllContext";

function SignIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const { setRefresh } = useContext(AllContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [passwordTooShort, setPasswordTooShort] = useState(false);

  // Signing in the user and navigates to Profile-page

  const signin = async (event) => {
    event.preventDefault();
    if (userPassword.length < 6) {
      setPasswordTooShort(true);
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      if (auth.currentUser.emailVerified === true) {
        setRefresh((curr) => !curr);
        location.state
          ? navigate("/checkout")
          : navigate("/shop", { state: { user: user.user.displayName } });
      } else {
        setNotVerified(true);
        return;
      }
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
  };

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
        <form className={styles.signinOverlay} onSubmit={signin}>
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
            {notVerified ? (
              <p style={{ color: "red" }}>* Verifiera ditt konto</p>
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
            {passwordTooShort ? (
              <p style={{ color: "red" }}>
                * Lösenordet måste vara minst sex tecken
              </p>
            ) : (
              ""
            )}
            {isPasswordWrong ? (
              <p style={{ color: "red" }}>* Felaktigt lösenord</p>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className={styles.buttonClassWhite}>
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
