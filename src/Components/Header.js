import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Basket from "./Basket";
import { AllContext } from "../context/AllContext";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
// fiUser ska sedan användas som profillogga när man är inloggad
import { FaShoppingBag, FaUserAlt,FaUser } from "react-icons/fa";
import HamburgerButton from "./HamburgerButton";
// import { doc } from "firebase/firestore";

function Header() {
  const [isActiveMobile, setIsActiveMobile] = useState(false);
  const [isActiveBasket, setIsActiveBasket] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const { productBasket, courseBasket, adminPermission } =
    useContext(AllContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  let totalAmountinProduct = 0;
  if (productBasket) {
    productBasket.forEach((item) => {
      totalAmountinProduct += item.amount;
    });
  }

  let totalAmountinCourse = 0;
  if (courseBasket) {
    courseBasket.forEach((item) => {
      totalAmountinCourse += item.amount;
    });
  }

  let basketAmount = totalAmountinProduct + totalAmountinCourse;

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
          <img
            className={styles.logoImage}
            src="../images\headerLogoDesktop.png"
            alt=""
          />
        </div>

        <nav className={styles.navMiddle}>
          <Link to="/">Hem</Link>
          <Link data-testid="toCourses" to="/courses">
            Kurser
          </Link>
          <Link to="/shop">Butik</Link>
        </nav>

        <nav className={styles.navRightSide}>
          {user == null ? (
            <Link to="/signin">Logga in</Link>
          ) : (
            <Link to={adminPermission ? "/admin" : "/profile"}><FaUser/></Link>
          )}

          {/* profile ska sedan visas när man är inloggad */}
          {/* <Link to="/profile"><FiUser/></Link> */}
          {/* admin som sedan ska visas om man är inloggad som admin */}
          {/* <Link to="/admin"><FiUser/></Link> */}

          <Link to="#">
            <FaShoppingBag
              className={styles.shoppingCart}
              onClick={() => toggleBasket(!isActiveBasket)}
            />
          </Link>
          <nav
            data-count={basketAmount}
            className={
              basketAmount ? styles.linkWrapper : styles.linkWrapperFalse
            }
          ></nav>
        </nav>
      </header>

      {/* MOBILMENY */}
      <header className={styles.mobileWrapper}>
        <div
          className={styles.BurgerBtn}
          onClick={() => toggleMenu(!isActiveMobile)}
        >
          <HamburgerButton />
        </div>
        <div className={styles.mobLogoWrapper}>
            <img className={styles.mobLogo}src={"../images/headerLogoMobile.png"} alt="Logo"/>
        </div>

        <div>
          {basketAmount ? (
            <nav data-count={basketAmount} className={styles.mobileIcons}>
              <Link to="#">
                <FaShoppingBag onClick={() => toggleBasket(!isActiveBasket)} />
              </Link>
            </nav>
          ) : (
            <nav id={styles.mobileIcons}>
              <Link to="#">
                <FaShoppingBag onClick={() => toggleBasket(!isActiveBasket)} />
              </Link>
            </nav>
          )}
        </div>

        <nav
          className={
            isActiveMobile
              ? styles.mobileMenuWrapperShow
              : styles.mobileMenuWrapperHidden
          }
        >
          <div className={styles.MobileMenuLinkWrapper}>
            <Link to="/">Hem</Link>
            <Link to="/courses">Kurser</Link>
            <Link to="/shop">Butik</Link>
            {user == null ? (<Link to="/signin">Logga in</Link>) : (<Link to={adminPermission ? "/admin" : "/profile"}>Profil</Link>
            )}
          </div>
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