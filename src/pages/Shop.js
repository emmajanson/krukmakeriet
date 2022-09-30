import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import Modal from "react-modal";
import ShopItem from '../Components/ShopItem';
import ShopModal from "../Components/ShopModal";
import styles from "./Shop.module.css";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { AllContext } from '../context/AllContext';


function Shop() {

 /*Render from db */
 const [products, setProducts] = useState([])

 const {shopProductModalOpen, setShopProductModalOpen} = useContext(AllContext);

 useEffect(() => {
   const productsCollectionRef = collection(db, "products");

   const getProducts = async () => {
     const data = await getDocs(productsCollectionRef);
     setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     };
   getProducts();

 }, []);


  return (
    <main className={styles.wrapper}>
       <Modal
        isOpen = {shopProductModalOpen}
        onRequestClose = {() => setShopProductModalOpen(false)}
        className = {styles.shopProductModal}
        overlayClassName = {styles.shopProductModalOverlay}
      >
        <ShopModal />
      </Modal> 
      
      
      {/* <ShopModal /> */}
      <section className={styles.bannerWrapper}>
        <img className={styles.bannerImage}src="../images/shopBanner.jpg" alt="" />
        <div className={styles.bannerBg}>
          <h3 className={styles.bannerText}>Skapa en stilfull höst</h3>
        </div>
      </section>
      
      <section className={styles.shopWrapper}>
        {products
          .map((product) => (<ShopItem key={product.id} productData={product} />))
        }
      </section>
    </main>
  )
}

export default Shop
