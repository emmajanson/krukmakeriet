import React from 'react'
import styles from "./ShopItem.module.css";

function ShopItem() {
  return (
    <article className={styles.shopItemWrapper}>
    <div className={styles.imgWrapper}>
      <img className={styles.shopItemImage} />
      {/* köp vara ikon ska in här */}
    </div>
    <div className={styles.textWrapper}>
      <h3 className={styles.name}>Namn</h3>
      <div className={styles.infoPriceWrapper}>
        <p className={styles.info}>Beskrivning</p>
        <p className={styles.price}>Pris</p>
      </div>
    </div>
  </article>
  )
}

export default ShopItem