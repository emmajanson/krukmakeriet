import { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updateDoc,
  onAuthStateChanged,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { act } from "react-test-renderer";

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
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      act(() => {
        setUser(currentUser);
      });
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
      <section className={styles.bgWrapperDesk}>
      </section>

      <section className={styles.signupWrapper}>
        <form className={styles.signupOverlay}>
          <h3 className={styles.heading}>Registrera</h3>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="name">Namn</label>
            <input
              type="text"
              name="name"
              placeholder="Förnamn Efternamn"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputWrapper}> 
            <label className={styles.label} htmlFor="email">E-postadress</label>
            <input
              type="text"
              name="email"
              placeholder="exempel@exempel.se"
              onChange={(e) => {
                setSigninEmail(e.target.value);
                setInvalidEmail(false);
                setUserInUse(false);
              }}
            />
            {invalidEmail ? <p style={{ color: "red" }}>* Felaktig e-post</p> : ""}
            {userInUse ? (<p style={{ color: "red" }}>* Användare finns redan</p>) : ("")}
          </div>
          <div className={styles.inputWrapper}> 
            <label className={styles.label} htmlFor="password">Lösenord</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={(e) => {
                setSigninPassword(e.target.value);
                setPasswordMatch(true);
              }}
            />
          </div>
          <div className={styles.inputWrapper}> 
            <label className={styles.label} htmlFor="confirm-password">Upprepa lösenord</label>
            <input
              type="password"
              name="confirm-password"
              placeholder="********"
              onChange={(e) => {
                setSigninPassword2(e.target.value);
                setPasswordMatch(true);
              }}
            />
            {passwordMatch ? ("") : (<p style={{ color: "red" }}>* Lösenordet stämmer inte</p>)}
          </div>




          {/* ????? */}
          {/* <h1>{user?.displayName}</h1> */}




          <button type="button" className={styles.buttonClass}  onClick={register}>
            Registrera
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUp;
