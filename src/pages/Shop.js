import React from 'react'
import ShopItem from '../Components/ShopItem';
import styles from "./Shop.module.css";

function Shop() {









  return (
    <main className={styles.wrapper}>
      <h2>Butiken</h2>
      <section className={styles.shopWrapper}>
        {/* endast test för att rendera många varor
        byts sedan till att mappa ut från db och 
        skicka infon som props till komponent */}
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
      </section>
    </main>
  )
}

export default Shop
