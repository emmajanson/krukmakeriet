import React from "react";
import { useState, useEffect } from "react";
import CourseItem from "../Components/CourseItem";
import styles from "./Courses.module.css";
import Events from "../Components/Events";
import { db } from "../firebase-config";
import {
  collection,
  getDocs
} from "firebase/firestore";

// DET HÄR SKA FINNAS
// - funktion för att lägga kurs i varukorgen

//nedan: endast testobjekt
// const testCourses = [
//   {
//     id: 0,
//     img: "img.png",
//     name: "Kursnamn 1",
//     details: "xx/xx/xx xx:xx",
//     price: 100,
//     spots: 10,
//     info: "Info om kursen. Info om kursen. Info om kursen. Info om kursen. Info om kursen",
//     duration: "xx:xx",
//   },
//   {
//     id: 1,
//     img: "img.png",
//     name: "Kursnamn 2",
//     details: "xx/xx/xx xx:xx",
//     price: 300,
//     spots: 10,
//     info: "Info om kursen. Info om kursen. Info om kursen. Info om kursen. Info om kursen",
//     duration: "xx:xx",
//   },
//   {
//     id: 2,
//     img: "img.png",
//     name: "Kursnamn 3",
//     details: "xx/xx/xx xx:xx",
//     price: 600,
//     spots: 10,
//     info: "Info om kursen. Info om kursen. Info om kursen. Info om kursen. Info om kursen",
//     duration: "xx:xx",
//   }
// ];

function Courses() {

  const [courses, setCourses] = useState([])
  const coursesCollectionRef = collection(db, "courses");
  
  useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(coursesCollectionRef);
      setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
    getCourses();
  }, []);

  


  /* SKICKA TILL VARUKORG - onClick på kurskortens knapp
    - 
  


  
  */


  return (
    <main data-testid="courses" className={styles.wrapper}>
      <h2 className={styles.heading}>[kurser]</h2>
      <section className={styles.courseWrapper}>
        {/* //map over the testcourses array and display it in the CourseItem component */}
        {courses
        .sort((course, nextCourse) => (course.details > nextCourse.details ? 1 : -1))
        .map((course) => (<CourseItem key={course.id} courseData={course} />))}
      </section>
      
      <Events />
      
    </main>
  );
}

export default Courses;

