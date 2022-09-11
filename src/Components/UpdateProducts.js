import React from "react";
import styles from "./UpdateProducts.module.css";

function UpdateProducts() {
  return (
    <div className={styles.form}>
      <h4>Lägg till produkt</h4>
      <p>Produktens namn:</p>
      <input type="text" />
      <p>Produktens bild:</p>
      <input type="file" accept="image/png, image/jpeg"/>
      <p>Produktens pris:</p>
      <input type="number" />
      <p>Antal:</p>
      <input type="number" />
      <p>Produkbeskrivning:</p>
      <input type="text" />
      <button className={styles.button}>Spara</button>
      <a href="#">Ta bort</a>
    </div>
  );
}

export default UpdateProducts;
