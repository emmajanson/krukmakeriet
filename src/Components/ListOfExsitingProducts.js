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
  const [addUpdateFunction, setAddUpdateFunction] = useState(false);
  const [addNewProductFunction, setAddNewProductFunction] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    details: "",
    price: "",
    quantity: "",
  });

  const toggleUpdate = (id, name, category, details, price, quantity,) => {
    console.log("hääääär",id, name, category)
    setProductData({});
    setAddUpdateFunction((current) => !current);
    setProductData({ ...productData, name, category, details, price, quantity });
    setProductID(id);
    setUpdateOnly(true);
  };

  const toggleNewProduct = () => {
    setAddNewProductFunction((current) => !current);
    //setUpdateOnly(false)
    //setShowUpdate((current) => !current)
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Butik</h3>
      <div className={styles.products}>
        <button className={styles.button} onClick={() => toggleNewProduct()}>Lägg till en ny produkt</button>
        {products.map((product, index) => {
          return (
            <div key={index} className={styles.details} onClick={() =>
              toggleUpdate(
                product.id,
                product.name,
                product.category,
                product.details,
                product.price,
                product.quantity,
              )
            }>
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
          updateOnly={updateOnly}
          name={productData.name}
          category={productData.category}
          details={productData.details}
          price={productData.price}
          quantity={productData.quantity}
          
        />
      )}
      <div className={styles.modal}>
      {addNewProductFunction && <UpdateProducts />}
      </div>
    </div>
  );
}

export default ListOfExsitingProducts;
