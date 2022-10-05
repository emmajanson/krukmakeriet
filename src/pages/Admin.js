import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import ListOfExsitingCourses from "../Components/ListOfExsitingCourses";
import ListOfExsitingProducts from "../Components/ListOfExsitingProducts";
import { auth } from "../firebase-config";

import {
  deleteUser,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Admin() {
  const permission = localStorage.getItem("admin");
  const [rerender, setRerender] = useState(false);
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [firstNewPassword, setFirstNewPassword] = useState(null);
  const [secondNewPassword, setSecondNewPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage1, setShowErrorMessage1] = useState(false);
  const [showErrorMessage2, setShowErrorMessage2] = useState(false);

  const navigate = useNavigate();

  var passwordChecker = false;
  var deleteChecker = false;

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("admin");
    navigate("/signin");
  }

  // Checking who's logged in and saving the user in a state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserID(currentUser.uid);
    });
  }, []);

  async function handleDeleteUser() {
    var cred = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, cred)
      .then(() => {
        deleteChecker = true;
      })
      .catch((error) => {
        deleteChecker = false;
      });
    if (deleteChecker === true) {
      deleteUser(user);
    } else {
      console.log("lösenordet stämde inte");
    }
  }

  async function handleChangePassword() {
    var cred = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, cred)
      .then(() => {
        passwordChecker = true;
        console.log("auth funkade", passwordChecker);
      })
      .catch((error) => {
        passwordChecker = false;
        console.log("auth funkade inte", passwordChecker);
      });
    if (passwordChecker === true) {
      if (firstNewPassword !== secondNewPassword) {
        console.log("inte samma pass");
        setShowErrorMessage1(true);
        setTimeout(() => {
          setShowErrorMessage1(false);
        }, 5000);
      } else {
        updatePassword(user, firstNewPassword);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
        console.log("lösenord bytt");
      }
    } else {
      setShowErrorMessage2(true);
      setTimeout(() => {
        setShowErrorMessage2(false);
      }, 5000);
      console.log("lösenordet stämmer inte");
    }
  }

  return permission === "true" ? (
    <div className={styles.bgWrapper}>
      <main className={styles.wrapper}>
        <h2 className={styles.heading}>Administration</h2>

        <section className={styles.userInfoWrapper}>
          <h5 className={styles.subheading}>Ditt konto</h5>

          <section className={styles.accountSection}>
            <article className={styles.article}>
              <h6 className={styles.title}>Dina uppgifter</h6>

              {/* !!!rendera ut kunden uppgifter i p-taggarna nedan!!!! */}
              <p className={styles.text}>{user.displayName}</p>
              <p className={styles.text}>{user.email}</p>

              <button className={styles.button} onClick={logout}>
                Logga ut
              </button>
            </article>
            <article className={styles.article}>
              <h6 className={styles.title}>Ta bort konto</h6>
              <p className={styles.text}>
                {" "}
                För att ta bort ditt konto behöver du fylla i ditt lösenord
              </p>
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
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
              <button className={styles.button} onClick={handleDeleteUser}>
                Ta bort
              </button>
            </article>
          </section>

          <section className={styles.passwordSection}>
            <h6 className={styles.title}>Byt lösenord</h6>
            <p className={styles.text}>Här kan du byta ditt lösenord</p>
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
                  setOldPassword(e.target.value);
                }}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label} htmlFor="password">
                Nytt lösenord
              </label>
              <input
                id="new-password"
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
              {showMessage ? (
                <p style={{ color: "green" }}>Lösenord ändrat</p>
              ) : (
                ""
              )}
              {showErrorMessage1 ? (
                <p style={{ color: "red" }}>Lösenorden är inte samma</p>
              ) : (
                ""
              )}
              {showErrorMessage2 ? (
                <p style={{ color: "red" }}>Fel lösenord</p>
              ) : (
                ""
              )}
            </div>
            <button className={styles.button} onClick={handleChangePassword}>
              Uppdatera
            </button>
          </section>
        </section>

        <ListOfExsitingCourses rerender={setRerender} />
        <ListOfExsitingProducts rerender={setRerender} />
      </main>
    </div>
  ) : (
    <h1 style={{ paddingTop: "10rem" }}>Access denied!</h1>
  );
}

export default Admin;
