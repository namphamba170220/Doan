import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  return (
    <div className="cart__item" ref={itemRef}>
      <div className="cart__item__image">
        <img src={item.product.image01} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.slug}`}>
            {`${item.product.title} - ${item.color} - ${item.size}`}
          </Link>
        </div>
        <div className="cart__item__info__price">
          {numberWithCommas(item.price)}
        </div>
        <div className="cart__item__info__quantity">
          <div className="product__info__item__quantity">
            <div className="product__info__item__quantity__btn">
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div className="product__info__item__quantity__btn">
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="cart__item__del">
          <i className="bx bx-trash"></i>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
