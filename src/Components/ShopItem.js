import React from 'react'
import styles from "./ShopItem.module.css";
import { useContext } from 'react'
import { AppContext } from '../App'

function ShopItem({productData}) {


  const {setProductBasket} = useContext(AppContext) 

  function addToBasket(productData) {
    setProductBasket(prevBasket => [...prevBasket, productData])
    console.log("Added to basket " + productData.name)
  }


  return (
    <article className={styles.shopItemWrapper}>
    <div className={styles.imgWrapper}>
      <img className={styles.shopItemImage} />
      {/* köp vara ikon ska in här och lägg onclicken på den*/}
      <button className={styles.button} onClick={() => addToBasket(productData)}>Lägg till</button>
    </div>
    <div className={styles.textWrapper}>
      <h3 className={styles.name}>{productData.name}</h3>
      <div className={styles.infoPriceWrapper}>
        <p className={styles.info}>{productData.details}</p>
        <p className={styles.price}>{productData.price}</p>
      </div>
    </div>
  </article>
  )
}

export default ShopItem