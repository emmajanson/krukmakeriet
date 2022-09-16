import React, { useContext } from 'react'
import styles from "./BasketItem.module.css";
import { AppContext } from '../App';

function BasketItem({productData}) {

  const { productBasket, setProductbasket } = useContext(AppContext)
  const { courseBasket, setCourseBasket } = useContext(AppContext)

  //hur styra vilket state jag ska jobba i när jag har samma komponent för bägge?
  //köra en find på bägge statesen och se vart id finns?
  function findItem(productData){
    console.log("find")
  }

  function decrementAmount(productData){
    findItem()
    //samma som i addToBasket ????
    console.log("dec")
  }

  function incrementAmount(productData){
    //samma som i addToBasket ????
    console.log("inc")
  }

  function deleteItem(productData){
    //.filter på alla som inte är productData.id
    //uppdatera state med den här listan
    
    console.log("delete")
  }

  return (
    <article className={styles.wrapper}>

      <div className={styles.imgWrapper}>
        <img src="" alt="" className={styles.basketImage} />
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.heading}>{productData.name}</p>
        <div className={styles.changeAmountWrapper}>
          <p className={styles.changeAmount} onClick={() => decrementAmount(productData)}> - </p>
          <p>{productData.amount}</p>
          <p className={styles.changeAmount} onClick={() => incrementAmount(productData)}> + </p>
        </div>
      </div>

      <div className={styles.priceDeleteWrapper}>
        <p className={styles.price}>000:-</p>
        {/* ska bytas ut mot papperskorg */}
        <button className={styles.deleteBtn} onClick={() => deleteItem(productData)}> D </button>
      </div>

    </article>
  )
}

export default BasketItem