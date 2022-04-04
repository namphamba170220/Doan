import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import policyApi from "../Api/policyApi";
import { AuthProvider } from "../contexts/AuthContext";
import { auth } from "../firebase";
import Accessories from "../pages/Accessories";
import Login from "../pages/Authentication/Login";
import Resgister from "../pages/Authentication/Resgister";
import VerifyEmail from "../pages/Authentication/verifyEmail/verifyEmail";
import Cart from "../pages/Cart";
import Catalog from "../pages/Catalog";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import PrivateRoute from "../privateRoute";
import Footer from "./Footer";
import Grid from "./Grid";
import Header from "./Header";
import PolicyCard from "./PolicyCard";
import Section, { SectionBody } from "./Section";
import Admin from "../pages/admin";
import Order from "../pages/Order";
import Product from "../pages/Product";
// import ProductViewModal from "./ProductViewModal";



const Layout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [policyData, setPolicyData] = useState([]);
  useEffect(()=>{
    policyApi.getAll().then(res => {
      if(res.statusText === 'OK'){
        setPolicyData(res.data);
      }
    })
  
  },[])


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Header />
        <Section >
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policyData.map((item, index) => (
                <Link key={index} to="/contact">
                  <PolicyCard
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>
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

          <Route path="/catalog/:slug" element={<Product/>} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/order" element={<Order/>} />
        </Routes>
      </AuthProvider>
      <Footer />
      {/* <ProductViewModal/> */}
    </Router>
  );
};

export default Layout;
