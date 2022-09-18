import React from 'react'
import styles from "./Admin.module.css"
import ListOfExsitingCourses from "../Components/ListOfExsitingCourses"
import ListOfExsitingProducts from "../Components/ListOfExsitingProducts"

// Det här ska finnas
// - formulär för att uppdatera kurser - skickas till db
// - formulär för att uppdatera produkter - skickas till db
// - formulär för att ändra text på startsidan
// - formulär för att ändra infotext
// - se bokningar på kurser???????????


function Admin() {
  return (
    <main className={styles.wrapper}>
      <ListOfExsitingCourses />
      <ListOfExsitingProducts />
    </main>
  )
}

export default Admin