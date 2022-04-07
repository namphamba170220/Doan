import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import numberWithCommas from "../../utils/numberWithCommas";

const AccessoryCard = (props) => {
  return (
    <div className="accessory-card">
      <Link to={`/accessories/${props.slug}`}>
        <div className="accessory-card__image">
          <img src={props.img01} alt="NEW" />
          <img src={props.img02} alt="" />
        </div>
        <h3 className="accessory-card__name">{props.name}</h3>
        <div className="accessory-card__price">
          {numberWithCommas(props.price)}
          <span className="accessory-card__price__old">
            <del>{numberWithCommas(5000000)}</del>
          </span>
        </div>
      </Link>
      <div className="accessory-card__btn">
        <Button size="sm" icon="bx bx-cart" animate={true}>
          Chọn mua
        </Button>
      </div>
    </div>
  );
};

AccessoryCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default AccessoryCard;
