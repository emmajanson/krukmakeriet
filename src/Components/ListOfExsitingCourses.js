import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingCourses.module.css";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import UpdateCourses from "./UpdateCourses";

function ListOfExsitingCourses() {
  const courseCollectionRef = collection(db, "courses");
  const [courses, setCourses] = useState([]);
  const [courseID, setCourseID] = useState();
  const [updateOnly, setUpdateOnly] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [addUpdateFunction, setAddUpdateFunction] = useState(false);
  const [addNewCourseFunction, setAddNewCourseFunction] = useState(false);
  const [showBro, setShowBro] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [courseData, setCourseData] = useState({
    name: "",
    date: "",
    length: "",
    price: "",
    slots: "",
    desc: "",
    img: "",
  });
//if the props are avaiable set them to the course state and display a modal with already filled input fields
  const toggleUpdate = (id, name, date, length, price, slots, desc, img) => {
    setCourseData({});
    setAddUpdateFunction(true);
    setAddNewCourseFunction(false);
    setCourseData({
      ...courseData,
      name,
      date,
      length,
      price,
      slots,
      desc,
      img,
    });
    setCourseID(id);
    setOpenModal(true);
    setShowMessage(false);
  };
//empty the course state and display an empty modal for the new course
  const toggleNewCourse = () => {
    setAddUpdateFunction(() => false);
    setAddNewCourseFunction(true);
    setCourseData({});
    console.log("clicky");
    setOpenModal(() => true);
    setShowMessage(false);
  };
//get the courses from db
  async function getCourses() {
    const data = await getDocs(courseCollectionRef);
    setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
//render the courses when refreshed
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.coursesWrapper}>
        <h3 className={styles.title}>Kurser</h3>
        <p className={styles.text}>Lägg till ny kurs eller välj befintlig för att uppdatera/se deltagarlista</p>
        <button className={styles.button} onClick={() => toggleNewCourse()}>
          <p className={styles.btnText}>Lägg till ny kurs</p>
          <div className={styles.iconWrapper}>
            <FaPlus className={styles.plusIcon}/>
          </div>
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
                  course.img
                )
              }
            >
            <p className={styles.name}>{course.name}</p>
            <p className={styles.date}>{course.details}</p>
            <img src={course.img} className={styles.courseImage} />
            <FaChevronRight className={styles.FaChevronRight} />
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
          onClose={setOpenModal}
          setCourseData={setCourseData}
          courses={courses}
          img={courseData.img}
          getCourses={getCourses}
          setAddUpdateFunction={setAddUpdateFunction}
        
          showMessage={showMessage}
          setShowMessage={setShowMessage}
        />
      )}
      <div className={styles.modal}>
        {addNewCourseFunction && (
          <UpdateCourses
            open={openModal}
            onClose={setOpenModal}
            closeNewModal={setOpenModal}
            setCourseData={setCourseData}
            setAddNewCourseFunction={setAddNewCourseFunction}
            getCourses={getCourses}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
          />
        )}
      </div>
    </div>
  );
}

export default ListOfExsitingCourses;
