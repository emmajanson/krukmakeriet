import React from 'react'
import styles from "./BasketItem.module.css";

function BasketItem({productData}) {


  return (
    <article className={styles.wrapper}>

      <div className={styles.imgWrapper}>
        <img src="" alt="" className={styles.basketImage} />
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.heading}>{productData.name}</p>
        <div className={styles.changeAmountWrapper}>
          <p className={styles.changeAmount}> - </p>
          {/* <input className={styles.input} type="number"/> */}
          <p>{productData.amount}</p>
          <p className={styles.changeAmount}> + </p>
        </div>
      </div>

      <div className={styles.priceDeleteWrapper}>
        <p className={styles.price}>000:-</p>
        {/* ska bytas ut mot papperskorg */}
        <button className={styles.deleteBtn}> D </button>
      </div>

    </article>
  )
}

export default BasketItem