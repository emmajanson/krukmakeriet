import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [courseBasket, setCourseBasket] = useState(
    JSON.parse(localStorage.getItem("courseBasket"))
  );
  const [productBasket, setProductBasket] = useState(
    JSON.parse(localStorage.getItem("productBasket"))
  );
  const [adminPermission, setAdminPermission] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const usersRef = collection(db, "users");
  const [shopProductModalOpen, setShopProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [addedToBasketPopupOpen, setAddedToBasketPopupOpen] = useState(false);
  const [basketAmount, setBasketAmount] = useState(0);

  if (courseBasket === null) {
    setCourseBasket([]);
  }
  if (productBasket === null) {
    setProductBasket([]);
  }

  useEffect(() => {
    localStorage.setItem("courseBasket", JSON.stringify(courseBasket));
  }, [courseBasket]);

  useEffect(() => {
    localStorage.setItem("productBasket", JSON.stringify(productBasket));
  }, [productBasket]);

  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(usersRef);
      const users = data.docs.map((doc) => ({ ...doc.data() }));
      onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const isAdmin = users.find((a) => a.uid === user.uid);
        setAdminPermission(isAdmin.admin);
        localStorage.setItem("admin", isAdmin.admin);
      });
    }
    getUsers();
  }, [refresh, usersRef]);

  return (
    <AllContext.Provider
      value={{
        courseBasket,
        setCourseBasket,
        productBasket,
        setProductBasket,
        adminPermission,
        setAdminPermission,
        refresh,
        setRefresh,
        shopProductModalOpen,
        setShopProductModalOpen,
        selectedProduct,
        setSelectedProduct,
        showTopBtn,
        setShowTopBtn,
        addedToBasketPopupOpen,
        setAddedToBasketPopupOpen,
        basketAmount,
        setBasketAmount,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
