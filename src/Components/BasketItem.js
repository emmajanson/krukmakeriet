import React, { useContext } from 'react'
import styles from "./BasketItem.module.css";
import { AppContext } from '../App';

function BasketItem({productData}) {

  const { productBasket, setProductBasket } = useContext(AppContext)
  const { courseBasket, setCourseBasket } = useContext(AppContext)

  //hur styra vilket state jag ska jobba i när jag har samma komponent för bägge?
  //köra en find på bägge statesen och se vart id finns?
  
  function decrementAmount(productData){

    //Går ej köra båda i samma function för då får man felmeddelande. Hade varit bra om vi lägger in nåt i Firebase där vi sätter ett värde på produkten/kursen att den tillhör kurs/produktkategorin.

    const courseExist = courseBasket.find(item => item.id === productData.id);
    const productExist = productBasket.find(item => item.id === productData.id);


    

    productExist.amount > 0 ? setProductBasket(
      productBasket.map(item =>
        item.id === productData.id ? {...productExist, amount: productExist.amount + -1} : item
      )
    ) : console.log("Nothing to remove")

        
      courseExist.amount > 0  ? setCourseBasket(
      courseBasket.map(item =>
        item.id === productData.id ? {...courseExist, amount: courseExist.amount + -1} : item
      )
    ) : console.log("Nothing to remove")



   /* courseExist.amount > 0  ? setCourseBasket(
      courseBasket.map(item =>
        item.id === productData.id ? {...courseExist, amount: courseExist.amount + -1} : item
      )
    ) : console.log("Nothing to remove")


    productExist.amount > 0  ? setProductBasket(
      productBasket.map(item =>
        item.id === productData.id ? {...productExist, amount: productExist.amount + -1} : item
      )
    ) : console.log("Nothing to remove")

        */



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
        <p className={styles.price}>000:-</p>
        {/* ska bytas ut mot papperskorg */}
        <button className={styles.deleteBtn} onClick={() => deleteItem(productData)}> D </button>
      </div>

    </article>
  )
}

export default BasketItem