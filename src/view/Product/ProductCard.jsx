import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import numberWithCommas from "../../utils/numberWithCommas";
import ProductViewModal from "./ProductViewModal";

const ProductCard = (props) => {
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const onShowModalProduct = () => {
    console.log("aaa");
    // setIsModalProduct(true);
  };
  const closeModal = () => {
    setIsShowModalProduct(false);
    setProductDetail(null)
  };

  return (
    <div className="product-card">
      <Link to={`/catalog/${props.slug}`}>
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
      </Link>
      <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onclick={onShowModalProduct}
        >
          Chọn mua
        </Button>
      </div>
      <div>
        {isShowModalProduct && (
          <ProductViewModal openModal={isShowModalProduct} onClose={closeModal} productDetail={productDetail}/>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
