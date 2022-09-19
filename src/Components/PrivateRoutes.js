import { Outlet, Navigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

const PrivateRoutes = () => {
  const [user, setUser] = useState({});
  const [uid, setUid] = useState("");
  const [users, setUsers] = useState([]);
  const [permission, setPermission] = useState(false);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    getUsers();
    checkUser();
    checkForAdmin();
  }, []);

  async function getUsers() {
    const usersArr = await getDocs(usersCollectionRef);
    setUsers(usersArr.docs.map((doc) => ({ ...doc.data() })));
  }

  function checkUser() {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUid(currentUser.uid);
    });
  }

  function checkForAdmin() {
    const currUser = users.find((user) => user.uid === uid);
    console.log(currUser);
  }

  return (
    <h1 style={{ paddingTop: "150px" }}>
      Detta är din nivå: {permission.toString()}
    </h1>
    //permission ? <Outlet /> : <Navigate to='/login' />
  );
};

export default PrivateRoutes;
