//import React, { useContext } from "react";
import styles from "./Admin.module.css";
import ListOfExsitingCourses from "../Components/ListOfExsitingCourses";
import ListOfExsitingProducts from "../Components/ListOfExsitingProducts";
//import { AppContext } from "../App";

// Det här ska finnas
// - formulär för att uppdatera kurser - skickas till db
// - formulär för att uppdatera produkter - skickas till db
// - formulär för att ändra text på startsidan
// - formulär för att ändra infotext
// - se bokningar på kurser???????????

function Admin() {
  //const myContext = useContext(AppContext);
  const permission = localStorage.getItem("admin");

  console.log(permission);

  return permission === "true" ? (
    <main className={styles.wrapper}>
      <ListOfExsitingCourses />
      <ListOfExsitingProducts />
    </main>
  ) : (
    <h1 style={{ paddingTop: "10rem" }}>Get the fuck out!</h1>
  );
}

export default Admin;
