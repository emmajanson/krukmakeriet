import React from 'react'
import styles from "./Checkout.module.css";
import CheckoutItem from './CheckoutItem';

function Checkout() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.basketWrapper}>
        <h2>Varukorg</h2>
        <section className={styles.productsWrapper}>
          <h3>Produkter</h3>
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
        </section>
        <section className={styles.coursesWrapper}>
          <h3>Kurser</h3>
          <CheckoutItem />
          <CheckoutItem />
          <CheckoutItem />
        </section>
      </section>



      <section className={styles.userInfoWrapper}>
        <h2>Leveransuppgifter</h2>
        <div className={styles.userFirstInputsWrapper}>
          <label name="firstName">Förnamn</label>
          <input 
              className={styles.inputLarge}  
              type="text" 
              name="firstName" 
              placeholder="Förnamn"></input>

          <label name="lastName">Efternamn</label>
          <input 
              className={styles.inputLarge} 
              type="text" 
              name="lastName"  
              placeholder="Efternamn"></input>

          <label name="email">E-post</label>
          <input 
              className={styles.inputLarge}
              type="text" 
              name="email"  
              placeholder="E-post"></input>

          <label name="phoneNumber">Telefonnummer</label>
          <input 
              className={styles.inputLarge} 
              type="text" 
              name="phoneNumber"  
              placeholder="Telefonnummer"></input>

          <label name="address">Adress</label>
          <input 
              className={styles.inputLarge} 
              type="text" 
              name="address"  
              placeholder="Adress"></input>
        </div>

        <div className={styles.userSecondInputsWrapper}>
          <div className={styles.inputSmall} >
            <label name="zipCode">Postnummer</label>
            <input 
                type="text" 
                name="zipcode"  
                placeholder="Postnummer"></input>
          </div>
          <div className={styles.inputMedium}>
            <label name="city">Stad</label>
            <input 
              type="text" 
              name="city"  
              placeholder="Stad"></input>
            </div>
        </div>
      </section>


      <section className={styles.paymentWrapper}>
        <h2>Betalningsalternativ</h2>
        <div className={styles.payFirstInputsWrapper}>
          <label name="cardName">Kortinnehavarens namn</label>
          <input 
                className={styles.inputLarge} 
                type="text" 
                name="cardName"  
                placeholder="Kortinnehavarens namn"></input>

          <label name="cardNumber">Kortnummer</label>
          <input 
                className={styles.inputLarge} 
                type="text" 
                name="cardNumber"  
                placeholder="Kortnummer"></input>
        </div>

        <div className={styles.paySecondInputsWrapper}>
          <div className={styles.inputSmall}>
            <label name="expDate">Datum</label>
            <input
                type="text" 
                name="expDate"  
                placeholder="Datum"></input>
          </div>
          <div className={styles.inputSmall}>      
            <label name="cvc">CVC</label>
            <input 
                type="text" 
                name="cvc"  
                placeholder="Cvc"></input>
          </div>
        </div>
      </section>



      <section className={styles.btnWrapper}>
        <button className={styles.checkoutBtn}>Fortsätt handla</button>
        <button className={styles.checkoutBtn}>Bekräfta köp</button>
      </section>

    </main>
  )
}

export default Checkout