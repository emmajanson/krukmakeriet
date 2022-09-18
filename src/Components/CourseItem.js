import React from 'react'
import styles from "./CourseItem.module.css";
import { useContext } from 'react'
import { AppContext } from '../App'
import ShopItem from './ShopItem';

function CourseItem({courseData}) {

  const { courseBasket, setCourseBasket } = useContext(AppContext) 

  function addToBasket(course) {
    if (courseBasket === null) {
      setCourseBasket([{...course, amount: 1}])
    } else {
      const exist = courseBasket.find(item => item.id === courseData.id);
      if (exist){
        setCourseBasket(
          courseBasket.map(item => 
            item.id === course.id ? {...exist, amount: exist.amount + 1} : item
          )
        );
      } else {
      setCourseBasket([...courseBasket, {...course, amount: 1}])
      }
    }
    
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