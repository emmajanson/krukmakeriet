import React, { useContext } from "react";
import styles from "./CheckoutItem.module.css";
import { AllContext } from "../context/AllContext";
import { FaTrash } from "react-icons/fa";

function CheckoutItem({ productData }) {
  const { productBasket, setProductBasket, courseBasket, setCourseBasket } =
    useContext(AllContext);

  const basketZero = productData.amount === 0;

  const isProduct = courseBasket.some((product) => {
    if (product.id === productData.id) {
      return true;
    }
    return false;
  });

  function decrementAmount(productData) {
    const courseExist = courseBasket.find((item) => item.id === productData.id);
    const productExist = productBasket.find(
      (item) => item.id === productData.id
    );

    if (isProduct) {
      courseExist.amount > 0
        ? setCourseBasket(
            courseBasket.map((item) =>
              item.id === productData.id
                ? { ...courseExist, amount: courseExist.amount + -1 }
                : item
            )
          )
        : console.log("Nothing to remove");
    } else {
      productExist.amount > 0
        ? setProductBasket(
            productBasket.map((item) =>
              item.id === productData.id
                ? { ...productExist, amount: productExist.amount + -1 }
                : item
            )
          )
        : console.log("Nothing to remove");
    }
  }

  function incrementAmount(productData) {
    const productExist = productBasket.find(
      (item) => item.id === productData.id
    );
    setProductBasket(
      productBasket.map((item) =>
        item.id === productData.id
          ? { ...productExist, amount: productExist.amount + 1 }
          : item
      )
    );

    const courseExist = courseBasket.find((item) => item.id === productData.id);
    setCourseBasket(
      courseBasket.map((item) =>
        item.id === productData.id
          ? { ...courseExist, amount: courseExist.amount + 1 }
          : item
      )
    );
  }

  function deleteItem(productData) {
    setCourseBasket(courseBasket.filter((item) => item.id !== productData.id));
    setProductBasket(
      productBasket.filter((item) => item.id !== productData.id)
    );
  }

  return (
    <article className={styles.wrapper} data-testid="checkoutItem">
      <div className={styles.imgWrapper}>
        <img src={productData.img} alt="" className={styles.basketImage} />
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.heading}>{productData.name}</p>
        <div className={styles.changeAmountWrapper}>
          {basketZero ? (
            <p
              className={styles.changeAmount}
              onClick={() => decrementAmount(productData)}
            ></p>
          ) : (
            <p
              className={styles.changeAmount}
              onClick={() => decrementAmount(productData)}
            >
              {" "}
              -{" "}
            </p>
          )}

          <p>{productData.amount}</p>
          <p
            className={styles.changeAmount}
            data-testid="incrementBtn"
            onClick={() => incrementAmount(productData)}
          >
            +
          </p>
        </div>
      </div>

      <div className={styles.priceDeleteWrapper}>
        <p className={styles.price}>{productData.price}:-</p>
        <FaTrash
          className={styles.deleteBtn}
          data-testid="decrementBtn"
          onClick={() => deleteItem(productData)}
        />
      </div>
    </article>
  );
}

export default CheckoutItem;
