import React, { useContext } from 'react'
import BasketItem from './BasketItem'
import styles from './Basket.module.css'
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App';

function Basket({toggleBasket}, isActiveBasket) {

  const navigate = useNavigate();

  let { productBasket } = useContext(AppContext)
  let { courseBasket } = useContext(AppContext)

  if (courseBasket === null) {courseBasket = []}
  if (productBasket === null) {productBasket = []}
  

  const totalSum = (basket) => {
    let sum = 0;
    basket.forEach(item => {
      sum += item.price * item.amount
    })
    return sum;
  }

  const totalSumProduct = totalSum(productBasket)
  const totalSumCourse = totalSum(courseBasket)
  const totalSumBasket = totalSumProduct + totalSumCourse

  return (
    <section className={styles.wrapper}>

      <section className={styles.headingWrapper}>
        <h2 className={styles.heading}>Varukorg</h2>
        <button className={styles.closingBtn} onClick={() => toggleBasket(!isActiveBasket)}><FaTimes/></button>
      </section>

      { productBasket  && 
        <section className={styles.basketItemWrapper}>
          <h4 className={styles.subHeading}>Produkter</h4>
            {productBasket 
              .map((product) => (<BasketItem key={product.index} productData={product} />))} 
        </section>  
      }
     
      { courseBasket  && 
        <section className={styles.basketItemWrapper}>
          <h4 className={styles.subHeading}>Kurser</h4>
            {courseBasket 
              .map((product) => (<BasketItem key={product.index} productData={product} />))} 
        </section>  
      }

      <section className={styles.checkoutWrapper}>
        <div className={styles.totalAmountWrapper}>
          <p className={styles.totalAmountText}>Totalsumma</p>
          <p className={styles.totalAmountPrice}>{totalSumBasket}:-</p>
        </div>
        <button className={styles.checkoutBtn} onClick={() => {navigate("/checkout");toggleBasket(!isActiveBasket);}}>Checka ut</button>
      </section>

    </section>
  )
}

export default Basket