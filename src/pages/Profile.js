import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  signOut,
  onAuthStateChanged,
  updateProfile,
  getAuth,
  updateUser,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import styles from "./Profile.module.css";
import ResetPassword from "./ResetPassword.js";

import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import UserOrders from "../Components/UserOrders";
import UserCourses from "../Components/UserCourses";

function Profile() {
  const [user, setUser] = useState({});
  const [newUserName, setNewUserName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [userID, setUserID] = useState("");
  const [showNewUserName, setShowNewUserName] = useState(false);
  const [showNewUserEmail, setShowNewUserEmail] = useState(false);
  const [firstNewPassword, setFirstNewPassword] = useState("");
  const [secondNewPassword, setSecondNewPassword] = useState("");

  const navigate = useNavigate();

  const deleteUserOnProfile = auth.currentUser;

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
      /* updateProfile(auth.currentUser, {
        email: newEmail,
      }); */
      console.log("email uppdaterad");
    }
  }

  function handleDeleteUser() {
    deleteUser(deleteUserOnProfile)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  }

  function handleChangePassword() {
    if (firstNewPassword !== secondNewPassword) {
      alert("Lösenorden är inte samma");
    } else {
      updatePassword(user, firstNewPassword)
        .then(() => {
          console.log("lösenordet är bytt");
        })
        .catch((error) => {
          console.log("något gick fel", error.message);
        });
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
    <div className={styles.bgWrapper}>
    <main className={styles.wrapper}>
      <h2 className={styles.heading}>Profil</h2>

      <section className={styles.userInfoWrapper}>
        <h5 className={styles.subheading}>Ditt konto</h5>

        <section className={styles.accountSection}>
          <article className={styles.article}>
            <h6 className={styles.title}>Dina uppgifter</h6>


            {/* !!!rendera ut kunden uppgifter i p-taggarna nedan!!!! */}
            <p className={styles.text}>Förnamn Efternamn</p>
            <p className={styles.text}>exempel@exempel.se</p>


            <button className={styles.button} onClick={logout}>Logga ut</button>
          </article>           
          <article className={styles.article}>
            <h6 className={styles.title}>Ta bort konto</h6>
            <p className={styles.text}> För att ta bort ditt konto behöver du fylla i ditt lösenord</p>
            <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="password">
              Ditt lösenord
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="***********"
              onChange={(e) => {
                setFirstNewPassword(e.target.value);
              }}
            />
          </div>
            <button className={styles.button} onClick={handleDeleteUser}>Ta bort</button>
          </article>
          {/* <div className={styles.inputWrapper}>
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
          </div> */}
        </section>
        
        <section className={styles.passwordSection}>
          <h6 className={styles.title}>Byt lösenord</h6>
          <p>Här kan du byta ditt lösenord</p>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="old-password">
              Gammalt lösenord
            </label>
            <input
              id="old-password"
              type="password"
              name="old-password"
              placeholder="***********"
              onChange={(e) => {
                setFirstNewPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="password">
              Nytt lösenord
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="***********"
              onChange={(e) => {
                setFirstNewPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="confirm-password">
              Upprepa nytt lösenord
            </label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              placeholder="***********"
              onChange={(e) => {
                setSecondNewPassword(e.target.value);
              }}
            />
            {showNewUserEmail ? (<p style={{ color: "red" }}>Email changed</p>) : ("")}
          </div>
          <button className={styles.button} onClick={handleChangePassword}>Uppdatera</button>
          {/* <button className={styles.button} onClick={handleChanges}>Uppdatera profil</button> */}
        </section>

      </section>

      {/* glömt lösen sektion */}
      {/*    <section className={styles.forgotPassword}>
        <h5>Glömt lösenord?</h5>
        <p>Fyll i din e-postadress för återställning av lösenord</p>
        <p>Fick du ingen e-post? Kolla i skräpposten. </p>
        <ResetPassword />
        <div className={styles.inputWrapper}></div>
      </section> */}

      <section className={styles.userOrdersWrapper}>
        <h5 className={styles.subheading}>Dina köp och bokningar</h5>
        <h3 className={styles.title}>Beställningar</h3>
        <table className={styles.tableWrapper}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>Datum</th>
            <th className={styles.tableHeader}>Ordernr</th>
            <th className={styles.tableHeader}>Belopp</th>
          </tr>
          <UserOrders />
          <UserOrders />
          <UserOrders />
        </table>
      </section>

      <section className={styles.userCoursesWrapper}>
        <h3 className={styles.title}>Inbokade kurser</h3>
        <table className={styles.tableWrapper}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>Kurs</th>
            <th className={styles.tableHeader}>Datum</th>
            <th className={styles.tableHeader}>Belopp</th>
          </tr>
          <UserCourses />
          <UserCourses />
          <UserCourses />
        </table>
      </section>
      {/* <button onClick={handleDeleteUser}>Delete user</button> */}
      {/*  <button onClick={handleChangePassword}>Change password</button> */}

      {/* adminknapp ska sedan tas bort */}
      {/* {permission === "true" ? (
        <button
          onClick={() => {
            navigate("/admin");
          }}
        >
          Admin Page
        </button>
      ) : null} */}

      {/* <button onClick={logout}>Log Out</button> */}
    </main>
    </div>
  );
}

export default Profile;
