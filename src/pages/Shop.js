import React from 'react'
import { useState, useEffect } from "react";
import ShopItem from '../Components/ShopItem';
import styles from "./Shop.module.css";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Shop() {

 /*Render from db */
 const [products, setProducts] = useState([])
  
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
      <h2>Butiken</h2>
      <section className={styles.shopWrapper}>
        {products
          .map((product) => (<ShopItem key={product.id} productData={product} />))
        }
      </section>
    </main>
  )
}

export default Shop
