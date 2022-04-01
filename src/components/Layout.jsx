import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from '../contexts/AuthContext';
import { auth } from '../firebase';
import Accessories from '../pages/Accessories';
import Login from '../pages/Authentication/Login';
import Resgister from '../pages/Authentication/Resgister';
import Catalog from '../pages/Catalog';
import Contact from '../pages/Contact';
import PrivateRoute from '../privateRoute';
import Home from '../pages/Home'
import VerifyEmail from '../pages/Authentication/verifyEmail/verifyEmail';

// import Header from "./Header";
// import ProductViewModal from "./ProductViewModal";

const Layout = () => {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])
  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
      <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }/>
         
          {/* <Route path="/catalog/:slug" element={<Product/>} /> */}
          <Route path="/catalog" element={<Catalog />} />
          {/* <Route path="/cart" element={<Cart/>} /> */}
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default Layout;
