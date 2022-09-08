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

        <div className={styles.infoWrapper}>
          <h3 className={styles.name}>{props.props.name}</h3>
          <p className={styles.date}>[ikon]{props.props.date}</p> 
          <p className={styles.info}>{props.props.info}</p>
        </div>

        
        <div className={styles.iconWrapper}>
          <p className={styles.price}>[ikon] {props.props.price}:-</p>
          <p className={styles.length}>[ikon] {props.props.duration}</p>
          <p className={styles.spots}>[ikon] [10/12]</p>
        </div>

        <button className={styles.button}>Boka</button>
      </div>
      
    </article>
  )
}

export default CourseItem