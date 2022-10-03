import React from "react";
import styles from "./Events.module.css";

function Events() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.imgWrapper}>
          <img
            className={styles.eventImage}
            src={process.env.PUBLIC_URL + "/images/event.jpg"}
            alt=""
          />
        </div>
        <div className={styles.textWrapper}>
          <h2 className={styles.heading}>Events</h2>
          <p className={styles.info}>
            Letar ni efter nya möjlighet att utveckla ert team på företaget? 
            Vi erbjuder skräddarsydda events i en miljövänlig och kreativ miljö.
            Tillsammans får ni lära er den spännande konsten att dreja och skapa i keramik, 
            samtidigt som ni lär känna varandra på en djupare nivå. 
            
          </p>
          <p className={styles.info}>
            Vi visar er hur man drejar och de grundläggande teknikerna för att ge er de bästa förutsättningarna.
            Det ingår lera och ett glasyrbränt föremål samt tillgång till verktyg och ugn.
            Våga prova något nytt och skapa tillsammans. Skicka ett mail så skapar vi ett minnesvärt event efter era önskemål.
          </p>
          <button className={styles.button}>Kontakta oss</button>
        </div>
      </div>
    </section>
  );
}

export default Events;
