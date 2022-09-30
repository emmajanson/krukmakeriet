import React from 'react'
import styles from "./UserOrders.module.css";

function UserOrders() {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>00/00/0000</td>
      <td className={styles.tableDataOrder}>000000000000</td>
      <td className={styles.tableDataPrice}>450 kr</td>
    </tr>
  )
}

export default UserOrders