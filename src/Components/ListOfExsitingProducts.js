import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingProducts.module.css";
import { FaCaretDown } from "react-icons/fa";
import UpdateProducts from "./UpdateProducts";

function ListOfExsitingProducts(rerender) {
  const productsCollectionRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [addUpdateFunction, setAddUpdateFunction] = useState(false);
  const [addNewProductFunction, setAddNewProductFunction] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    details: "",
    price: "",
    quantity: "",
    img: "",
  });

  const toggleUpdate = (id, name, category, details, price, quantity, img) => {
    setAddUpdateFunction(true);
    setProductData({
      ...productData,
      name,
      category,
      details,
      price,
      quantity,
      img,
    });
    setProductID(id);
    setOpenModal(() => true);
    setShowMessage(false)
  };

  const toggleNewProduct = () => {
    setProductData("");
    setAddUpdateFunction(false);
    setAddNewProductFunction(true);
    console.log("clicky");
    setOpenModal(() => true);
    setShowMessage(false)
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
                  product.img
                )
              }
            >
              <img src={product.img} className={styles.productImage} />
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
          img={productData.img}
          getProducts={getProducts}
          setAddUpdateFunction={setAddUpdateFunction}
          rerender={rerender}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
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
            rerender={rerender}
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
