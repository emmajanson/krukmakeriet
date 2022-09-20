import React, { useContext } from 'react'
import styles from "./BasketItem.module.css";
import { AppContext } from '../App';

function BasketItem({productData}) {

  let { productBasket, setProductBasket } = useContext(AppContext)
  let { courseBasket, setCourseBasket } = useContext(AppContext)

  if (courseBasket === null) {courseBasket = []}
  if (productBasket === null) {productBasket = []}


  
  const isProduct = courseBasket.some(product => {
    if (product.id === productData.id) {
      return true;
    }
    return false;
  });


  function decrementAmount(productData){

    



    const courseExist = courseBasket.find(item => item.id === productData.id);
    const productExist = productBasket.find(item => item.id === productData.id);
    
    if (isProduct)  {

    courseExist.amount > 0  ? setCourseBasket(
      courseBasket.map(item =>
        item.id === productData.id ? {...courseExist, amount: courseExist.amount + -1} : item
      )
    ) : console.log("Nothing to remove")


    } else {

      productExist.amount > 0 ? setProductBasket(
        productBasket.map(item =>
          item.id === productData.id ? {...productExist, amount: productExist.amount + -1} : item
        )
      ) : console.log("Nothing to remove")

     

    }

  }

  function incrementAmount(productData){

   

    const productExist = productBasket.find(item => item.id === productData.id);
    setProductBasket(
      productBasket.map(item => 
        item.id === productData.id ? {...productExist, amount: productExist.amount + 1} : item
      )
    );

    const courseExist = courseBasket.find(item => item.id === productData.id);
    setCourseBasket(
      courseBasket.map(item => 
        item.id === productData.id ? {...courseExist, amount: courseExist.amount + 1} : item
      )
    );
  }

  function deleteItem(productData){


    //.filter på alla som inte är productData.id
    //uppdatera state med den här listan

    setCourseBasket(courseBasket.filter((item) => item.id !== productData.id))
    setProductBasket(productBasket.filter((item) => item.id !== productData.id))
    
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
        <p className={styles.price}>{productData.price}:-</p>
        {/* ska bytas ut mot papperskorg */}
        <button className={styles.deleteBtn} onClick={() => deleteItem(productData)}> D </button>
      </div>

    </article>
  )
}

export default BasketItem