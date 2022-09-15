import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingCourses.module.css";
import { FaCaretDown } from "react-icons/fa";
import UpdateCourses from "./UpdateCourses";

function ListOfExsitingCourses() {
  const courseCollectionRef = collection(db, "courses");
  const [courses, setCourses] = useState([]);
  const [addUpdateFunction, setAddUpdateFunction] = useState(false);
  const [addNewCourseFunction, setAddNewCourseFunction] = useState(false);
  const [courseID, setCourseID] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [updateOnly, setUpdateOnly] = useState(false);

  const [courseData, setCourseData] = useState({
    name: "",
    date: "",
    length: "",
    price: "",
    slots: "",
    desc: "",
    img: "",
    url: "",
    img:""
  });

  const toggleUpdate = (id, name, date, length, price, slots, desc, url, img) => {
    setCourseData({});
    setAddUpdateFunction(true);
    setCourseData({
      ...courseData,
      name,
      date,
      length,
      price,
      slots,
      desc,
      url,
      img
    });
    setCourseID(id);
    setOpenModal(true);
  };

  console.log("courseData:", courseData);

  const toggleNewCourse = () => {
    if (courses.legth > 0) {
      console.log("full");
      toggleUpdate();
    } else {
      console.log("tom");
      setAddNewCourseFunction(true);
      setCourseData("");
      setOpenModal(true);
    }
  };

  useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(courseCollectionRef);
      setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCourses();
  }, []);

  return (
    <div>
      <h3 className={styles.title}>Kurser</h3>
      <div className={styles.courses}>
        <button className={styles.button} onClick={() => toggleNewCourse()}>
          Lägg till en ny kurs
        </button>
        {courses.map((course, index) => {
          return (
            <div
              key={index}
              className={styles.details}
              onClick={() =>
                toggleUpdate(
                  course.id,
                  course.name,
                  course.details,
                  course.duration,
                  course.price,
                  course.spots,
                  course.info,
                  course.url,
                  course.img
                )
              }
            >
              <p>{course.name}</p>
              <p>{course.details}</p>
              <FaCaretDown className={styles.FaCaretDown} />
            </div>
          );
        })}
      </div>
      {addUpdateFunction && (
        <UpdateCourses
          setCourses={setCourses}
          id={courseID}
          updateOnly={addUpdateFunction}
          name={courseData.name}
          date={courseData.date}
          length={courseData.length}
          slots={courseData.slots}
          price={courseData.price}
          desc={courseData.desc}
          open={openModal}
          onClose={() => setOpenModal(false)}
          setCourseData={setCourseData}
          courses={courses}
          url={courseData.url}
          img={courseData.img}
        />
      )}
      <div className={styles.modal}>
        {addNewCourseFunction && <UpdateCourses />}
      </div>
    </div>
  );
}

export default ListOfExsitingCourses;
