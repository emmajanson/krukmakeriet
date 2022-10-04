import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingProducts.module.css";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import UpdateProducts from "./UpdateProducts";
import PopupTemplate from "./PopUpTemplate"

function ListOfExsitingProducts() {
  const productsCollectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [addUpdateFunction, setAddUpdateFunction] = useState(false);
  const [addNewProductFunction, setAddNewProductFunction] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [showMessage, setShowMessage] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    details: "",
    price: "",
    quantity: "",
    img: "",
    desc:""
  });
//if the props are available set them to the product state and fill the input fields 
  const toggleUpdate = (id, name, details, price, quantity, img, desc) => {
    setAddUpdateFunction(true);
    setProductData({
      ...productData,
      name,
      details,
      price,
      quantity,
      img,
      desc
    });
    setProductID(id);
    setOpenModal(() => true);
    setShowMessage(false);
  };
//display an empty modal for the new product
  const toggleNewProduct = () => {
    setProductData("");
    setAddUpdateFunction(false);
    setAddNewProductFunction(true);
    setOpenModal(() => true);
    setShowMessage(false);
  };
//get the products from the db
  async function getProducts() {
    const data = await getDocs(productsCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
//when refreshed render the products
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <PopupTemplate trigger={showPopup} setTrigger={setShowPopup}>
        <p>Din produkt är nu uppdaterad!</p>
      </PopupTemplate>
      <div className={styles.productsWrapper}>
      <h3 className={styles.title}>Butik</h3>
      <p className={styles.text}>Lägg till ny produkt eller välj befintlig för att uppdatera</p>
        <button className={styles.button} onClick={() => toggleNewProduct()}>
          <p className={styles.btnText}>Lägg till ny kurs</p>
          <div className={styles.iconWrapper}>
            <FaPlus className={styles.plusIcon}/>
          </div>
        </button>
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className={styles.details}
              onClick={() =>
                toggleUpdate(
                  product.id,
                  product.name,
                  product.details,
                  product.price,
                  product.quantity,
                  product.img,
                  product.desc
                )
              }
            >
              <div className={styles.imgWrapper}>
                <img src={product.img} className={styles.productImage} />
              </div>
              <div className={styles.nameWrapper}>
                <p className={styles.name}>{product.name}</p>
              </div>
              <FaChevronRight className={styles.FaCaretRight} />
            </div>
          );
        })}
      </div>
      {addUpdateFunction && (
        <UpdateProducts
          setProducts={setProducts}
          id={productID}
          updateOnly={addUpdateFunction}
          name={productData.name}
          details={productData.details}
          price={productData.price}
          quantity={productData.quantity}
          desc={productData.desc}
          open={openModal}
          onClose={setOpenModal}
          setProductData={setProductData}
          products={products}
          img={productData.img}
          getProducts={getProducts}
          setAddUpdateFunction={setAddUpdateFunction}
          setShowPopup={setShowPopup}

        />
      )}
      <div className={styles.modal}>
        {addNewProductFunction && (
          <UpdateProducts
            open={openModal}
            onClose={setOpenModal}
            closeNewModal={setOpenModal}
            setProductData={setProductData}
            setAddNewProductFunction={setAddNewProductFunction}
            getProducts={getProducts}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            setAddUpdateFunction={setAddUpdateFunction}
          />
        )}
      </div>
    </div>
  );
}

export default ListOfExsitingProducts;
