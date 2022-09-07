import React from "react";
import CourseItem from "../Components/CourseItem";
import styles from "./Courses.module.css";

// Det här ska finnas
// - fetcha kurserna från db
// - sortera efter datum
// - funktion för att mappa ut alla kurser som finns
// - funktion för att boka in sig på kurs

//nedan: endast testobjekt
const testCourse = {
  date: "xx/xx/xx xx:xx",
  duration: "xx:xx",
  info: "Info om kursen",
  name: "Kursnamn",
  price: 500,
  spots: 10,
  imgUrl: "",
};

function Courses() {
  return (
    <main className={styles.wrapper}>
      <h2 className={styles.heading}>[kurser]</h2>
      <section className={styles.courseWrapper}>
        {/* CourseItems ska sedan användas i .map från array  */}
        <CourseItem props={testCourse} />
        <CourseItem props={testCourse} />
        <CourseItem props={testCourse} />
        <CourseItem props={testCourse} />
      </section>
    </main>
  );
}

export default Courses;
