import React, { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import CheckoutItem from "../Components/CheckoutItem";
import { AllContext } from "../context/AllContext";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Popup from "../Components/PopUpTemplate";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function Checkout() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const usersRef = collection(db, "users");

  /*
  let { productBasket} = useContext(AppContext)
  let { courseBasket} = useContext(AppContext)

  
  if (courseBasket === null) {courseBasket = []}
  if (productBasket === null) {productBasket = []}

  */

  const {
    productBasket,
    setProductBasket,
    courseBasket,
    setCourseBasket,
    setRefresh,
  } = useContext(AllContext);

  const totalSum = (basket) => {
    let sum = 0;
    basket.forEach((item) => {
      sum += item.price * item.amount;
    });
    return sum;
  };

  let coursesInBasket = "";
  if (courseBasket.length > 0) {
    coursesInBasket = "Kurser";
  }

  let productsInBasket = "";
  if (productBasket.length > 0) {
    productsInBasket = "Produkter";
  }

  const totalSumProduct = totalSum(productBasket);
  const totalSumCourse = totalSum(courseBasket);
  const totalSumBasket = totalSumProduct + totalSumCourse;

  // _PRODUCTS_
  // 1. Lägga till de köpta Products i användarens DB. (för varje köp, lägg till ett nytt objekt (döp till ett datum))
  // 2. Uppdatera "amount" på de produkter som köpts (Går inte att minska under 0).

  // _COURSES_
  // 1. Lägga till Courses i användarens DB.
  // 2. Uppdatera "spots" i den kursen som är bokad.
  // 3. Lägga till användarens E-mail i en array på den kurs som är bokad (för admin).

  const [currUID, setCurrUID] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrUID(user.uid);
    });
  }, []);

  async function updateProducts() {
    // Creates a string-name with the date for the purchase.
    const currDate = new Date().getDate();
    const currMonth = () => {
      if (new Date().getMonth() + 1 < 10) {
        return `0${new Date().getMonth() + 1}`;
      } else {
        return `${new Date().getMonth() + 1}`;
      }
    };
    const currYear = new Date().getFullYear();
    const currHour = new Date().getHours();
    const currMinute = new Date().getMinutes();
    const currSecond = () => {
      if (new Date().getSeconds() + 1 < 10) {
        return `0${new Date().getSeconds() + 1}`;
      } else {
        return `${new Date().getSeconds() + 1}`;
      }
    };

    const orderNumber = Math.floor(100000000 + Math.random() * 900000000);

    const currentDate = `${currYear}-${currMonth()}-${currDate} ${currHour}:${currMinute}:${currSecond()}`;

    // Adding the purchased Products and Courses to users DB
    const userDoc = doc(db, "users", currUID);

    if (productBasket || courseBasket) {
      await updateDoc(userDoc, {
        [`purchases.${currentDate}`]: arrayUnion({
          purchasedProducts: {
            product: productBasket.map((item) => {
              return {
                name: item.name,
                amount: item.amount,
                price: item.price,
                orderNumber: orderNumber ? orderNumber : null,
                date: `${currYear}-${currMonth()}-${currDate}`,
              };
            }),
          },
          bookedCourses: {
            courses: courseBasket.map((course) => {
              return {
                name: course.name,
                date: course.details,
                price: course.price,
              };
            }),
          },
        }),
      });

      const idArray = productBasket.map((item) => {
        return {
          amount: item.amount,
          id: item.id,
        };
      });

      // idArray.map(async (item) => {
      //   const currentAmount = await getDoc(db, "products", item.id);
      //   const productRef = doc(db, "products", item.id);
      //   await updateDoc(productRef, {
      //     amount: currentAmount - item.amount,
      //   });
      // });

      // for (let i = 0; i < idArray.length; i++) {
      //   const currentAmount = await getDoc(db, "products", idArray[i].id);
      //   const productRef = doc(db, "products", idArray[i].id);
      //   await updateDoc(productRef, {
      //     amount: currentAmount - idArray[i].amount,
      //   });
      // }
    } else {
      return;
    }

    if (courseBasket) {
      const courseIDs = courseBasket.map((course) => {
        return course.id;
      });
    }

    // Removes items from shoppingcart
    localStorage.setItem("productBasket", "[]");
    localStorage.setItem("courseBasket", "[]");
    setRefresh((curr) => !curr);
  }

  return (
    <main className={styles.siteWrapper}>
      <div className={styles.wrapperAll}>
        <section className={styles.basketWrapper}>
          <h1>Din beställning</h1>
          <h2>Varukorg</h2>
          <section className={styles.productsWrapper}>
            <h3>{productsInBasket}</h3>
            {productBasket && (
              <section className={styles.basketItemWrapper}>
                <h4 className={styles.subHeading}></h4>
                {productBasket.map((product) => (
                  <CheckoutItem key={product.id} productData={product} />
                ))}
              </section>
            )}
          </section>
          <section className={styles.coursesWrapper}>
            <h3>{coursesInBasket}</h3>
            {courseBasket && (
              <section className={styles.basketItemWrapper}>
                <h4 className={styles.subHeading}></h4>
                {courseBasket.map((product) => (
                  <CheckoutItem key={product.id} productData={product} />
                ))}
              </section>
            )}
          </section>
          <div className={styles.totalAmountWrapper}>
            <p className={styles.totalAmountText}>Totalsumma</p>
            <p className={styles.totalAmountPrice}>{totalSumBasket}:-</p>
          </div>
        </section>

        <form className={styles.userInfoWrapper}>
          <h2>Leveransuppgifter</h2>
          <div className={styles.userFirstInputsWrapper}>
            <label name="firstName">Förnamn*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="firstName"
              placeholder="Ex. Anna"
            ></input>

            <label name="lastName">Efternamn*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="lastName"
              placeholder="Ex. Andersson"
              required
            ></input>

            <label name="email">E-post*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="email"
              placeholder="exempel@exempel.se"
              required
            ></input>

            <label name="phoneNumber">Telefonnummer*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="phoneNumber"
              placeholder="+46 xxxxxxxx"
              required
            ></input>

            <label name="address">Adress*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="address"
              placeholder="Gatunamn 0"
              required
            ></input>
          </div>

          <div className={styles.userSecondInputsWrapper}>
            <div className={styles.inputSmall}>
              <label name="zipCode">Postnummer*</label>
              <input
                type="text"
                name="zipcode"
                placeholder="xxx xx"
                required
              ></input>
            </div>
            <div className={styles.inputMedium}>
              <label name="city">Stad*</label>
              <input 
                type="text" 
                name="city" 
                placeholder="Ex. Stockholm" 
                required
              ></input>
            </div>
          </div>
        </form>

        <section className={styles.paymentWrapper}>
          <h2>Betalningsalternativ</h2>
          <div className={styles.payFirstInputsWrapper}>
            <label name="cardName">Kortinnehavarens namn*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="cardName"
              placeholder="Ex. Anna Andersson"
              required
            ></input>

            <label name="cardNumber">Kortnummer*</label>
            <input
              className={styles.inputLarge}
              type="text"
              name="cardNumber"
              placeholder="xxxxxxxxxxxxxxx"
              required
            ></input>
          </div>

          <div className={styles.paySecondInputsWrapper}>
            <div className={styles.inputSmall}>
              <label name="expDate">Datum*</label>
              <input
                type="text"
                name="expDate"
                placeholder="xx/xx"
                required
              ></input>
            </div>
            <div className={styles.inputSmall}>
              <label name="cvc">CVC*</label>
              <input 
                type="text" 
                name="cvc" 
                placeholder="xxx" 
                required
                ></input>
            </div>
          </div>
        </section>

        <section className={styles.btnWrapper}>
          <button
            className={styles.checkoutBtn}
            onClick={() => {
              navigate("/Shop");
            }}
          >
            Fortsätt handla
          </button>
          <button
            onClick={() => {
              setShowPopup(true);
              updateProducts();
            }}
            className={styles.checkoutBtn}
          >
            Bekräfta köp
          </button>
          <Popup
            trigger={showPopup}
            setTrigger={setShowPopup}
            navigation={"/shop"}
          >
            <h1>Tack för ditt köp</h1>
            <p>En beställningsbekräftelse har skickats till din epostadress</p>
            <p>Ingen e-post? Kolla i skräpposten.</p>
          </Popup>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
