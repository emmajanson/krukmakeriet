import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import styles from "./App.module.css";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

function App() {

  /* global */
  const [courseBasket, setCourseBasket] = useState([]);
  const [productBasket, setProductBasket] = useState([]);

  const appContextValues = {
    courseBasket: courseBasket,
    setCourseBasket: setCourseBasket,
    productBasket: productBasket,
    setProductBasket: setProductBasket
  };

  /*Uppdatera ls när baskets ändras*/
  useEffect(() => {
    localStorage.setItem('courseBasket', JSON.stringify(courseBasket))
  }, [courseBasket]);

  useEffect(() => {
    localStorage.setItem('productBasket', JSON.stringify(productBasket))
  }, [productBasket]);


  //SAKNAS!
  //Hur styr vi amount? Alltså när flera av samma sort läggs till?

  return (
    <div className={styles.wrapper}>
      <AppContext.Provider value={appContextValues}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
