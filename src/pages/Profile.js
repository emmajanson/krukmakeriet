import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-config";
import styles from "./Profile.module.css";
import ResetPassword from "./ResetPassword.js";

import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";

function Profile() {
  const [user, setUser] = useState({});
  const [newUserName, setNewUserName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [userID, setUserID] = useState("");
  const [showNewUserName, setShowNewUserName] = useState(false);
  const [showNewUserEmail, setShowNewUserEmail] = useState(false);

  const navigate = useNavigate();

  const permission = localStorage.getItem("admin");

  // Signs out the user, and navigates to signin-page
  async function logout() {
    await signOut(auth);
    localStorage.removeItem("admin");
    navigate("/signin");
  }

  async function handleChanges() {
    if (
      newUserName !== null &&
      newUserName.length > 0 &&
      newEmail !== null &&
      newEmail.length > 0
    ) {
      await updateEmail();
      await updateName();
    } else if (newUserName !== null && newUserName.length > 0) {
      updateName();
    } else if (newEmail !== null && newEmail.length > 0) {
      updateEmail();
    } else {
      console.log("båda är tomma");
    }
  }

  async function updateName() {
    const nameRef = doc(db, "users", auth.currentUser.uid);

    if (newUserName.length > 0) {
      setShowNewUserName(true);
      updateDoc(nameRef, {
        name: newUserName,
      });
      updateProfile(auth.currentUser, {
        displayName: newUserName,
      });
      console.log("namn uppdaterat");
    }
  }

  async function updateEmail() {
    const nameRef = doc(db, "users", auth.currentUser.uid);
    if (newEmail.length > 0) {
      setShowNewUserEmail(true);
      updateDoc(nameRef, {
        email: newEmail,
      });
      console.log("email uppdaterad");
    }
  }

  // Checking who's logged in and saving the user in a state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserID(currentUser.uid);
      console.log(currentUser);
    });
  }, []);

  return user == null ? (
    <Navigate to="/signin" />
  ) : (
    <main className={styles.wrapper}>
      <h2>
        Profile
      </h2>

      {/* uppdatera uppgifter sektion */}
      <section className={styles.userInfoWrapper}>
        <h5>Dina uppgifter</h5>
        {/* här renderas datan ut som hämtas från db via .value i inputsen */}
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
              setNewUserName(e.target.value);
            }}
          />
          {showNewUserName ? <p style={{ color: "red" }}>Name changed</p> : ""}
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
              setNewEmail(e.target.value);
            }}
          />
          {showNewUserEmail ? (
            <p style={{ color: "red" }}>Email changed</p>
          ) : (
            ""
          )}
        </div>
        <button onClick={handleChanges}>Uppdatera</button>
      </section>

      {/* glömt lösen sektion */}
      <section className={styles.forgotPassword}>
        <h5>Glömt lösenord?</h5>
        <p>Fyll i din e-postadress för återställning av lösenord</p>
        <p>Fick du ingen e-post? Kolla i skräpposten. </p>
        <ResetPassword />
        <div className={styles.inputWrapper}></div>
      </section>

      <section className={styles.userOrdersWrapper}>
        <h2>Dina köp och bokningar</h2>
        <h3 className={styles.sectionHeader}>Beställningar</h3>
        <table className={styles.tableWrapper}>
          <tr className={styles.row}>
            <th>Kurs</th>
            <th>Datum</th>
            <th>Belopp</th>
          </tr>

          {/* här renderas datan från user-orders? ut via komponent */}
          {/* tr nedan ska bli komponenten sen */}
          <tr className={styles.row}>
            <td>00/00/0000</td>
            <td>000000000000</td>
            <td>450 kr</td>
          </tr>
        </table>
      </section>

      <section className={styles.userCoursesWrapper}>
        <h3 className={styles.sectionHeader}>Kurser</h3>
        <table className={styles.tableWrapper}>
          <tr className={styles.row}>
            <th>Kurs</th>
            <th>Datum</th>
            <th>Belopp</th>
          </tr>

          {/* här renderas datan från user-courses? ut via komponent */}
          {/* tr nedan ska bli komponenten sen */}
          <tr className={styles.row}>
            <td>Kursnamn</td>
            <td>00/00/0000 00:00</td>
            <td>450 kr</td>
          </tr>
        </table>
      </section>

      {/* adminknapp ska sedan tas bort */}
      {permission === "true" ? (
        <button
          onClick={() => {
            navigate("/admin");
          }}
        >
          Admin Page
        </button>
      ) : null}

      <button onClick={logout}>Log Out</button>
    </main>
  );
}

export default Profile;
