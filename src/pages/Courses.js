import React from "react";
import { useState, useEffect } from "react";
import CourseItem from "../Components/CourseItem";
import styles from "./Courses.module.css";
import Events from "../Components/Events";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Courses() {
  const [courses, setCourses] = useState([]);

  //Render from Database

  useEffect(() => {
    const coursesCollectionRef = collection(db, "courses");

    const getCourses = async () => {
      const data = await getDocs(coursesCollectionRef);
      setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCourses();
  }, []);

  return (
    <main className={styles.wrapper} data-testid="courses">
      <h2 className={styles.heading}>Kurser</h2>
      <section className={styles.courseWrapper}>
        {courses
          .sort((course, nextCourse) =>
            course.details > nextCourse.details ? 1 : -1
          )
          .map((course) => (
            <CourseItem key={course.id} courseData={course} />
          ))}
      </section>

      <Events />
    </main>
  );
}

export default Courses;
