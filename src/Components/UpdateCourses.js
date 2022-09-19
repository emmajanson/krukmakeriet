import React from "react";
import styles from "./UpdateCourses.module.css";
import { db, storage } from "../firebase-config";
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
import { v4 } from "uuid";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

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
  open,
  onClose,
  setCourseData,
  url,
  img,
  courses,
  closeNewModal,
  setAddNewCourseFunction,
}) {
  const coursesCollectionRef = collection(db, "courses");
  const [courseURL, setCourseURL] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSpots, setCourseSpots] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [imageURL, setImageURL] = useState([]);
  const imageListRef = ref(storage, "images/");
  // const [isActive, setIsActive] = useState(false);

  const createCourse = async () => {
    await addDoc(coursesCollectionRef, {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: Number(coursePrice),
      info: courseDescription,
      spots: Number(courseSpots),
      url: courseURL,
      img: courseImage,
    });
    onClose(false)
  };

  useEffect(() => {
    const imageListRef = ref(storage, "images/");
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageURL((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    setCourseName(name);
    setCoursePrice(price);
    setCourseDuration(length);
    setCourseDescription(desc);
    setCourseDate(date);
    setCourseSpots(slots);
  }, [name, price, length, desc, date, slots, img]);

  if (!open) return null;

  function closeModal() {
    if (updateOnly) {
      onClose();
    } else {
      setCourseData("");
      // closeNewModal(false);
      setAddNewCourseFunction(false);
    }
  }
  console.log("typeof", typeof(closeNewModal))

  const uploadImage = () => {
    if (uploadedImage == null) return;
    const imageRef = ref(storage, `images/${uploadedImage.name + v4()}`);
    uploadBytes(imageRef, uploadedImage)
      .then(() => {
        console.log("imageRef", imageRef);
      })
      .then(setCourses((prev) => [...prev, { img: imageRef }]))
      .then(console.log("input:", uploadedImage))
      .then(console.log("savedImage:", imageRef))
  };
  //uploadImage()

  const updateCourse = async () => {
    const courseDoc = doc(db, "courses", id);
    const newUpdatedCourse = {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: coursePrice,
      info: courseDescription,
      spots: courseSpots,
      url: courseURL,
      img: courseImage,
    };
    await updateDoc(courseDoc, newUpdatedCourse);
    console.log("UpdateCourse function");
    onClose(false)
  };

  function handleSubmit() {
    if (updateOnly) {
      updateCourse();
      uploadImage();
      
    } else {
      createCourse();
      uploadImage();
      
    }
  }

  const deleteCourse = async (id) => {
    const courseDoc = doc(db, "courses", id);
    await deleteDoc(courseDoc);
    onClose(false)
  };

  return (
    <div className={styles.wrapper}>
      <img src={courseImage} alt="en bild" className={styles.image} />
      <div className={styles.form}>
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
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
          onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }}
          accept="image/png, image/jpeg"
        />
        <p>Kursens beskrivning:</p>
        <input
          value={courseDescription}
          type="textarea"
          onChange={(e) => {
            setCourseDescription(e.target.value);
          }}
        />
        {/* <button
          className={styles.button}
          onClick={() => (updateOnly ? updateCourse() : createCourse())}
        >
          Spara
        </button> */}
        <button onClick={handleSubmit} className={styles.button}>
          Submit
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
