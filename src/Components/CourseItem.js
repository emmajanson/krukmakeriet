import React from 'react'
import styles from "./CourseItem.module.css";

//Ska finnas med
//OnClick på knappen för att boka

function CourseItem(props) {
 
  return (
    <article className={styles.courseCardWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.courseImage} src={props.props.imgUrl} alt="" />
      </div>

      <div className={styles.textWrapper}>
        <div className={styles.test}>
          <h3 className={styles.name}>{props.props.name}</h3>
          <p className={styles.spots}>[10/12]</p>
        </div>
        <p className={styles.date}>{props.props.date}</p> 
        <p className={styles.info}>{props.props.info}</p>
        <p className={styles.length}>{props.props.duration}</p>
        <p className={styles.price}>{props.props.price}:-</p>
      </div>
      <button className={styles.button}>Boka</button>
    </article>
  )
}

export default CourseItem