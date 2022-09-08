import React from 'react'
import styles from "./CheckoutItem.module.css";

function CheckoutItem() {
  return (
    <article className={styles.productItemWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.itemImage} src="" alt="" />
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>Namn</h3>
        <p className={styles.info}>Beskrivning</p>
        <p className={styles.price}></p>
        <div className={styles.editQuantityWrapper}>
          <button className={styles.quantityBtn}>-</button>
          <p>0</p>
          <button className={styles.quantityBtn}>+</button>
        </div>
      </div>
      <button className={styles.removeBtn}>[ikon]</button>
    </article>
  )
}

export default CheckoutItem