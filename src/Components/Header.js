import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import {
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import {
  FaTimes,
  FaBars,
} from "react-icons/fa";

function Header() {
  
  const [isActiveMobile, setIsActiveMobile] = useState(false);
  const [isActiveBasket, setIsActiveBasket] = useState(false);

  function toggleMenu(props) {
    setIsActiveMobile(props)
  }
  function toggleBasket(props) {
    setIsActiveBasket(props)
    console.log("TEST")
  }

  return (
    <header className={styles.wrapper}>

      {/* syns i desktop */}
      <header className={styles.desktopWrapper}>
        <div className={styles.logoWrapper}>
          <img className={styles.logoImage} src="" alt="" />
        </div>
        <nav className={styles.linkWrapper}>
          <Link to="/">Start</Link>
          <Link to="/courses">Kurser</Link>
          <Link to="/shop">Butik</Link>
          <Link to="/signin">Logga in</Link>
          <Link to="#"><FiShoppingCart onClick={() => toggleBasket(!isActiveBasket)}/></Link>
        </nav>
      </header>

        {/* syns i mobile */}
        <header className={styles.mobileWrapper}>
          <div className={styles.menuBtn} onClick={() => toggleMenu(!isActiveMobile)}>
            <div> {isActiveMobile ? <FaTimes/> : <FaBars/>}</div>
          </div>
          <nav className={styles.mobileIcons}>
            <Link to="/signin">Logga in</Link>
            <Link to="#"><FiShoppingCart onClick={() => toggleBasket(!isActiveBasket)} /></Link>
          </nav>

          {/* gömda i meny mobile*/}
          <nav className={isActiveMobile ? styles.mobileMenuWrapperShow : styles.mobileMenuWrapperHidden}>
            <Link to="/" onClick={() => toggleMenu(!isActiveMobile)}>Start</Link>
            <Link to="/courses" onClick={() => toggleMenu(!isActiveMobile)}>Kurser</Link>
            <Link to="/shop" onClick={() => toggleMenu(!isActiveMobile)}>Butik</Link>
          </nav>
        </header>

    </header>
  );
}

export default Header;
