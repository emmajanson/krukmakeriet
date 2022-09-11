import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingCourses.module.css";
import { FaCaretDown } from "react-icons/fa";
import UpdateCourses from "./UpdateCourses"

function ListOfExsitingCourses() {
  const usersCollectionRef = collection(db, "courses");
  const [courses, setCourses] = useState([]);
  const [showUpdate, setShowUpdate] = useState()

  const setNewCourse = () => {
    console.log("added");
  };

  useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(usersCollectionRef);
      setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCourses();
  }, []);

  
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Kurser</h3>
      <div className={styles.courses}>
        <button className={styles.button} onClick={setNewCourse}>
          Lägg till en ny kurs
        </button>
        {courses.map((cours, index) => {
          return (
            <div key={index} className={styles.details}>
              <p>{cours.name}</p>
              <p>{cours.details}</p>
              <FaCaretDown className={styles.FaCaretDown} />
            </div>
          );
        })}
        
      </div>
      <UpdateCourses />
    </div>
  );
}

export default ListOfExsitingCourses;
