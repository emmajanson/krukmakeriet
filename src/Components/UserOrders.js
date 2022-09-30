import React from "react";
import styles from "./UserOrders.module.css";

function UserOrders({ purchase }) {
  const dateArray = Object.keys(purchase)[0].split(" ");
  const product = Object.values(purchase)[0][0].purchasedProducts.product[0];

  const date = dateArray[0];
  const orderNumber = product.orderNumber;
  const price = product.price * product.amount;
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>{date}</td>
      <td className={styles.tableDataOrder}>{orderNumber}</td>
      <td className={styles.tableDataPrice}>{price} kr</td>
    </tr>
  );
}

export default UserOrders;
