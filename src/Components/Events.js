import React from 'react'
import styles from "./Events.module.css";

// Det här ska finnas
// - visa information om event

function Events() {
  return (
    <section className={styles.wrapper}>
      <h2>[Events]</h2>
      <div className={styles.eventWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <p className={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <p className={styles.info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        </div>
        <button className={styles.button}>Kontakta oss</button>
      </div>
    </section>
  )
}

export default Events
