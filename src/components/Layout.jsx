import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ProductViewModal from "./ProductViewModal";
import Routes from "../routes/Routes";
import productApi from "../Api/productApi";

const Layout = () => {
  const [productData, setProductData] = useState([]);

  const getAllProducts = () => productData;

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.statusText === "OK") {
        setProductData(res.data);
      }
    });
  }, []);

  const getProducts = (count) => {
    const max = productData.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return productData.slice(start, start + count);
  };
  const getProductBySlug = (slug) => productData.find((e) => e.slug === slug);

  const getCartItemsInfo = (cartItems) => {
    let res = [];
    if (cartItems.length > 0) {
      cartItems.forEach((e) => {
        let product = getProductBySlug(e.slug);
        res.push({
          ...e,
          product: product,
        });
      });
    }
    
    return res.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  };

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <Header {...props} />
            <div className="container">
              <div className="main">
                <Routes />
              </div>
            </div>
            <Footer />
            <ProductViewModal/>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
