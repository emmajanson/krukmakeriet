import React from 'react'
import styles from "./CourseItem.module.css";
import { useContext } from 'react'
import { AppContext } from '../App'


function CourseItem({courseData}) {

  const {setCourseBasket} = useContext(AppContext) 

  function addToBasket(courseData) {
    setCourseBasket(prevBasket => [...prevBasket, courseData])
    console.log("Added to basket " + courseData.name)
  }
  

  return (
    <article className={styles.courseCardWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.courseImage} src={courseData.img} alt="" />
      </div>
      
      <div className={styles.textWrapper}>
        <div className={styles.infoWrapper}>
          <h3 className={styles.name}>{courseData.name}</h3>
          <p className={styles.date}>[ikon]{courseData.details}</p> 
          <p className={styles.info}>{courseData.info}</p>
        </div>
        
        <div className={styles.iconWrapper}>
          <p className={styles.price}>[ikon] {courseData.price}:-</p>
          <p className={styles.length}>[ikon] {courseData.duration}</p>
          <p className={styles.spots}>[ikon] [10/{courseData.spots}]</p>
        </div>
        <button className={styles.button} onClick={() => addToBasket(courseData)}>Boka</button>
      </div>
    
    </article>
  )
}

export default CourseItem