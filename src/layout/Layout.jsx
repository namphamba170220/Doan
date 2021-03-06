import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import Accessories from "../view/Accessory/Accessories";
import Admin from "../view/Admin/admin";
import ControlAccessory from "../view/Admin/ControlAccessory";
import ModalForgotPassword from "../view/Authentication/ForgotPassword/ModalForgotPassword";
import Login from "../view/Authentication/Login/Login";
import Resgister from "../view/Authentication/Register/Resgister";
import Cart from "../view/Cart/Cart";
import Catalog from "../view/Catalog/Catalog";
import Home from "../view/Home/Home";
import Order from "../view/Order/Order";

const Layout = () => {
  const fetchUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(fetchUser || "");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(currentUser.fullName);
  }, [currentUser]);

  return (
    <Router>
      <AuthProvider value={{ currentUser, setCurrentUser, userName }}>
        <CartProvider>
          <Header />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Routes>
            <Route
              path="/forgotpassword/:email"
              element={<ModalForgotPassword />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Resgister />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/order" element={<Order />} />
            <Route path="/controlAccessory" element={<ControlAccessory />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default Layout;
