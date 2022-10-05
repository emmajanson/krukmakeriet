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
import { collection, setDoc, doc } from "firebase/firestore";
import { act } from "react-test-renderer";
import Popup from "../Components/PopUpTemplate";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinPassword2, setSigninPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [userInUse, setUserInUse] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  // Checking who's logged in and saving the user in a state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      act(() => {
        setUser(currentUser);
      });
    });
  }, []);

  // Handle the register and push a valid user to Firebase and send varification mail to the user
  async function register() {
    if (signinPassword.length < 6) {
      setPasswordTooShort(true);
      return;
    }
    if (signinPassword === signinPassword2) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          signinEmail,
          signinPassword
        );
        setShowPopup(true);
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
        navigate({ state: { user: userName } });
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
      <section className={styles.bgWrapperDesk}></section>

      <section className={styles.signupWrapper}>
        <form className={styles.signupOverlay}>
          <h3 className={styles.heading}>Registrera</h3>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="name">
              Namn
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Förnamn Efternamn"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
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
                setSigninEmail(e.target.value);
                setInvalidEmail(false);
                setUserInUse(false);
              }}
            />
            {invalidEmail ? (
              <p style={{ color: "red" }}>* Felaktig e-post</p>
            ) : (
              ""
            )}
            {userInUse ? (
              <p style={{ color: "red" }}>* Användare finns redan</p>
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
                setSigninPassword(e.target.value);
                setPasswordMatch(true);
              }}
            />
            {passwordTooShort ? (
              <p style={{ color: "red" }}>
                * Lösenordet måste vara minst sex tecken
              </p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label
              className={styles.label}
              htmlFor="confirm-password"
              data-testid="confirm"
            >
              Upprepa lösenord
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="********"
              onChange={(e) => {
                setSigninPassword2(e.target.value);
                setPasswordMatch(true);
              }}
            />
            {passwordMatch ? (
              ""
            ) : (
              <p style={{ color: "red" }}>* Lösenordet stämmer inte</p>
            )}
          </div>

          {/* ????? */}
          {/* <h1>{user?.displayName}</h1> */}

          <button
            type="button"
            className={styles.buttonClass}
            onClick={register}
          >
            <Popup
              trigger={showPopup}
              setTrigger={setShowPopup}
              navigation={"/signin"}
            >
              <h1>Välkommen till Krukmakeriet</h1>
              <p>Ett veriferingsmail har nu skickats till din epostadress</p>
              <p>Ingen e-post? Kolla i skräpposten.</p>
            </Popup>
            Registrera
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
