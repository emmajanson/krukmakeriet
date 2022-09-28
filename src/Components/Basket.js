import React, { useContext } from "react";
import BasketItem from "./BasketItem";
import styles from "./Basket.module.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../context/AllContext";

function Basket({ toggleBasket }, isActiveBasket) {
  const navigate = useNavigate();

  /*
  let { productBasket} = useContext(AppContext)
  let { courseBasket} = useContext(AppContext)

  
  if (courseBasket === null) {courseBasket = []}
  if (productBasket === null) {productBasket = []}

  */

  const { productBasket, courseBasket } = useContext(AllContext);

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
            navigate("/checkout");
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
