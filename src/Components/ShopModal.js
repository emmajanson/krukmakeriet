import styles from "./ShopModal.module.css";
import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AllContext } from "../context/AllContext";
import Popup from "./Popup.js";

function ShopModal(){
    const {setShopProductModalOpen, selectedProduct, productBasket, setProductBasket} = useContext(AllContext);
    const [showPopup, setShowPopup] = useState(false);

    const closeModal = () => {
        setShopProductModalOpen(false);
    }

    function addToBasket() {
        if (productBasket === null) {
            setProductBasket([{ ...selectedProduct, amount: 1 }]);
        } else {
            const exist = productBasket.find((item) => item.id === selectedProduct.id);
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

    const timeout = setTimeout(trigger, 2000);

    function trigger() {
        setShowPopup(false);
    }

    function removeModal() {
        clearTimeout(timeout);
    }

    return(
        <>
            <section className={styles.iconXContainer}>
                <section className={styles.iconXWrapper} onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
            </section>
            </section>

            <section className={styles.productInfoWrapper}>
                <figure className={styles.productImageContainer}>
                    <img src={selectedProduct && selectedProduct.img} width="100%" alt="Produktbild"></img>
                </figure>
                <article className={styles.productDetailsContainer}>
                    <h2>{selectedProduct && selectedProduct.name}</h2>
                    <h3>{selectedProduct && selectedProduct.details}</h3>
                    <h3>{selectedProduct && selectedProduct.price}:-</h3>
                </article>         
            </section>

            <section className={styles.productDescriptionContainer}>
                <h4>
                    lorem ipsumlorem ipsumlorem ipsum
                    lorem ipsumlorem ipsumlorem ipsum
                    lorem ipsumlorem ipsumlorem ipsum
                </h4>
            </section>

            <section className={styles.buyButtonContainer}>
                <button 
                className={styles.button}
                onClick={() => {
                    addToBasket();
                    setShowPopup(true);
                    removeModal();
                }}
                >
                    Köp
                </button>
            </section>
            <Popup trigger={showPopup} setTrigger={setShowPopup}>
                    <p>Din vara är nu lagd i varukorgen.</p>
                </Popup>
        </>
    )

}

export default ShopModal;