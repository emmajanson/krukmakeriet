import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./ListOfExistingCourses.module.css";
import { FaCaretDown } from "react-icons/fa";
import UpdateCourses from "./UpdateCourses";

function ListOfExsitingCourses(rerender) {
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

  const toggleUpdate = (
    id,
    name,
    date,
    length,
    price,
    slots,
    desc,
    img,
  ) => {
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
    setShowMessage(false)
  };

  const toggleNewCourse = () => {
    setAddUpdateFunction(() => false);
    setAddNewCourseFunction(true);
    setCourseData({});
    console.log("clicky");
    setOpenModal(() => true);
    setShowMessage(false)
  };

  async function getCourses() {
    const data = await getDocs(courseCollectionRef);
    setCourses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
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
                  course.img
                )
              }
            >
              <p>{course.name}</p>
              <p>{course.details}</p>
<img src={course.img} className={styles.courseImage}/>
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
          onClose={setOpenModal}
          setCourseData={setCourseData}
          courses={courses}
          img={courseData.img}
          getCourses={getCourses}
          setAddUpdateFunction={setAddUpdateFunction}
          rerender={rerender}
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
            rerender={rerender}
            showMessage={showMessage}
          setShowMessage={setShowMessage}
          />
        )}
      </div>
    </div>
  );
}

export default ListOfExsitingCourses;
