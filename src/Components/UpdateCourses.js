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
  img,
  courses,
  closeNewModal,
  setAddNewCourseFunction,
  getCourses,
  setAddUpdateFunction,
  rerender,
  showMessage,
  setShowMessage
}) {
  const coursesCollectionRef = collection(db, "courses");
  const [courseName, setCourseName] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSpots, setCourseSpots] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [courseImage, setCourseImage] = useState("");
  const [imageURL, setImageURL] = useState([]);


  const createCourse = async () => {
    await addDoc(coursesCollectionRef, {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: Number(coursePrice),
      info: courseDescription,
      spots: Number(courseSpots),
      img: courseImage,
    });
    getCourses();
    onClose(false);
    setAddNewCourseFunction(false)
    setAddUpdateFunction(false)
  };
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
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
    setCourseImage(img);
  }, [name, price, length, desc, date, slots, img]);

  if (!open) return null;

  function closeModal() {
    if (updateOnly) {
      onClose();
      closeNewModal(false);
    } else {
      setCourseData("");
      // closeNewModal(false);
      setAddNewCourseFunction(false);
      closeNewModal(false);
    }
  }

  const uploadImage = () => {
    if (uploadedImage == null) return;
    const imageRef = ref(storage, `images/${uploadedImage.name + v4()}`);
    uploadBytes(imageRef, uploadedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCourseImage((prev) => (prev, url));
        setShowMessage(true);
      });
    });
  };

  const updateCourse = async () => {
    const courseDoc = doc(db, "courses", id);
    const newUpdatedCourse = {
      name: courseName,
      details: courseDate,
      duration: courseDuration,
      price: coursePrice,
      info: courseDescription,
      spots: courseSpots,
      img: courseImage,
    };
    await updateDoc(courseDoc, newUpdatedCourse);
    console.log("UpdateCourse function");
    onClose(false);
    getCourses();
  };

  function handleSubmit() {
    if (updateOnly) {
      updateCourse();
    } else {
      createCourse();
      onClose(true);
    }
  }

  const deleteCourse = async (id) => {
    const courseDoc = doc(db, "courses", id);
    await deleteDoc(courseDoc);
    getCourses();
    onClose(false);
    closeNewModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
        <h4>Lägg till kurs</h4>
        <p>Alla fält som är markerade med en * är obligatoriska</p>
        <p>* Kursens namn: </p>
        <input
          value={courseName}
          type="text"
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
        />
        <p>* Kursens datum:</p>
        <input
          value={courseDate}
          type="datetime-local"
          onChange={(e) => {
            setCourseDate(e.target.value);
          }}
        />
        <p>* Kursens längd:</p>
        <input
          value={courseDuration}
          type="number"
          onChange={(e) => {
            setCourseDuration(e.target.value);
          }}
        />
        <p>* Kursens pris:</p>
        <input
          value={coursePrice}
          type="number"
          onChange={(e) => {
            setCoursePrice(e.target.value);
          }}
        />
        <p>* Antal platser:</p>
        <input
          value={courseSpots}
          type="number"
          onChange={(e) => {
            setCourseSpots(e.target.value);
          }}
        />
        <p>* Produktens bild:</p>
        <input
          type="file"
          onChange={(e) => {
            setUploadedImage(e.target.files[0]);
          }}
          accept="image/png, image/jpeg"
        />
        {showMessage ? (
          <p className={styles.message}>Successfully uploaded</p>
        ) : (
          ""
        )}
        <button className={styles.uploadBtn} onClick={uploadImage}>
          Ladda upp bilden
        </button>
        <p>* Kursens beskrivning:</p>
        <input
          value={courseDescription}
          type="textarea"
          onChange={(e) => {
            setCourseDescription(e.target.value);
          }}
        />
        <button onClick={handleSubmit} className={styles.button}>
          Submit
        </button>
        {updateOnly ? (
          <a
            className={styles.showBtn}
            href="#"
            onClick={() => {
              deleteCourse(id);
            }}
          >
            Ta bort
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UpdateCourses;
