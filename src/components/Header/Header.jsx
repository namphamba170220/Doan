import { LogoutOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { useAuthValue } from "../../contexts/AuthContext";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Quản lí sản phẩm",
    path: "/admin",
  },
  {
    display: "Quản lí đơn hàng",
    path: "/order",
  },
];

const Header = () => {
  const { currentUser, userName } = useAuthValue();
  const [userNameHeader, setUserNameHeader] = useState("");
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const ModelUser = mainNav.slice(0, 3);
  const ModelPublic = () => {
    return ModelUser.map((item, index) => (
      <div
        key={index}
        className={`header__menu__item header__menu__left__item ${
          index === activeNav ? "active" : ""
        }`}
        onClick={menuToggle}
      >
        <Link to={item.path}>
          <span>{item.display}</span>
        </Link>
      </div>
    ));
  };
  const ModelAdmin = mainNav.slice(3, 5);
  const ModelPrivate = () => {
    return ModelAdmin.map((item, index) => (
      <div
        key={index}
        className={`header__menu__item header__menu__left__item ${
          index === activeNav ? "active" : ""
        }`}
        onClick={menuToggle}
      >
        <Link to={item.path}>
          <span>{item.display}</span>
        </Link>
      </div>
    ));
  };

  const onCleanUser = () => {
    setUserNameHeader("");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    setUserNameHeader(userName);
  }, [userName]);

  useEffect(() => {
    const srollWeb = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", srollWeb);
    return () => {
      window.removeEventListener("scroll", srollWeb);
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" style={{ fontSize: "50px" }} />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {currentUser?.isAdmin ? <ModelPrivate /> : <ModelPublic />}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              {currentUser?.isAdmin ? (
                ""
              ) : (
                <Link to="/cart">
                  <i
                    style={{ color: "black" }}
                    className="bx bx-shopping-bag"
                  ></i>
                </Link>
              )}
            </div>
            <div className="header__menu__item header__menu__right__item">
              {currentUser ? (
                <>
                  <span>{userNameHeader}</span>
                  <Link to="/login">
                    <LogoutOutlined
                      style={{ margin: "0 0 10px 20px" }}
                      onClick={onCleanUser}
                    />
                  </Link>
                </>
              ) : (
                <Link to="/register">
                  <i className="bx bx-user"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
