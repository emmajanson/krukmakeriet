import React from "react";
import styles from "./Courses.module.css";

// Det här ska finnas
// - funktion för att mappa ut alla kurser som finns
// - funktion för att boka in sig på kurs

function Courses() {
  return (
    <main data-testid="courses" className={styles.wrapper}>
      <h2 className={styles.heading}>[kurser]</h2>
      <section className={styles.courseWrapper}>
        {/* Detta ska sedan mappas ut per kurs sedan. Testar endast med flera*/}
        <article className={styles.courseCardWrapper}>
          <div className={styles.imgWrapper}>
            <img className={styles.courseImage} src="" alt="" />
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.name}>[Kursnamn]</h3>
            <p className={styles.date}>[datum]</p>
            <p className={styles.length}>[längd] </p>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </p>
            <p className={styles.price}>xxx :-</p>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Boka</button>
          </div>
        </article>

        <article className={styles.courseCardWrapper}>
          <div className={styles.imgWrapper}>
            <img className={styles.courseImage} src="" alt="" />
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.name}>[Kursnamn]</h3>
            <p className={styles.date}>[datum]</p>
            <p className={styles.length}>[längd] </p>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </p>
            <p className={styles.price}>xxx :-</p>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Boka</button>
          </div>
        </article>

        <article className={styles.courseCardWrapper}>
          <div className={styles.imgWrapper}>
            <img className={styles.courseImage} src="" alt="" />
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.name}>[Kursnamn]</h3>
            <p className={styles.date}>[datum]</p>
            <p className={styles.length}>[längd] </p>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{" "}
            </p>
            <p className={styles.price}>xxx :-</p>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Boka</button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Courses;
