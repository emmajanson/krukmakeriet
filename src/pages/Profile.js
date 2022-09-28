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
      <h2>
        Profile
      </h2>

      {/* uppdatera uppgifter sektion */}
      <section className={styles.userInfoWrapper}>
        <h5>Dina uppgifter</h5>
        {/* här renderas datan ut som hämtas från db via .value i inputsen */}
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="name">Namn</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Förnamn Efternamn"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="email">E-postadress</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="exempel@exempel.se"
          />
        </div>
        <button>Uppdatera</button>
      </section>


      {/* glömt lösen sektion */}
      <section>
        <h5>Glömt lösenord?</h5>
        <p>Fyll i din e-postadress för återställning av lösenord</p>
        <p>Fick du ingen e-post? Kolla i skräpposten. </p>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="email">E-postadress</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="exempel@exempel.se"
          />
        </div>
        <button>Återställ</button>
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
