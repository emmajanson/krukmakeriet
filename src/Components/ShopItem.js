import React from 'react'
import styles from "./ShopItem.module.css";
import { useContext } from 'react'
import { AppContext } from '../App'

function ShopItem({productData}) {

  const {productBasket, setProductBasket} = useContext(AppContext) 

  function addToBasket(product) {
    if (productBasket === null) {
      setProductBasket([{...product, amount: 1}])
    } else {
      const exist = productBasket.find(item => item.id === productData.id);
      if (exist){
        setProductBasket(
          productBasket.map(item => 
            item.id === product.id ? {...exist, amount: exist.amount + 1} : item
          )
        );
      } else {
        setProductBasket([...productBasket, {...product, amount: 1}])
      }
    }
    
    console.log("Added to basket " + productData.name)
  }

  return (
    <article className={styles.shopItemWrapper}>
    <div className={styles.imgWrapper}>
      <img className={styles.shopItemImage} alt="" />
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