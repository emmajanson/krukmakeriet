import React, { useContext } from "react";
import styles from "./CheckoutItem.module.css";
import { AllContext } from "../context/AllContext";

function CheckoutItem({ productData }) {
  /*
  let { productBasket} = useContext(AppContext)
  let { courseBasket} = useContext(AppContext)

  
  if (courseBasket === null) {courseBasket = []}
  if (productBasket === null) {productBasket = []}

  */

  const { productBasket, setProductBasket, courseBasket, setCourseBasket } =
    useContext(AllContext);

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
    //.filter på alla som inte är productData.id
    //uppdatera state med den här listan
    setCourseBasket(courseBasket.filter((item) => item.id !== productData.id));
    setProductBasket(
      productBasket.filter((item) => item.id !== productData.id)
    );
  }

  return (
    <article className={styles.productItemWrapper} data-testid="checkoutItem">
      <div className={styles.imgWrapper}>
        <img className={styles.itemImage} src={productData.img} alt="" />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>{productData.name}</h3>
        <p className={styles.info}>{productData.info}</p>
        <p className={styles.price}>{productData.price}</p>
        <div className={styles.editQuantityWrapper}>
          <button
            data-testid="decrementBtn"
            onClick={() => decrementAmount(productData)}
            className={styles.quantityBtn}
          >
            -
          </button>
          <p data-testid="counterText">{productData.amount}</p>
          <button
            data-testid="incrementBtn"
            onClick={() => incrementAmount(productData)}
            className={styles.quantityBtn}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => deleteItem(productData)}
        className={styles.removeBtn}
      >
        Delete
      </button>
    </article>
  );
}

export default CheckoutItem;
