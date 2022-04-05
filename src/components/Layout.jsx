import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { auth } from "../firebase";
import Accessories from "../pages/Accessories";
import Admin from "../pages/admin";
import Login from "../pages/Authentication/Login";
import Resgister from "../pages/Authentication/Resgister";
import VerifyEmail from "../pages/Authentication/verifyEmail/verifyEmail";
import Cart from "../pages/Cart";
import Catalog from "../pages/Catalog";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Order from "../pages/Order";
import Product from "../pages/Product";
import PrivateRoute from "../privateRoute";
import Footer from "./Footer";
import Header from "./Header";

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
