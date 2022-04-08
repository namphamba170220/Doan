import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import productApi from "../../Api/productApi";
import Button from "../../components/Button/Button";
// import numberWithCommas from '../utils/numberWithCommas'
const ProductView = () => {
  const [productData, setProductData] = useState([]);
  const [previewImg, setPreviewImg] = useState(productData.image01);
  const [descriptionExpand, setDescriptionExpand] = useState(false);
  const [color, setColor] = useState(undefined);
  const [version, setVersion] = useState(undefined);
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.statusText === "OK") {
        setProductData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    setPreviewImg(productData.image01);
    setQuantity(1);
    setColor(undefined);
    setVersion(undefined);
  }, [productData]);

  const check = () => {
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }

    if (version === undefined) {
      alert("Vui lòng chọn phiên bản!");
      return false;
    }

    return true;
  };

  // const addToCart = () => {
  //     if (check()) {
  //         let newItem = {
  //             slug: productData.slug,
  //             color: color,
  //             version: version,
  //             price: productData.price,
  //             quantity: quantity
  //         }
  //     }
  // }

  // const goToCart = () => {
  //     if (check()) {
  //         let newItem = {
  //             slug: productData.slug,
  //             color: color,
  //             version: version,
  //             price: productData.price,
  //             quantity: quantity
  //         }
  //     }
  // }

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(productData.image01)}
          >
            <img src={productData.image01} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(productData.image02)}
          >
            <img src={productData.image02} alt="" />
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
            dangerouslySetInnerHTML={{ __html: productData.description }}
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
        <h1 className="product__info__title">{productData.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {/* {numberWithCommas(productData.price)} */}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {productData.colors.map((item, index) => (
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
          <div className="product__info__item__title">Phiên bản</div>
          <div className="product__info__item__list">
            {productData.version.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  version === item ? "active" : ""
                }`}
                onClick={() => setVersion(item)}
              >
                <span className="product__info__item__list__item__size">
                  {item}
                </span>
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
          <Button>thêm vào giỏ</Button>
          <Button>mua ngay</Button>
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
          dangerouslySetInnerHTML={{ __html: productData.description }}
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

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
