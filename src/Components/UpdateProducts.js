import React from "react";
import styles from "./UpdateProducts.module.css";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaTimes } from "react-icons/fa";

function UpdateProducts({
  id,
  name,
  category,
  details,
  price,
  quantity,
  img,
  updateOnly,
  setProducts,
  open,
  onClose,
}) {
  const productsCollectionRef = collection(db, "products");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      name: productName,
      category: productCategory,
      details: productDetails,
      price: Number(productPrice),
      quantity: Number(productQuantity),
    });
  };


  useEffect(() => {
    setProductName(name);
    setProductPrice(price);
    setProductCategory(category);
    setProductDetails(details);
    setProductQuantity(quantity);
  }, [name, price, category, details, quantity]);

  if (!open) return null;
  
  const updateProduct = async () => {
    const productDoc = doc(db, "products", id);
    const newUpdatedProduct = {
      name: productName,
      category: productCategory,
      details: productDetails,
      price: productPrice,
      quantity: productQuantity,
    };
    await updateDoc(productDoc, newUpdatedProduct);
    console.log("UpdateProduct function");
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  };

  return (
    <div
      className={styles.wrapper}
    >
      <div className={styles.form}>
        <FaTimes className={styles.icon} onClick={onClose} />
        <h4>Lägg till produkt</h4>
        <p>Produktens namn:</p>
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <p>Kategori:</p>
        <input
          type="text"
          value={productCategory}
          onChange={(e) => {
            setProductCategory(e.target.value);
          }}
        />
        <p>Produktens bild:</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setProductImage(e.target.value);
          }}
        />
        <p>Produktens pris:</p>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <p>Antal:</p>
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => {
            setProductQuantity(e.target.value);
          }}
        />
        <p>Produkbeskrivning:</p>
        <input
          type="text"
          value={productDetails}
          onChange={(e) => {
            setProductDetails(e.target.value);
          }}
        />
        <button
          className={styles.button}
          onClick={() => (updateOnly ? updateProduct() : createProduct())}
        >
          Spara
        </button>
        <a
          href="#"
          onClick={() => {
            deleteProduct(id);
          }}
        >
          Ta bort
        </a>
      </div>
    </div>
  );
}

export default UpdateProducts;
