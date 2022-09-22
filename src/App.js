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
import ResetPassword from "./pages/ResetPassword";
import PrivateRoutes from "./Components/PrivateRoutes";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const AppContext = createContext();

function App() {
  /* global */
  let [courseBasket, setCourseBasket] = useState(
    JSON.parse(localStorage.getItem("courseBasket"))
  );
  let [productBasket, setProductBasket] = useState(
    JSON.parse(localStorage.getItem("productBasket"))
  );
  const [adminPermission, setAdminPermission] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const usersRef = collection(db, "users");

  const appContextValues = {
    courseBasket: courseBasket,
    setCourseBasket: setCourseBasket,
    productBasket: productBasket,
    setProductBasket: setProductBasket,
    adminPermission: adminPermission,
    setAdminPermission: setAdminPermission,
    setRefresh: setRefresh,
  };

  if (courseBasket === null) {
    courseBasket = [];
  }
  if (productBasket === null) {
    productBasket = [];
  }

  useEffect(() => {
    localStorage.setItem("courseBasket", JSON.stringify(courseBasket));
  }, [courseBasket]);

  useEffect(() => {
    localStorage.setItem("productBasket", JSON.stringify(productBasket));
  }, [productBasket]);

  // Checks if the user is admin on signin
  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(usersRef);
      const users = data.docs.map((doc) => ({ ...doc.data() }));
      onAuthStateChanged(auth, (user) => {
        const isAdmin = users.find((a) => a.uid === user.uid);
        setAdminPermission(isAdmin.admin);
        localStorage.setItem("admin", isAdmin.admin);
      });
    }
    getUsers();
  }, [refresh]);

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
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
