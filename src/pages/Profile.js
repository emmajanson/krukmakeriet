import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import styles from "./Profile.module.css";

function Profile() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

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
    });
  }, []);

  console.log(user);

  return user == null ? (
    <Navigate to="/signin" />
  ) : (
    <main className={styles.wrapper}>
      <h1>
        Welcome to your profile {location.state ? location.state.user : ""}!
      </h1>
      <section className={styles.userInfoWrapper}>
        <h2>Dina uppgifter</h2>
        {/* här renderas datan ut som hämtas från db via .value i inputsen */}
        {/* gör klart inputsen */}
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </section>

      <section className={styles.userOrdersWrapper}>
        <h2>Dina köp och bokningar</h2>
        {/* här renderas datan från user-orders? ut via komponent */}
        <h3 className={styles.sectionHeader}>Beställningar</h3>
        {/* table ska bli komponenten sen */}
        <table className={styles.tableWrapper}>
          <tr className={styles.row}>
            <th>Kurs</th>
            <th>Datum</th>
            <th>Belopp</th>
          </tr>

          <tr className={styles.row}>
            <td>00/00/0000</td>
            <td>000000000000</td>
            <td>450 kr</td>
          </tr>

          <tr className={styles.row}>
            <td>00/00/0000</td>
            <td>000000000000</td>
            <td>450 kr</td>
          </tr>
        </table>
      </section>

      <section className={styles.userCoursesWrapper}>
        {/* här renderas datan från user-courses? ut via komponent */}
        <h3 className={styles.sectionHeader}>Kurser</h3>
        {/* table ska bli komponenten sen */}
        <table className={styles.tableWrapper}>
          <tr className={styles.row}>
            <th>Kurs</th>
            <th>Datum</th>
            <th>Belopp</th>
          </tr>

          <tr className={styles.row}>
            <td>Kursnamn</td>
            <td>00/00/0000 00:00</td>
            <td>450 kr</td>
          </tr>

          <tr className={styles.row}>
            <td>Kursnamn</td>
            <td>00/00/0000 00:00</td>
            <td>450 kr</td>
          </tr>
        </table>
      </section>

      { permission === "true" ? (
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
