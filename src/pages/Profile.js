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
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import styles from "./Profile.module.css";
import ResetPassword from "./ResetPassword.js";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import UserOrders from "../Components/UserOrders";
import UserCourses from "../Components/UserCourses";

//Fånga upp: Firebase: Error (auth/requires-recent-login).

function Profile() {
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [showNewUserEmail, setShowNewUserEmail] = useState(false);
  const [firstNewPassword, setFirstNewPassword] = useState(null);
  const [secondNewPassword, setSecondNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  const navigate = useNavigate();

  const permission = localStorage.getItem("admin");

  // Signs out the user, and navigates to signin-page
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

  useEffect(() => {
    getProducts();
  }, [userID]);

  async function getProducts() {
    const userRef = doc(db, "users", userID);
    const userCollection = await getDoc(userRef);
    const products = userCollection.data().purchases;

    const objKeys = [Object.keys(products)];
    const objValues = [Object.values(products)];

    const productArray = [];
    const courseArray = [];

    objKeys[0].forEach((item, index) => {
      const courseLength = objValues[0][index][0].bookedCourses.courses.length;
      const productLength =
        objValues[0][index][0].purchasedProducts.product.length;

      if (courseLength > 0 && productLength > 0) {
        productArray.push({ [item]: objValues[0][index] });
        courseArray.push({ [item]: objValues[0][index] });
      } else if (courseLength > 0 && productLength <= 0) {
        courseArray.push({ [item]: objValues[0][index] });
      } else if (courseLength <= 0 && productLength > 0) {
        productArray.push({ [item]: objValues[0][index] });
      }
    });

    setUserProducts(productArray);
    setUserCourses(courseArray);
  }

  async function handleDeleteUser() {
    var cred = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, cred)
      .then(() => {
        console.log("reauth funkade");
        setConfirmDeleteUser(true);
      })
      .catch((error) => {
        console.log("lösenordet stämmer inte", error.message);
        setConfirmDeleteUser(false);
      });
    if (confirmDeleteUser === true) {
      deleteUser(user);
      console.log("konto borttaget");
    } else {
      console.log("lösenordet stämde inte");
    }
  }

  async function handleChangePassword() {
    var cred = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, cred)
      .then(() => {
        console.log("reauth funkade");
        setConfirmPassword(true);
      })
      .catch((error) => {
        console.log("lösenordet stämmer inte", error.message);
        setConfirmPassword(false);
      });
    if (confirmPassword === true) {
      console.log("ditt gamla lösenord stämmer");
      if (firstNewPassword !== secondNewPassword) {
        console.log("Lösenorden är inte samma");
      } else {
        updatePassword(user, firstNewPassword);
        console.log("lösenord uppdaterat");
      }
    } else {
      console.log("något stämmer inte");
    }
  }

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
              <p className={styles.text}></p>
              <p className={styles.text}></p>

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
                  id="password1"
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
              {showNewUserEmail ? (
                <p style={{ color: "red" }}>Email changed</p>
              ) : (
                ""
              )}
            </div>
            <button className={styles.button} onClick={handleChangePassword}>
              Uppdatera
            </button>
          </section>
        </section>

        <section className={styles.userOrdersWrapper}>
          <h5 className={styles.subheading}>Dina köp och bokningar</h5>
          <h3 className={styles.title}>Beställningar</h3>
          <table className={styles.tableWrapper}>
            <tr className={styles.tableRow}>
              <th className={styles.tableHeader}>Datum</th>
              <th className={styles.tableHeader}>Ordernr</th>
              <th className={styles.tableHeader}>Belopp</th>
            </tr>
            {userProducts.map((item, index) => {
              return <UserOrders purchase={item} key={index} />;
            })}
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
            {userCourses.map((item, index) => {
              return <UserCourses purchase={item} key={index} />;
            })}
          </table>
        </section>
      </main>
    </div>
  );
}

export default Profile;
