import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img className={styles.logoImage} src="" alt="" /> 
      </div>
      <nav className={styles.navWrapper}>
        <Link to="/">Start</Link>
        <Link to="/courses">Kurser</Link>
        <Link to="/shop">Butik</Link>
        <Link to="/signUp">Logga in</Link>
      </nav>
    </header>
  );
}

export default Header;
