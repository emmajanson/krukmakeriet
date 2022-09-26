import React, { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import CheckoutItem from "../Components/CheckoutItem";
import { AllContext } from "../context/AllContext";
import { useNavigate } from "react-router-dom";
import Popup from "../Components/PopUpCheckout";

function Checkout() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

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

  // _PRODUCTS_
  // 1. Lägga till de köpta Products i användarens DB. (för varje köp, lägg till ett nytt objekt (döp till ett datum))
  // 2. Uppdatera "amount" på de produkter som köpts (Går inte att minska under 0).

  // _COURSES_
  // 1. Lägga till Courses i användarens DB.
  // 2. Uppdatera "spots" i den kursen som är bokad.
  // 3. Lägga till användarens E-mail i en array på den kurs som är bokad (för admin).

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

      <form className={styles.userInfoWrapper}>
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
            required
          ></input>

          <label name="email">E-post</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="email"
            placeholder="E-post"
            required
          ></input>

          <label name="phoneNumber">Telefonnummer</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="phoneNumber"
            placeholder="Telefonnummer"
            required
          ></input>

          <label name="address">Adress</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="address"
            placeholder="Adress"
            required
          ></input>
        </div>

        <div className={styles.userSecondInputsWrapper}>
          <div className={styles.inputSmall}>
            <label name="zipCode">Postnummer</label>
            <input type="text" name="zipcode" placeholder="Postnummer" required></input>
          </div>
          <div className={styles.inputMedium}>
            <label name="city">Stad</label>
            <input type="text" name="city" placeholder="Stad" required></input>
          </div>
        </div>
      </form>

      <section className={styles.paymentWrapper}>
        <h2>Betalningsalternativ</h2>
        <div className={styles.payFirstInputsWrapper}>
          <label name="cardName">Kortinnehavarens namn</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="cardName"
            placeholder="Kortinnehavarens namn"
            required
          ></input>

          <label name="cardNumber">Kortnummer</label>
          <input
            className={styles.inputLarge}
            type="text"
            name="cardNumber"
            placeholder="Kortnummer"
            required
          ></input>
        </div>

        <div className={styles.paySecondInputsWrapper}>
          <div className={styles.inputSmall}>
            <label name="expDate">Datum</label>
            <input type="text" name="expDate" placeholder="Datum" required></input>
          </div>
          <div className={styles.inputSmall}>
            <label name="cvc">CVC</label>
            <input type="text" name="cvc" placeholder="Cvc" required  ></input>
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
        <button onClick={() => {setShowPopup(true); }}className={styles.checkoutBtn}>Bekräfta köp</button>
        <Popup trigger={showPopup} setTrigger={setShowPopup}>
        <h1>Tack för ditt köp! </h1>
        <p>Ett bekfrätelsemail har skickats till din angivna mailadress. (Kolla skräppost)</p>
      </Popup>
      </section>
    </main>
  );
}

export default Checkout;
