import { Outlet, Navigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { AppContext } from "../App";

const PrivateRoutes = () => {
  /*   const [user, setUser] = useState({});
  const [uid, setUid] = useState("");
  const [users, setUsers] = useState([]);
  const [bol, setBol] = useState(false);
  const usersCollectionRef = collection(db, "users"); */

  const myContext = useContext(AppContext);
  const permission = myContext.adminPermission;
  console.log(permission);

  /*
  Kolla om du är ADMIN när du loggar in, spara i global state.
  */

  /*   useEffect(() => {
    async function doStuff() {
      await checkUser();
      await getUsers();
      checkForAdmin();
    }
    doStuff();
  }, [bol]); */

  /*   async function getUsers() {
    const usersArr = await getDocs(usersCollectionRef);
    console.log("usersArr:", usersArr.docs);
    setUsers(usersArr.docs.map((doc) => ({ ...doc.data() })));
    console.log("users:", users);
  }

  async function checkUser() {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUid(currentUser.uid);
    });
  }
 */
  /*   function checkForAdmin() {
    const currUser = users.find((user) => user.uid === uid);
    currUser !== undefined && setPermission(currUser.admin);
    setBol(true);
  } */

  return permission ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
