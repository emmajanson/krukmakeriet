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
  updateOnly,
  setProducts,
  open,
  onClose,
  setProductData,
  img,
  products,
  closeNewModal,
  setAddNewProductFunction,
  setAddUpdateFunction,
  url,
  getProducts,
  rerender,
  showMessage,
  setShowMessage,
}) {
  const productsCollectionRef = collection(db, "products");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageURL, setImageURL] = useState([]);

  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      name: productName,
      category: productCategory,
      details: productDetails,
      price: Number(productPrice),
      quantity: Number(productQuantity),
      img: productImage,
    });
    getProducts();
    onClose(false);
  };
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
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
    setProductImage(img);
  }, [name, price, category, details, quantity, img]);

  if (!open) return null;

  function closeModal() {
    if (updateOnly) {
      onClose();
      closeNewModal(false);
    } else {
      setProductData("");
      //closeNewModal(false);
      setAddNewProductFunction(false);
      closeNewModal(false);
    }
  }

  const uploadImage = () => {
    if (uploadedImage == null) return;
    const imageRef = ref(storage, `images/${uploadedImage.name + v4()}`);
    uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProductImage((prev) => (prev, url));
        setShowMessage(true);
      });
    });
  };

  const updateProduct = async () => {
    const productDoc = doc(db, "products", id);
    const newUpdatedProduct = {
      name: productName,
      category: productCategory,
      details: productDetails,
      price: productPrice,
      quantity: productQuantity,
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
      setAddUpdateFunction(()=>false)
    } else {
      createProduct();
      setAddUpdateFunction(()=>true)
    }
  }
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    await getProducts();
    onClose(false);
    closeNewModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
        <h4>Lägg till produkt</h4>
        <p>Alla fält som är markerade med en * är obligatoriska</p>
        <p>* Namn:</p>
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <p>* Kategori:</p>
        <input
          type="text"
          value={productCategory}
          onChange={(e) => {
            setProductCategory(e.target.value);
          }}
        />
        <p>* Bild:</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }}
        />
        {showMessage ? (
          <p className={styles.message}>Successfully uploaded</p>
        ) : (
          ""
        )}
        <button onClick={uploadImage} className={styles.uploadBtn}>
          Ladda upp bilden
        </button>
        <p>* Pris:</p>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <p>* Antal:</p>
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => {
            setProductQuantity(e.target.value);
          }}
        />
        <p>* Produkbeskrivning:</p>
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
        {updateOnly ? (
          <a
            className={styles.showBtn}
            href="#"
            onClick={() => {
              deleteProduct(id);
            }}
          >
            Ta bort
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UpdateProducts;
