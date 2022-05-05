import PropTypes from "prop-types";
import React, { useState } from "react";
import productApi from "../../Api/productApi";
import Button from "../../components/Button/Button";
import numberWithCommas from "../../utils/numberWithCommas";
import ProductViewModal from "./ProductViewModal";

const ProductCard = (props) => {
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [productData, setProductData] = useState([]);

  const onShowModalProduct = (id) => {
    callApi(id);
  };
  const closeModal = () => {
    setIsShowModalProduct(false);
  };

  const callApi = (id) => {
    productApi.get(id).then((res) => {
      setProductData(res?.data);
      setIsShowModalProduct(true);
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={props.img01} alt="NEW" />
        <img src={props.img02} alt="" />
      </div>
      <h3 className="product-card__name">{props.name}</h3>
      <div className="product-card__price">
        {numberWithCommas(props.price)}
        <span className="product-card__price__old">
          <del>{numberWithCommas(25000000)}</del>
        </span>
      </div>

      <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => onShowModalProduct(props.id)}
        >
          Chọn mua
        </Button>
      </div>
      {isShowModalProduct && (
        <ProductViewModal
          openModal={isShowModalProduct}
          onClose={closeModal}
          productDetail={productData}
        />
      )}
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
