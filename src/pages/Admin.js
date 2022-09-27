import React, { useState } from "react";
import styles from "./Admin.module.css";
import ListOfExsitingCourses from "../Components/ListOfExsitingCourses";
import ListOfExsitingProducts from "../Components/ListOfExsitingProducts";

function Admin() {
  const permission = localStorage.getItem("admin");
  const [rerender, setRerender] = useState(false);

  return permission === "true" ? (
    <main className={styles.wrapper}>
      <h3 className={styles.heading}>Administration</h3>
      <ListOfExsitingCourses rerender={setRerender} />
      <ListOfExsitingProducts rerender={setRerender} />
    </main>
  ) : (
    <h1 style={{ paddingTop: "10rem" }}>Access denied!</h1>
  );
}

export default Admin;
