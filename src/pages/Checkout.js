import React, { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import CheckoutItem from "../Components/CheckoutItem";
import { AllContext } from "../context/AllContext";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Popup from "../Components/PopUpTemplate";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function Checkout() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const {
    productBasket,
    setProductBasket,
    courseBasket,
    setCourseBasket,
    setRefresh,
    setBasketAmount,
  } = useContext(AllContext);

  const totalSum = (basket) => {
    let sum = 0;
    basket.forEach((item) => {
      sum += item.price * item.amount;
    });
    return sum;
  };

  let coursesInBasket = "";
  if (courseBasket.length > 0) {
    coursesInBasket = "Kurser";
  }

  let productsInBasket = "";
  if (productBasket.length > 0) {
    productsInBasket = "Produkter";
  }

  const totalSumProduct = totalSum(productBasket);
  const totalSumCourse = totalSum(courseBasket);
  const totalSumBasket = totalSumProduct + totalSumCourse;

  const [userName, setUserName] = useState("");
  const [currUID, setCurrUID] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Checking who's logged in and saving the user-info in states
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrUID(user.uid);
      setUserName(user.displayName);
      setUserEmail(user.email);
    });
  }, []);

  async function updateProducts() {
    // Creates a string-name with the date for the purchase
    const currDate = () => {
      if (new Date().getDate() < 10) {
        return `0${new Date().getDate()}`;
      } else {
        return `${new Date().getDate()}`;
      }
    };
    const currMonth = () => {
      if (new Date().getMonth() + 1 < 10) {
        return `0${new Date().getMonth() + 1}`;
      } else {
        return `${new Date().getMonth() + 1}`;
      }
    };
    const currYear = new Date().getFullYear();
    const currHour = () => {
      if (new Date().getHours() + 1 < 10) {
        return `0${new Date().getHours() + 1}`;
      } else {
        return `${new Date().getHours() + 1}`;
      }
    };
    const currMinute = () => {
      if (new Date().getMinutes() + 1 < 10) {
        return `0${new Date().getMinutes() + 1}`;
      } else {
        return `${new Date().getMinutes() + 1}`;
      }
    };
    const currSecond = () => {
      if (new Date().getSeconds() + 1 < 10) {
        return `0${new Date().getSeconds() + 1}`;
      } else {
        return `${new Date().getSeconds() + 1}`;
      }
    };

    const orderNumber = Math.floor(100000000 + Math.random() * 900000000);
    const currentDate = `${currYear}-${currMonth()}-${currDate()} ${currHour()}:${currMinute()}:${currSecond()}`;

    const userDoc = doc(db, "users", currUID);

    // Adding the purchased Products and Courses to users DB
    if (productBasket || courseBasket) {
      await updateDoc(userDoc, {
        [`purchases.${currentDate}`]: arrayUnion({
          purchasedProducts: {
            product: productBasket.map((item) => {
              return {
                name: item.name,
                amount: item.amount,
                price: item.price,
                orderNumber: orderNumber ? orderNumber : null,
                date: `${currYear}-${currMonth()}-${currDate}`,
              };
            }),
          },
          bookedCourses: {
            courses: courseBasket.map((course) => {
              return {
                name: course.name,
                date: course.details,
                price: course.price,
              };
            }),
          },
        }),
      });

      // Removes items from shoppingcart
      localStorage.setItem("productBasket", "[]");
      localStorage.setItem("courseBasket", "[]");
      setCourseBasket([]);
      setProductBasket([]);
      setBasketAmount(0);
      setRefresh((curr) => !curr);
    } else {
      return;
    }
  }

  // Scroll the page to the top when checking out
  function ScrollToView() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className={styles.siteWrapper}>
      <div className={styles.wrapperAll}>
        <section className={styles.basketWrapper}>
          <h2>Din varukorg</h2>
          <section className={styles.productsWrapper}>
            <h3>{productsInBasket}</h3>
            {productBasket && (
              <section className={styles.basketItemWrapper}>
                <h4 className={styles.subHeading}></h4>
                {productBasket.map((product) => (
                  <CheckoutItem key={product.id} productData={product} />
                ))}
              </section>
            )}
          </section>
          <section className={styles.coursesWrapper}>
            <h3>{coursesInBasket}</h3>
            {courseBasket && (
              <section className={styles.basketItemWrapper}>
                <h4 className={styles.subHeading}></h4>
                {courseBasket.map((product) => (
                  <CheckoutItem key={product.id} productData={product} />
                ))}
              </section>
            )}
          </section>
          <div className={styles.totalAmountWrapper}>
            <p className={styles.totalAmountText}>Totalsumma</p>
            <p className={styles.totalAmountPrice}>{totalSumBasket}:-</p>
          </div>
        </section>

        <form className={styles.userInfoWrapper}>
          <h2>Leveransuppgifter</h2>
          <div className={styles.userFirstInputsWrapper}>
            <label name="firstName">Förnamn och Efternamn*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="name"
              value={userName}
              placeholder="Ex. Anna Andersson"
              required
            ></input>

            <label name="email">E-post*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="email"
              value={userEmail}
              placeholder="Ex. anna@andersson.se"
              required
            ></input>

            <label name="phoneNumber">Telefonnummer*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="phoneNumber"
              placeholder="+46 xxxxxxxx"
              required
            ></input>

            <label name="address">Adress*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="address"
              placeholder="Gatunamn 0"
              required
            ></input>
          </div>

          <div className={styles.userSecondInputsWrapper}>
            <div className={styles.inputSmall}>
              <label name="zipCode">Postnummer*</label>
              <input
                type="text"
                name="zipcode"
                placeholder="xxx xx"
                required
              ></input>
            </div>
            <div className={styles.inputMedium}>
              <label name="city">Stad*</label>
              <input
                type="text"
                name="city"
                placeholder="Ex. Stockholm"
                required
              ></input>
            </div>
          </div>
        </form>

        <section className={styles.paymentWrapper}>
          <h2>Betalningsalternativ</h2>
          <div className={styles.paymentOptions}>
            <div className={styles.paymentSection}>
              <div className={styles.choosePayment}>
                <input
                  type="radio"
                  id="paymentMethod1"
                  name="payment"
                  value="paydirectly"
                />
                <label for="paymentMethod1">Betala direkt</label>
              </div>
              <div className={styles.paymentImgWrapper}>
                <img
                  className={styles.klarnaImg}
                  src={"../images/klarnaLogo.png"}
                  alt="Klarna"
                />
              </div>
            </div>

            <div className={styles.paymentSection}>
              <div className={styles.choosePayment}>
                <input
                  type="radio"
                  id="paymentMethod2"
                  name="payment"
                  value="paylater"
                />
                <label for="paymentMethod2">Betala senare</label>
              </div>
              <div className={styles.paymentImgWrapper}>
                <img
                  className={styles.klarnaImg}
                  src={"../images/klarnaLogo.png"}
                  alt="Klarna"
                />
              </div>
            </div>

            <div className={styles.paymentSection}>
              <div className={styles.choosePayment}>
                <input
                  type="radio"
                  id="paymentMethod3"
                  name="payment"
                  value="swish"
                />
                <label for="paymentMethod3">Swish</label>
              </div>
              <div className={styles.paymentImgWrapper}>
                <img
                  className={styles.swishImg}
                  src={"../images/swish.png"}
                  alt="Swish"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.btnWrapper}>
          <button
            className={styles.checkoutBtn}
            onClick={() => {
              navigate("/Shop");
            }}
          >
            Fortsätt handla
          </button>
          <button
            onClick={() => {
              setShowPopup(true);
              updateProducts();
              ScrollToView();
            }}
            className={styles.checkoutBtn}
          >
            Bekräfta köp
          </button>
          <Popup
            trigger={showPopup}
            setTrigger={setShowPopup}
            navigation={"/shop"}
          >
            <h1>Tack för ditt köp</h1>
            <p>En beställningsbekräftelse har skickats till din epostadress</p>
            <p>Ingen e-post? Kolla i skräpposten.</p>
          </Popup>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
