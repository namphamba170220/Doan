import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import Helmet from "../../components/Helmet/Helmet";
import ModalSubmitInfoUser from "../../components/ModalSubmitInfoUser";
import { CartContext } from "../../contexts/CartContext";
import numberWithCommas from "../../utils/numberWithCommas";

const Cart = () => {
  const cart = useContext(CartContext);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalInfoUser, setIsModalInfoUser] = useState(false);

  const onShowmodalInfoUser = () => {
    console.log(cart.cartItems);
    if (cart.cartItems.length === 0) {
      alert("Vui long mua san pham de thanh toan");
    } else {
      setIsModalInfoUser(true);
    }
  };
  const closeModal = () => {
    setIsModalInfoUser(false);
  };

  useEffect(() => {
    setCartProducts(cart.cartItems);

    const total = cart.cartItems.reduce((currentItem, nextItem) => {
      return currentItem + nextItem.quantity;
    }, 0);
    const price = cart.cartItems.reduce((currentItem, nextItem) => {
      return currentItem + parseFloat(nextItem.price) * nextItem.quantity;
    }, 0);
    setTotalProducts(total);
    setTotalPrice(price);
  }, [cart]);

  useEffect(() => {}, [cartProducts]);

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
            <Button size="block" onClick={onShowmodalInfoUser}>
              Đặt hàng
            </Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={item.id} index={index} />
          ))}
        </div>
      </div>
      {isModalInfoUser && (
        <ModalSubmitInfoUser
          openModal={isModalInfoUser}
          onClose={closeModal}
          productCardDetai={cartProducts}
        />
      )}
    </Helmet>
  );
};

export default Cart;
