import React from 'react'
import styles from "./UserCourses.module.css";

function UserCourses() {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>Kursnamn</td>
      <td className={styles.tableDataDate}>00/00/0000 00:00</td>
      <td className={styles.tableDataPrice}>450 kr</td>
    </tr>
  )
}

export default UserCourses