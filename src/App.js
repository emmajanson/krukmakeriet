import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import styles from "./App.module.css";

//Lägg in nestlade routes för att hantera kategorier i webshopen & adminsidan

function App() {
  return (
    <div className={styles.wrapper}>
      <div id="test">
        <p>test</p>
      </div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
