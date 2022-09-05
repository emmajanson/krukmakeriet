import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.navWrapper}>
        <Link to="/">Start</Link>
        <Link to="/courses">Kurser</Link>
        <Link to="/events">Event</Link>
        <Link to="/shop">Butik</Link>
      </nav>
    </header>
  );
}

export default Header;
