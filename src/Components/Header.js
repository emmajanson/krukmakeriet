import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Basket from "./Basket";
// fiUser ska sedan användas som profillogga när man är inloggad
import {
  FiShoppingCart,
  // FiUser,
} from "react-icons/fi";
import { Spin as Hamburger } from 'hamburger-react';

function Header() {
  const [isActiveMobile, setIsActiveMobile] = useState(false);
  const [isActiveBasket, setIsActiveBasket] = useState(false);

  function toggleMenu(props) {
    setIsActiveMobile(props);
  }

  function toggleBasket(props) {
    setIsActiveBasket(props);
  }

  return (
    <header className={styles.wrapper}>
      <header className={styles.desktopWrapper}>
        <div className={styles.logoWrapper}>
          <img className={styles.logoImage} src="" alt="" />
        </div>
        <nav className={styles.linkWrapper}>
          <Link to="/">Start</Link>
          <Link to="/courses">Kurser</Link>
          <Link to="/shop">Butik</Link>
          <Link to="/signin">Logga in</Link>
          {/* profile ska sedan visas när man är inloggad */}
          {/* <Link to="/profile"><FiUser/></Link> */}
          {/* admin som sedan ska visas om man är inloggad som admin */}
          {/* <Link to="/admin"><FiUser/></Link> */}
          <Link to="#">
            <FiShoppingCart onClick={() => toggleBasket(!isActiveBasket)} />
          </Link>
        </nav>
      </header>

      <header className={styles.mobileWrapper}>
        <div className={styles.menuBtn} onClick={() => toggleMenu(!isActiveMobile)}>
        <Hamburger/>
        </div>
        <nav className={styles.mobileIcons}>
          <Link to="/signin">Logga in</Link>
          {/* profile ska sedan visas när man är inloggad */}
          {/* <Link to="/profile"><FiUser/></Link> */}
          {/* admin som sedan ska visas om man är inloggad som admin */}
          {/* <Link to="/admin"><FiUser/></Link> */}
          <Link to="#">
            <FiShoppingCart onClick={() => toggleBasket(!isActiveBasket)} />
          </Link>
        </nav>

        <nav
          className={
            isActiveMobile
              ? styles.mobileMenuWrapperShow
              : styles.mobileMenuWrapperHidden
          }
        >
          <Link to="/" onClick={() => toggleMenu(!isActiveMobile)}>
            Start
          </Link>
          <Link to="/courses" onClick={() => toggleMenu(!isActiveMobile)}>
            Kurser
          </Link>
          <Link to="/shop" onClick={() => toggleMenu(!isActiveMobile)}>
            Butik
          </Link>
        </nav>
      </header>

      <section
        className={
          isActiveBasket ? styles.basketWrapperShow : styles.basketWrapperHidden
        }
      >
        <Basket toggleBasket={toggleBasket} isActiveBasket={isActiveBasket} />
      </section>
    </header>
  );
}

export default Header;
