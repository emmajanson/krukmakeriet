import React, { useState } from "react";
import styles from "./ShopItem.module.css";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";
import Popup from "./Popup.js";
import { 
  FaShoppingBag
} from 'react-icons/fa';


function ShopItem({ productData }) {
  const { productBasket, setProductBasket } = useContext(AllContext);
  const [showPopup, setShowPopup] = useState(false);
  
  function addToBasket(product) {
    if (productBasket === null) {
      setProductBasket([{ ...product, amount: 1 }]);
    } else {
      const exist = productBasket.find((item) => item.id === productData.id);
      if (exist) {
        setProductBasket(
          productBasket.map((item) =>
            item.id === product.id
              ? { ...exist, amount: exist.amount + 1 }
              : item
          )
        );
      } else {
        setProductBasket([...productBasket, { ...product, amount: 1 }]);
      }
    }

    console.log("Added to basket " + productData.name);
  }

//  en onClick ska in på shopItemWrapper för att öppna produkt modalen
  return (
    <article className={styles.shopItemWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.shopItemImage} src={productData.img} alt="" />
      </div>

      <div className={styles.textWrapper}>
        <h3 className={styles.name}>{productData.name}</h3>

        <div className={styles.priceBtnWrapper}>
          <h4 className={styles.price}>{productData.price}:-</h4>
          <button
            className={styles.button}
            onClick={() => {
              addToBasket(productData);
              setShowPopup(true);
            }}
          >
            <FaShoppingBag className={styles.icon}/>
          </button>
        </div>

      </div>

      <Popup trigger={showPopup} setTrigger={setShowPopup}>
        <h1>Succé!</h1>
        <p>Din vara är nu lagd i varukorgen.</p>
      </Popup>

    </article>
  );
}

export default ShopItem;
