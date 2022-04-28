import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import numberWithCommas from "../../utils/numberWithCommas";

const CartItem = (props) => {
  console.log(props);
  const cart = useContext(CartContext);
  const itemRef = useRef(null);
  const [item, setItem] = useState([props.item]);
  const [quantity, setQuantity] = useState(props.item.quantity);

  const updateQuantity = (meth, index) => {
    cart.updateItem(meth, index);
  };

  const removeCartItem = (index) => {
    cart.removeFromCart(index);
  };

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);
  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image">
        <img src={props.item.img01} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          {`${props.item.title} - ${props.item.color} - ${props.item.version}`}
        </div>
        <div className="cart__item__info__price">
          {numberWithCommas(props.item.price)}
        </div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("-", props.index)}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {item.quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("+", props.index)}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i
            className="bx bx-trash"
            onClick={() => removeCartItem(props.index)}
          ></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
