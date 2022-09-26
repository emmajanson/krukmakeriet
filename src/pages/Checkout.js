import React, { useContext } from "react";
import styles from "./Checkout.module.css";
import CheckoutItem from "../Components/CheckoutItem";
import { AllContext } from "../context/AllContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  /*
  let { productBasket} = useContext(AppContext)
  let { courseBasket} = useContext(AppContext)

  
  if (courseBasket === null) {courseBasket = []}
  if (productBasket === null) {productBasket = []}

  */

  const { productBasket, setProductBasket, courseBasket, setCourseBasket } =
    useContext(AllContext);

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

  return (
    <main className={styles.wrapper}>
      <section className={styles.basketWrapper}>
        <h2>Varukorg</h2>
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
        <h3>Total summa {totalSumBasket}:-</h3>
      </section>

      <section className={styles.userInfoWrapper}>
        <h2>Leveransuppgifter</h2>
        <div className={styles.userFirstInputsWrapper}>
          <label name="firstName">Förnamn</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="firstName"
            placeholder="Förnamn"
          ></input>

          <label name="lastName">Efternamn</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="lastName"
            placeholder="Efternamn"
          ></input>

          <label name="email">E-post</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="email"
            placeholder="E-post"
          ></input>

          <label name="phoneNumber">Telefonnummer</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="phoneNumber"
            placeholder="Telefonnummer"
          ></input>

          <label name="address">Adress</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="address"
            placeholder="Adress"
          ></input>
        </div>

        <div className={styles.userSecondInputsWrapper}>
          <div className={styles.inputSmall}>
            <label name="zipCode">Postnummer</label>
            <input type="text" name="zipcode" placeholder="Postnummer"></input>
          </div>
          <div className={styles.inputMedium}>
            <label name="city">Stad</label>
            <input type="text" name="city" placeholder="Stad"></input>
          </div>
        </div>
      </section>

      <section className={styles.paymentWrapper}>
        <h2>Betalningsalternativ</h2>
        <div className={styles.payFirstInputsWrapper}>
          <label name="cardName">Kortinnehavarens namn</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="cardName"
            placeholder="Kortinnehavarens namn"
          ></input>

          <label name="cardNumber">Kortnummer</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="cardNumber"
            placeholder="Kortnummer"
          ></input>
        </div>

        <div className={styles.paySecondInputsWrapper}>
          <div className={styles.inputSmall}>
            <label name="expDate">Datum</label>
            <input type="text" name="expDate" placeholder="Datum"></input>
          </div>
          <div className={styles.inputSmall}>
            <label name="cvc">CVC</label>
            <input type="text" name="cvc" placeholder="Cvc"></input>
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
        <button className={styles.checkoutBtn}>Bekräfta köp</button>
      </section>
    </main>
  );
}

export default Checkout;
