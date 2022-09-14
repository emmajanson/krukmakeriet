import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { 
  FaBars, 
  FaTimes,
} from "react-icons/fa";

/* MOBILMENY */

function Header() {
 const [Mobile, setMobile] = useState(false)

  return (
    <header className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img className={styles.logoImage} src="" alt="" />
      </div>
      <nav className={Mobile ? styles.LinkWrapperMobile : styles.LinkWrapper} onClick={() => setMobile (false)}>
        <Link to="/">Start</Link>
        <Link to="/courses">Kurser</Link>
        <Link to="/shop">Butik</Link>
        <Link to="/signin">Logga in</Link>
        <Link to="#"><FiShoppingCart /></Link>
      </nav>
      <button className={styles.mobileMenuIcon} onClick={() => setMobile(!Mobile)}>
          {Mobile ? <FaTimes /> : <FaBars/>}
      </button>
    </header> 
  );
}

export default Header;
