import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import styles from "./Profile.module.css";

function Profile() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  async function logout() {
    await signOut(auth);
    navigate("/signin");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  console.log(user);

  return (
    <main className={styles.wrapper}>
      <h1>Welcome to your profile {location.state.user}!</h1>
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

      <button onClick={logout}>Log Out</button>
    </main>
  );
}

export default Profile;
