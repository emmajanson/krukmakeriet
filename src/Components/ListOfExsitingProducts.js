import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingProducts.module.css";
import { FaCaretDown } from "react-icons/fa";
import UpdateProducts from "./UpdateProducts";

function ListOfExsitingProducts() {
  const usersCollectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(usersCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Butik</h3>
      <div className={styles.products}>
        <button className={styles.button}>Lägg till en ny produkt</button>
        {products.map((product, index) => {
          return (
            <div key={index} className={styles.details}>
              <p>{product.name}</p>
              <FaCaretDown className={styles.FaCaretDown} />
            </div>
          );
        })}
      </div>
      <UpdateProducts />
    </div>
  );
}

export default ListOfExsitingProducts;
