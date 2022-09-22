import React, { useState } from "react";
import styles from "./Admin.module.css";
import ListOfExsitingCourses from "../Components/ListOfExsitingCourses";
import ListOfExsitingProducts from "../Components/ListOfExsitingProducts";

// Det här ska finnas
// - formulär för att uppdatera kurser - skickas till db
// - formulär för att uppdatera produkter - skickas till db
// - formulär för att ändra text på startsidan
// - formulär för att ändra infotext
// - se bokningar på kurser???????????

function Admin() {
  const permission = localStorage.getItem("admin");
  const [rerender, setRerender] = useState(false);

  return permission === "true" ? (
    <main className={styles.wrapper}>
      <ListOfExsitingCourses rerender={setRerender} />
      <ListOfExsitingProducts rerender={setRerender} />
    </main>
  ) : (
    <h1 style={{ paddingTop: "10rem" }}>Get the fuck out!</h1>
  );
}

export default Admin;
