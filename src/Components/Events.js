import React from 'react'
import styles from "./Events.module.css";

function Events() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.imgWrapper}>
          <img className={styles.eventImage} src="" alt="" />
        </div>
        <div className={styles.textWrapper}>
          <h2 className={styles.heading}>Events</h2>
          <p className={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <button className={styles.button}>Kontakta oss</button>
        </div>
      </div>
    </section>
  )
}

export default Events
