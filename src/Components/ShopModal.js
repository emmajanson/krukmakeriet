import styles from "./ShopModal.module.css";
import React, { useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AllContext } from "../context/AllContext";

function ShopModal(){
    const {setShopProductModalOpen} = useContext(AllContext);

    const closeModal = () => {
        setShopProductModalOpen(false);
    }

return(
    <>
        <section className={styles.iconXContainer}>
            <section className={styles.iconXWrapper} onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
           </section>
        </section>

        <section className={styles.productInfoContainer}>
            <figure>
                <img src="./images/products/skalEmma.jpg" width="200px" alt="Produktbild"></img>
            </figure>
            <article className={styles.productDetailsContainer}>
                <h2>Titel</h2>
                <h3>Detaljer</h3>
                <h3>Pris</h3>
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
            <button className={styles.button}>Köp</button>
        </section>
    </>
)

}

export default ShopModal;