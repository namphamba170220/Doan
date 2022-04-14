import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import productApi from "../../Api/productApi";
import Button from "../../components/Button/Button";
import numberWithCommas from "../../utils/numberWithCommas";

const ProductCard = (props) => {
  const [id, setId] = useState(null);
  const [productData, setProductData] = useState([])

  const showModalProduct = (check) => {
    console.log("aaa");
    // if(check && id) {
    //   productApi.get(id).then((res) => {
    //     setProductData(res?.data);
    //   })
    // }
  }

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
          onClick={() => showModalProduct(props?.id)

          }
        >
          Chọn mua
        </Button>
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
