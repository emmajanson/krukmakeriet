import React from "react";
import styles from "./UpdateProducts.module.css";
import { db, storage } from "../firebase-config";
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
import { v4 } from "uuid";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

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
  setProductData,
  products,
  closeNewModal,
  setAddNewProductFunction,
  url,
  getProducts,
}) {
  const productsCollectionRef = collection(db, "products");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productURL, setProductURL] = useState([]);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageURL, setImageURL] = useState([]);
  const imageListRef = ref(storage, "images/");

  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      name: productName,
      category: productCategory,
      details: productDetails,
      price: Number(productPrice),
      quantity: Number(productQuantity),
      url: productURL,
      img: productImage,
    });
    onClose(false);
    getProducts();
  };

  useEffect(() => {
    const imageListRef = ref(storage, "images/");
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageURL((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    setProductName(name);
    setProductPrice(price);
    setProductCategory(category);
    setProductDetails(details);
    setProductQuantity(quantity);
  }, [name, price, category, details, quantity, img]);

  if (!open) return null;

  function closeModal() {
    if (updateOnly) {
      onClose();
    } else {
      setProductData("");
      //closeNewModal(false);
      setAddNewProductFunction(false);
    }
  }
  console.log("typeof", typeof closeNewModal);

  const uploadImage = () => {
    if (uploadedImage == null) return;
    const imageRef = ref(storage, `images/${uploadedImage.name + v4()}`);
    uploadBytes(imageRef, uploadedImage)
      .then(() => {
        console.log("imageRef", imageRef);
      })
      .then(setProducts((prev) => [...prev, { img: imageRef }]));
  };
  //uploadImage()

  const updateProduct = async () => {
    const productDoc = doc(db, "products", id);
    const newUpdatedProduct = {
      name: productName,
      category: productCategory,
      details: productDetails,
      price: productPrice,
      quantity: productQuantity,
      url: productURL,
      img: productImage,
    };
    await updateDoc(productDoc, newUpdatedProduct);
    console.log("UpdateProduct function");
    onClose(false);
    getProducts();
  };

  function handleSubmit() {
    if (updateOnly) {
      updateProduct();
      uploadImage();
    } else {
      createProduct();
      uploadImage();
    }
  }
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    onClose(false);
    getProducts();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
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
        <button className={styles.button} onClick={handleSubmit}>
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
