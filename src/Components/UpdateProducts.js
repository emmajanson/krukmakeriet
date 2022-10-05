import React from "react";
import styles from "./UpdateProducts.module.css";
import { db, storage } from "../firebase-config";
import { useState, useEffect } from "react";
import {
  collection,
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
  details,
  price,
  quantity,
  updateOnly,
  open,
  onClose,
  setProductData,
  img,
  closeNewModal,
  setAddNewProductFunction,
  setAddUpdateFunction,
  getProducts,
  desc,
  setShowPopup,
}) {
  const productsCollectionRef = collection(db, "products");
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productLongerDesc, setProductLongerDesc] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageURL, setImageURL] = useState([]);

  //create a new product
  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      name: productName,
      details: productDetails,
      price: Number(productPrice),
      quantity: Number(productQuantity),
      img: productImage,
      desc: productLongerDesc,
    });
    getProducts();
    onClose(false);
    setAddNewProductFunction(false);
    setAddUpdateFunction(false);
  };
  //a ref to the images folder in firebase storage
  const imageListRef = ref(storage, "images/");

  //listing all the urls of the images in the storage and setting them to the imageurl state
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageURL((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  //everytime a change is made in the input fields the modal is updated with the latest changes
  useEffect(() => {
    setProductName(name);
    setProductPrice(price);
    setProductDetails(details);
    setProductQuantity(quantity);
    setProductLongerDesc(desc);
    setProductImage(img);
  }, [name, price, details, quantity, img, desc]);

  //if the modal is not opened dont do anything
  if (!open) return null;

  //closing the modal
  function closeModal() {
    if (updateOnly) {
      onClose();
      closeNewModal(false);
    } else {
      setProductData("");
      setAddNewProductFunction(false);
      closeNewModal(false);
    }
  }
  //uploading the images to storage in firebase
  const uploadImage = () => {
    if (uploadedImage == null) return;
    const imageRef = ref(storage, `images/${uploadedImage.name + v4()}`);
    uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProductImage((prev) => (prev, url));
      });
    });
  };
  //updating the product
  const updateProduct = async () => {
    const productDoc = doc(db, "products", id);
    const newUpdatedProduct = {
      name: productName,
      details: productDetails,
      price: productPrice,
      quantity: productQuantity,
      img: productImage,
      desc: productLongerDesc,
    };
    await updateDoc(productDoc, newUpdatedProduct);
    console.log("UpdateProduct function");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    onClose(false);
    getProducts();
  };
  //submit the form (both the new and update)
  function handleSubmit() {
    if (updateOnly) {
      updateProduct();
      setAddUpdateFunction(() => false);
    } else {
      createProduct();
      setAddUpdateFunction(() => true);
    }
  }
  //delete the product
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    await getProducts();
    onClose(false);
    closeNewModal(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <FaTimes className={styles.icon} onClick={() => closeModal()} />
          <h4>Produkt</h4>
          <p>Alla fält som är markerade med en * är obligatoriska</p>
          <div>
            <p>Namn: *</p>
            <input
              className={styles.product_name}
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <p>Produkbeskrivning: *</p>
            <input
              className={styles.product_desc}
              type="text"
              value={productDetails}
              onChange={(e) => {
                setProductDetails(e.target.value);
              }}
              required
            />
          </div>
          <div className={styles.price_quantity}>
            <div>
              <p>Pris: *</p>
              <input
                className={styles.product_price}
                type="number"
                value={productPrice}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <p>Lagerantal: *</p>
              <input
                className={styles.product_quantity}
                type="number"
                value={productQuantity}
                onChange={(e) => {
                  setProductQuantity(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div>
            <p>Längre beskrivning: *</p>
            <textarea
              type="textarea"
              className={styles.product_longer_desc}
              value={productLongerDesc}
              onChange={(e) => {
                setProductLongerDesc(e.target.value);
              }}
              required
            />
          </div>
          <p>Bild: *</p>
          <div className={styles.upload_div}>
            <img src={productImage} className={styles.uploadedImage} />
            <div className={styles.btns}>
              <input
                className={styles.upload_image}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setUploadedImage(e.target.files[0]);
                }}
              />
              <button
                type="button"
                onClick={uploadImage}
                className={styles.uploadBtn}
              >
                Ladda bild
              </button>
            </div>
          </div>
          <div className={styles.submiit}>
            {updateOnly ? (
              <button
                type="button"
                className={styles.showBtn}
                onClick={() => {
                  deleteProduct(id);
                }}
              >
                Ta bort
              </button>
            ) : (
              ""
            )}
            <button
              type="submit"
              className={styles.button}
              onClick={handleSubmit}
            >
              Spara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProducts;
