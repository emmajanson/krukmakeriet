import React, { useContext, useEffect, useState } from "react";
import BasketItem from "./BasketItem";
import styles from "./Basket.module.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../context/AllContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { act } from "react-dom/test-utils";

function Basket({ toggleBasket }, isActiveBasket) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  // Checking who's logged in and saving the user in a state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      act(() => {
        setUser(currentUser);
      });
    });
  }, []);

  const { productBasket, courseBasket } = useContext(AllContext);

  //Runs an forEach loop and returns the total sum of those items

  const totalSum = (basket) => {
    let sum = 0;
    basket.forEach((item) => {
      sum += item.price * item.amount;
    });
    return sum;
  };

  //Runs the totalSum function and returns the total sum of the products and courses
  const totalSumProduct = totalSum(productBasket);
  const totalSumCourse = totalSum(courseBasket);
  const totalSumBasket = totalSumProduct + totalSumCourse;

  //Makes the <h4> text appear if products/courses are in the basket

  let coursesInBasket = "";
  if (courseBasket.length > 0) {
    coursesInBasket = "Kurser";
  }

  let productsInBasket = "";
  if (productBasket.length > 0) {
    productsInBasket = "Produkter";
  }

  function ScrollToView() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section className={styles.wrapper}>
      <section className={styles.headingWrapper}>
        <h2 className={styles.heading}>Varukorg</h2>
        <button
          className={styles.closingBtn}
          onClick={() => toggleBasket(!isActiveBasket)}
        >
          <FaTimes />
        </button>
      </section>

      {productBasket && (
        <section className={styles.basketItemWrapper}>
          <h4 className={styles.subHeading}>{productsInBasket}</h4>
          {productBasket.map((product) => (
            <BasketItem key={product.id} productData={product} />
          ))}
        </section>
      )}

      {courseBasket && (
        <section className={styles.basketItemWrapper}>
          <h4 className={styles.subHeading}>{coursesInBasket}</h4>
          {courseBasket.map((product) => (
            <BasketItem key={product.id} productData={product} />
          ))}
        </section>
      )}

      <section className={styles.checkoutWrapper}>
        <div className={styles.totalAmountWrapper}>
          <p className={styles.totalAmountText}>Totalsumma</p>
          <p className={styles.totalAmountPrice}>{totalSumBasket}:-</p>
        </div>
        <button
          className={styles.checkoutBtn}
          onClick={() => {
            user === null
              ? navigate("/signin", { state: true })
              : navigate("/checkout");
            ScrollToView();
            toggleBasket(!isActiveBasket);
          }}
        >
          Till kassan
        </button>
      </section>
    </section>
  );
}

export default Basket;
