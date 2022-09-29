import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import { AllContextProvider } from "./context/AllContext";

function App() {
  const LocationDisplay = () => {
    const location = useLocation();

    return (
      <div hidden data-testid="location-display">
        {location.pathname}
      </div>
    );
  };
  return (
    <div className={styles.wrapper}>
      <AllContextProvider>
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
          <LocationDisplay />
        </Router>
      </AllContextProvider>
    </div>
  );
}

export default App;
