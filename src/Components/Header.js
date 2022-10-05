import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Basket from "./Basket";
import { AllContext } from "../context/AllContext";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import HamburgerButton from "./HamburgerButton";
import { act } from "react-test-renderer";
// import { doc } from "firebase/firestore";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveMobile, setIsActiveMobile] = useState(false);
  const [isActiveBasket, setIsActiveBasket] = useState(false);
  const [user, setUser] = useState({});

  const {
    productBasket,
    courseBasket,
    adminPermission,
    setShowTopBtn,
    basketAmount,
    setBasketAmount,
  } = useContext(AllContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      act(() => {
        setUser(currentUser);
      });
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

  useEffect(() => {
    setBasketAmount(totalAmountinProduct + totalAmountinCourse);
  }, [totalAmountinCourse, totalAmountinProduct]);

  function toggleMenu(isActiveMobile, isOpen) {
    setIsActiveMobile(!isActiveMobile);
    setIsOpen(!isOpen);
  }

  function toggleBasket(props) {
    setIsActiveBasket(props);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, [setShowTopBtn]);
  function ScrollToView() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          <Link title="kurser" to="/" onClick={ScrollToView}>
            Hem
          </Link>
          <Link to="/courses" onClick={ScrollToView}>
            Kurser
          </Link>
          <Link to="/shop" onClick={ScrollToView}>
            Butik
          </Link>
        </nav>

        <nav className={styles.navRightSide}>
          {user == null ? (
            <Link to="/signin">
              <FaUser className={styles.desktopIcons} />
            </Link>
          ) : (
            <Link to={adminPermission ? "/admin" : "/profile"}>
              <FaUser className={styles.desktopIconsLoggedIn} />
            </Link>
          )}

          <Link to="#">
            <FaShoppingBag
              className={styles.desktopIcons}
              onClick={() => toggleBasket(!isActiveBasket)}
            />
          </Link>
          <nav
            data-count={basketAmount}
            className={
              basketAmount > 0 ? styles.linkWrapper : styles.linkWrapperFalse
            }
          ></nav>
        </nav>
      </header>

      {/* MOBILMENY */}
      <div
        className={isActiveMobile ? styles.overlayOn : styles.overlayOff}
        onClick={() => toggleMenu(isActiveMobile, isOpen)}
      ></div>
      <header className={styles.mobileWrapper}>
        <div
          className={styles.BurgerBtn}
          onClick={() => toggleMenu(isActiveMobile, isOpen)}
        >
          <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className={styles.mobLogoWrapper}>
          <img
            className={styles.mobLogo}
            src={"../images/headerLogoMobile.png"}
            alt="Logo"
          />
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
          <div className={styles.mobileMenuLinkWrapper}>
            <Link
              onClick={() => {
                toggleMenu(isActiveMobile, isOpen);
                ScrollToView();
              }}
              to="/"
            >
              Hem
            </Link>
            <Link
              onClick={() => {
                toggleMenu(isActiveMobile, isOpen);
                ScrollToView();
              }}
              to="/courses"
            >
              Kurser
            </Link>
            <Link
              onClick={() => {
                toggleMenu(isActiveMobile, isOpen);
                ScrollToView();
              }}
              to="/shop"
            >
              Butik
            </Link>
            {user == null ? (
              <Link
                onClick={() => {
                  toggleMenu(isActiveMobile, isOpen);
                  ScrollToView();
                }}
                to="/signin"
              >
                Logga in
              </Link>
            ) : (
              <Link
                onClick={() => {
                  toggleMenu(isActiveMobile, isOpen);
                  ScrollToView();
                }}
                to={adminPermission ? "/admin" : "/profile"}
              >
                {adminPermission ? "Admin" : "Profil"}
              </Link>
            )}
            {user == null ? (
              <Link
                onClick={() => {
                  toggleMenu(isActiveMobile, isOpen);
                  ScrollToView();
                }}
                to="/signup"
              >
                Registrera dig
              </Link>
            ) : (
              <Link to=""></Link>
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
