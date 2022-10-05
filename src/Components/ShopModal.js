import styles from "./ShopModal.module.css";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AllContext } from "../context/AllContext";

function ShopModal() {
  const {
    setShopProductModalOpen,
    selectedProduct,
    productBasket,
    setProductBasket,
    setAddedToBasketPopupOpen,
  } = useContext(AllContext);

  const closeModal = () => {
    setShopProductModalOpen(false);
  };

  function trigger() {
    setAddedToBasketPopupOpen(false);
    setShopProductModalOpen(false);
  }

  function removeModal() {
    setTimeout(trigger, 2000);
  }

  function addToBasket() {
    if (productBasket === null) {
      setProductBasket([{ ...selectedProduct, amount: 1 }]);
    } else {
      const exist = productBasket.find(
        (item) => item.id === selectedProduct.id
      );
      if (exist) {
        setProductBasket(
          productBasket.map((item) =>
            item.id === selectedProduct.id
              ? { ...exist, amount: exist.amount + 1 }
              : item
          )
        );
      } else {
        setProductBasket([...productBasket, { ...selectedProduct, amount: 1 }]);
      }
    }

    console.log("Added to basket " + selectedProduct.name);
  }

  //const timeout = setTimeout(trigger, 2000);

  return (
        <article id="shopModal">
      <section className={styles.iconXContainer}>
                <section id="closeButton" className={styles.iconXWrapper} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </section>
      </section>

      <section className={styles.productInfoWrapper}>
        <figure className={styles.productImageContainer}>
          <img
            src={selectedProduct && selectedProduct.img}
            width="100%"
            alt="Produktbild"
          ></img>
        </figure>
        <article className={styles.productDetailsContainer}>
          <h2>{selectedProduct && selectedProduct.name}</h2>
          <h3>{selectedProduct && selectedProduct.details}</h3>
          <h3>{selectedProduct && selectedProduct.price}:-</h3>
        </article>
      </section>

      <section className={styles.productDescriptionContainer}>
        <h4>{selectedProduct && selectedProduct.desc}</h4>
      </section>

      <section className={styles.buyButtonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            addToBasket();
            setAddedToBasketPopupOpen(true);
            removeModal();
          }}
        >
          Köp
        </button>
      </section>
    </article>
  );
}

export default ShopModal;
