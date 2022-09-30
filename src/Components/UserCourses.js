import React from "react";
import styles from "./UserCourses.module.css";

function UserCourses({ purchase }) {
  const courseValue = Object.values(purchase)[0];
  const name = courseValue[0].bookedCourses.courses[0].name;
  const date = courseValue[0].bookedCourses.courses[0].date.replace("T", " ");
  const price = courseValue[0].bookedCourses.courses[0].price;

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>{name}</td>
      <td className={styles.tableDataDate}>{date}</td>
      <td className={styles.tableDataPrice}>{price} kr</td>
    </tr>
  );
}

export default UserCourses;
