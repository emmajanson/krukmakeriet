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
import { FaTimes } from "react-icons/fa";
import { set } from "mongoose";

function UpdateCourses({
  id,
  name,
  price,
  length,
  desc,
  slots,
  date,
  updateOnly,
  setCourses,
}) {
  const coursesCollectionRef = collection(db, "courses");
  const [courseName, setCourseName] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSpots, setCourseSpots] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const createCourse = async () => {
    await addDoc(coursesCollectionRef, {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: Number(coursePrice),
      info: courseDescription,
      spots: Number(courseSpots),
      img: courseImage,
    });
    toggle();
  };

  const toggle = () => {
    setIsActive((current) => !current);
  };

  useEffect(() => {
    setCourseName(name);
    setCoursePrice(price);
    setCourseDuration(length);
    setCourseDescription(desc);
    setCourseDate(date);
    setCourseSpots(slots);
  }, []);

  const updateCourse = async () => {
    const courseDoc = doc(db, "courses", id);
    const newUpdatedCourse = {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: coursePrice,
      info: courseDescription,
      spots: courseSpots,
    };
    await updateDoc(courseDoc, newUpdatedCourse);
    console.log("UpdateCourse function");
    toggle();
  };

  const deleteCourse = async (id) => {
    const courseDoc = doc(db, "courses", id);
    await deleteDoc(courseDoc);
    toggle();
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        display: isActive ? "none" : "flex",
      }}
    >
      <div className={styles.form}>
        <FaTimes className={styles.icon} onClick={toggle} />
        <h4>Lägg till kurs</h4>
        <p>Alla fält som är markerade med en * är obligatoriska</p>
        <p>Kursens namn: </p>
        <input
          value={courseName}
          type="text"
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
        />
        <p>Kursens datum:</p>
        <input
          value={courseDate}
          type="datetime-local"
          onChange={(e) => {
            setCourseDate(e.target.value);
          }}
        />
        <p>Kursens längd:</p>
        <input
          value={courseDuration}
          type="number"
          onChange={(e) => {
            setCourseDuration(e.target.value);
          }}
        />
        <p>Kursens pris:</p>
        <input
          value={coursePrice}
          type="number"
          onChange={(e) => {
            setCoursePrice(e.target.value);
          }}
        />
        <p>Antal platser:</p>
        <input
          value={courseSpots}
          type="number"
          onChange={(e) => {
            setCourseSpots(e.target.value);
          }}
        />
        <p>Produktens bild:</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setCourseImage(e.target.value);
          }}
        />
        <p>Kursens beskrivning:</p>
        <input
          value={courseDescription}
          type="textarea"
          onChange={(e) => {
            setCourseDescription(e.target.value);
          }}
        />
        <button
          className={styles.button}
          onClick={() => (updateOnly ? updateCourse() : createCourse())}
        >
          Spara
        </button>
        <a
          href="#"
          onClick={() => {
            deleteCourse(id);
          }}
        >
          Ta bort
        </a>
      </div>
    </div>
  );
}

export default UpdateCourses;
