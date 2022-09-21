import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingProducts.module.css";
import { FaCaretDown } from "react-icons/fa";
import UpdateProducts from "./UpdateProducts";

function ListOfExsitingProducts() {
  const productsCollectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState();
  const [updateOnly, setUpdateOnly] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [addUpdateFunction, setAddUpdateFunction] = useState(false);
  const [addNewProductFunction, setAddNewProductFunction] = useState(false);
  const [showBro, setShowBro] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    details: "",
    price: "",
    quantity: "",
    url: "",
    img: "",
  });

  const toggleUpdate = (
    id,
    name,
    category,
    details,
    price,
    quantity,
    url,
    img
  ) => {
    setProductData({});
    setAddUpdateFunction(true);
    setProductData({
      ...productData,
      name,
      category,
      details,
      price,
      quantity,
      url,
      img,
    });
    setProductID(id);
    setOpenModal(true);
  };

  useEffect(() => {
    console.log(addNewProductFunction);
  }, [addNewProductFunction]);

  const toggleNewProduct = () => {
    setAddUpdateFunction(() => false);
    setAddNewProductFunction(true);
    setProductData({});
    console.log("clicky");
    setOpenModal(() => true);
  };

  async function getProducts() {
    const data = await getDocs(productsCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Butik</h3>
      <div className={styles.products}>
        <button className={styles.button} onClick={() => toggleNewProduct()}>
          Lägg till en ny produkt
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
                  product.category,
                  product.details,
                  product.price,
                  product.quantity,
                  product.url,
                  product.img
                )
              }
            >
              <p>{product.name}</p>
              <FaCaretDown className={styles.FaCaretDown} />
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
          category={productData.category}
          details={productData.details}
          price={productData.price}
          quantity={productData.quantity}
          open={openModal}
          onClose={setOpenModal}
          setProductData={setProductData}
          products={products}
          url={productData.url}
          img={productData.img}
          getProducts={getProducts}
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
          />
        )}
      </div>
    </div>
  );
}

export default ListOfExsitingProducts;
