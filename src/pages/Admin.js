import React, { useState } from "react";
import styles from "./Admin.module.css";
import ListOfExsitingCourses from "../Components/ListOfExsitingCourses";
import ListOfExsitingProducts from "../Components/ListOfExsitingProducts";

function Admin() {
  const permission = localStorage.getItem("admin");
  const [rerender, setRerender] = useState(false);

  return permission === "true" ? (
    <main className={styles.wrapper}>
      <h2 className={styles.heading}>Administration</h2>

      <section className={styles.userInfoWrapper}>
        <h5 className={styles.subheading}>Ditt konto</h5>

        <section className={styles.accountSection}>
          <article className={styles.article}>
            <h6 className={styles.title}>Dina uppgifter</h6>


            {/* !!!rendera ut kunden uppgifter i p-taggarna nedan!!!! */}
            <p className={styles.text}>Förnamn Efternamn</p>
            <p className={styles.text}>exempel@exempel.se</p>

            <button className={styles.button}>Logga ut</button>
            {/* <button className={styles.button} onClick={logout}>Logga ut</button> */}
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
                // onChange={(e) => {
                //   setFirstNewPassword(e.target.value);
                // }}
                />
              </div>
              <button className={styles.button}>Ta bort</button>
            {/* <button className={styles.button} onClick={handleDeleteUser}>Ta bort</button> */}
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
              // onChange={(e) => {
              //   setFirstNewPassword(e.target.value);
              // }}
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
              // onChange={(e) => {
              //   setFirstNewPassword(e.target.value);
              // }}
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
              // onChange={(e) => {
              //   setSecondNewPassword(e.target.value);
              // }}
            />
            {/* {showNewUserEmail ? (<p style={{ color: "red" }}>Email changed</p>) : ("")} */}
          </div>
          <button className={styles.button}>Uppdatera</button>
          {/* <button className={styles.button} onClick={handleChangePassword}>Uppdatera</button> */}
        </section>
      </section>

      <ListOfExsitingCourses rerender={setRerender} />
      <ListOfExsitingProducts rerender={setRerender} />
    </main>
  ) : (
    <h1 style={{ paddingTop: "10rem" }}>Access denied!</h1>
  );
}

export default Admin;
