import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Helmet from "../../components/Helmet/Helmet";
import numberWithCommas from "../../utils/numberWithCommas";
import CartItem from "../../components/CartItem/CartItem";
const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || '[]';
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
//   useEffect(() => {
//     setCartProducts(cartItems);
//     setTotalProducts(cartItems.quantity);
//     setTotalPrice(cartItems.price);
//   }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block">Đặt hàng</Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        {/* <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div> */}
      </div>
    </Helmet>
  );
};

export default Cart;
