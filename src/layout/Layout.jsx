import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { AuthProvider } from "../contexts/AuthContext";
import { auth } from "../firebase";
import PrivateRoute from "../privateRoute";
import Accessories from "../view/Accessory/Accessories";
import Admin from "../view/Admin/admin";
import Login from "../view/Authentication/Login/Login";
import Resgister from "../view/Authentication/Register/Resgister";
import VerifyEmail from "../view/Authentication/verifyEmail/verifyEmail";
import Cart from "../view/Cart/Cart";
import Catalog from "../view/Catalog/Catalog";
import Contact from "../view/Contact/Contact";
import Home from "../view/Home/Home";
import Order from "../view/Order/Order";
import Product from "../view/Product/Product";

const Layout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Header />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/catalog/:slug" element={<Product />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </AuthProvider>
      <Footer />
      {/* <ProductViewModal/> */}
    </Router>
  );
};

export default Layout;
