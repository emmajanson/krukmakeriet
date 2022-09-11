import React from "react";
import styles from "./UpdateCourses.module.css";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function UpdateCourses() {
  const coursesCollectionRef = collection(db, "courses");
  const [courseName, setCourseName] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseDuration, setCourseDuration] = useState(0);
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSpots, setCourseSpots] = useState(0);
  const [courseImage, setCourseImage] = useState("");


  const createCourse = async () => {
    await addDoc(coursesCollectionRef, {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: Number(coursePrice),
      info: courseDescription,
      spots: Number(courseSpots),
      img: courseImage


    });
  };

  return (
    <div className={styles.form}>
      <h4>Lägg till kurs</h4>
      <p>Alla fält som är markerade med en * är obligatoriska</p>
      <p>Kursens namn: </p>
      <input
        type="text"
        name="kname"
        id="kname"
        onChange={(e) => {
          setCourseName(e.target.value);
        }}
      />
      <p>Kursens datum:</p>
      <input
        type="datetime-local"
        onChange={(e) => {
          setCourseDate(e.target.value);
        }}
      />
      <p>Kursens längd:</p>
      <input
        type="number"
        onChange={(e) => {
          setCourseDuration(e.target.value);
        }}
      />
      <p>Kursens pris:</p>
      <input
        type="number"
        onChange={(e) => {
          setCoursePrice(e.target.value);
        }}
      />
       <p>Antal platser:</p>
      <input
        type="number"
        onChange={(e) => {
          setCourseSpots(e.target.value);
        }}
      />
      <p>Produktens bild:</p>
      <input type="file" accept="image/png, image/jpeg" onChange={(e) => {
          setCourseImage(e.target.value);
        }}/>
      <p>Kursens beskrivning:</p>
      <input
        type="text"
        onChange={(e) => {
          setCourseDescription(e.target.value);
        }}
      />
      <button className={styles.button} onClick={createCourse}>Spara</button>
      <a href="#">Ta bort</a>
    </div>
  );
}

export default UpdateCourses;
