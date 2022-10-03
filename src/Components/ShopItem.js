import React from "react";
import styles from "./ShopItem.module.css";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";
import { FaShoppingBag } from "react-icons/fa";

function ShopItem({ productData }) {
<<<<<<< HEAD
  const {
    productBasket,
    setProductBasket,
    setShopProductModalOpen,
    setSelectedProduct,
  } = useContext(AllContext);
  const [showPopup, setShowPopup] = useState(false);
=======
  const { 
    productBasket, 
    setProductBasket, 
    setShopProductModalOpen, 
    setSelectedProduct,
    setAddedToBasketPopupOpen
  } = useContext(AllContext);
>>>>>>> main

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

  //const timeout = setTimeout(trigger, 2000);

  function trigger() {
    setAddedToBasketPopupOpen(false);
  }

  function removeModal() {
    setTimeout(trigger, 2000);
  }

  const addToBasketButtonClicked = (event) => {
    addToBasket(productData);
    setAddedToBasketPopupOpen(true);
    removeModal();
    event.stopPropagation();
  }

  const shopItemClicked = () => {
    setShopProductModalOpen(true);
    setSelectedProduct(productData);
  }

  //  en onClick ska in på shopItemWrapper för att öppna produkt modalen
  return (
<<<<<<< HEAD
    <article
      title="productItem"
      className={styles.shopItemWrapper}
      onClick={() => {
        setShopProductModalOpen(true);
        setSelectedProduct(productData);
      }}
=======
    <article className={styles.shopItemWrapper} 
      onClick={shopItemClicked}
>>>>>>> main
    >
      <div className={styles.imgWrapper}>
        <img className={styles.shopItemImage} src={productData.img} alt="" />
      </div>

      <div className={styles.textWrapper}>
        <h3 className={styles.name}>{productData.name}</h3>

        <div className={styles.priceBtnWrapper}>
          <h4 className={styles.price}>{productData.price}:-</h4>
          <button
            className={styles.button}
            onClick={addToBasketButtonClicked}
          >
            <FaShoppingBag className={styles.icon} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ShopItem;
