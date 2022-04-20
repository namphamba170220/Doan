import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import numberWithCommas from "../../utils/numberWithCommas";
const AccessoryView = (props) => {

  const [previewImg, setPreviewImg] = useState(props.defaultValue.image01);
  const [descriptionExpand, setDescriptionExpand] = useState(false);
  const [color, setColor] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [colorData, setColorData] = useState([]);

  useEffect(() => {
    setColorData(props?.defaultValue?.colors);
  }, []);


  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(props.defaultValue.image01);
    setQuantity(1);
    setColor(undefined);
  }, [props.defaultValue.image01]);

  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }

    return true;
  };

  const addToCart = () => {
      if (check()) {
          let newItem = {
              slug: props.defaultValue.slug,
              color: colorData,
              price: props.defaultValue.price,
              quantity: quantity
          }
      }
  }

  const goToCart = () => {
      if (check()) {
          let newItem = {
              slug: props.defaultValue.slug,
              color: colorData,
              price: props.defaultValue.price,
              quantity: quantity
          }
      }
  }

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(props.defaultValue.image01)}
          >
            <img src={props.defaultValue.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(props.defaultValue.image02)}
          >
            <img src={props.defaultValue.image02} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: props.defaultValue.description }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{props.defaultValue.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {numberWithCommas(props.defaultValue.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {colorData.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
          <Button onClick={() => goToCart()}>mua ngay</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? "expand" : ""
        }`}
      >
        <div className="product-description__title">Chi tiết sản phẩm</div>
        <div
          className="product-description__content"
          dangerouslySetInnerHTML={{ __html: props.defaultValue.description }}
        ></div>
        <div className="product-description__toggle">
          <Button
            size="sm"
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? "Thu gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

AccessoryView.propTypes = {
  product: PropTypes.object,
};

export default AccessoryView;
