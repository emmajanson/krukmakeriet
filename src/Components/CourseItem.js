import React, { useState } from "react";
import styles from "./CourseItem.module.css";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";
import Popup from "./Popup.js";
import { FaTag, FaClock } from "react-icons/fa";

function CourseItem({ courseData }) {
  const { courseBasket, setCourseBasket } = useContext(AllContext);
  const [showPopup, setShowPopup] = useState(false);

  function addToBasket(course) {
    if (courseBasket === null) {
      setCourseBasket([{ ...course, amount: 1 }]);
    } else {
      const exist = courseBasket.find((item) => item.id === courseData.id);
      if (exist) {
        setCourseBasket(
          courseBasket.map((item) =>
            item.id === course.id
              ? { ...exist, amount: exist.amount + 1 }
              : item
          )
        );
      } else {
        setCourseBasket([...courseBasket, { ...course, amount: 1 }]);
      }
    }
  }

  const timeout = setTimeout(trigger, 2000);

  function trigger() {
    setShowPopup(false);
  }

  function removeModal() {
    clearTimeout(timeout);
  }

  return (
    <article className={styles.courseCardWrapper} data-testid="courseItem">
      <div className={styles.imgWrapper}>
        <img className={styles.courseImage} src={courseData.img} alt="" />
      </div>

      <div className={styles.textWrapper}>
        <div className={styles.infoWrapper}>
          <h3 className={styles.name}>{courseData.name}</h3>
          <p className={styles.date}>{courseData.details.replace("T", " ")}</p>
        </div>

        <div className={styles.iconWrapper}>
          <p className={styles.price}>
            <FaTag /> {courseData.price}:-
          </p>
          <p className={styles.length}>
            <FaClock /> {courseData.duration}min
          </p>
        </div>
        <p className={styles.info}>{courseData.info}</p>

        <button
          className={styles.button}
          onClick={() => {
            addToBasket(courseData);
            setShowPopup(true);
            removeModal();
          }}
        >
          Boka
        </button>
      </div>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>
        <p>Din kurs är nu lagd i varukorgen.</p>
      </Popup>
    </article>
  );
}

export default CourseItem;
