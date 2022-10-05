import { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  signOut,
  onAuthStateChanged,
  deleteUser,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import styles from "./Profile.module.css";

import { doc, getDoc } from "firebase/firestore";
import UserOrders from "../Components/UserOrders";
import UserCourses from "../Components/UserCourses";

function Profile() {
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState("");
  const [oldPassword, setOldPassword] = useState(null);
  const [firstNewPassword, setFirstNewPassword] = useState(null);
  const [secondNewPassword, setSecondNewPassword] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage1, setShowErrorMessage1] = useState(false);
  const [showErrorMessage2, setShowErrorMessage2] = useState(false);
  const [showErrorMessageDelete, setShowErrorMessageDelete] = useState(false);

  const navigate = useNavigate();

  const inputRef1 = useRef("");
  const inputRef2 = useRef("");
  const inputRef3 = useRef("");
  const inputRef4 = useRef("");

  var passwordChecker = false;
  var deleteChecker = false;

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

    // Converting the purchased items to new separate arrays
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

  // Check's if the password is correct, if it is you can delete the account.
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
      setShowErrorMessageDelete(true);
      setTimeout(() => {
        setShowErrorMessageDelete(false);
      }, 5000);
    }
    inputRef1.current.value = "";
  }

  // Check's if the  old password is correct, and if the two  new input passwords matches
  async function handleChangePassword() {
    inputRef2.current.value = "";
    inputRef3.current.value = "";
    inputRef4.current.value = "";
    var cred = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, cred)
      .then(() => {
        passwordChecker = true;
      })
      .catch((error) => {
        passwordChecker = false;
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

  return user == null || user.emailVerified === false ? (
    <Navigate to="/signin" />
  ) : (
    <div className={styles.bgWrapper} data-test="profile-test">
      <main className={styles.wrapper}>
        <h2 className={styles.heading}>Profil</h2>

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
                  ref={inputRef1}
                  id="password1"
                  type="password"
                  name="password"
                  placeholder="***********"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
                {showErrorMessageDelete ? (
                  <p style={{ color: "red" }}>Fel lösenord</p>
                ) : (
                  ""
                )}
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
                ref={inputRef2}
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
                ref={inputRef3}
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
                ref={inputRef4}
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
