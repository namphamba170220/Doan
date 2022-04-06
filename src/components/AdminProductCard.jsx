import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";
import React from "react";
import numberWithCommas from "../utils/numberWithCommas";
const AdminProductCard = (props) => {
  return (
    <div className="admin-product-card">
      <div className="admin-product-card__image">
        <img src={props.img01} alt="NEW" />
        <img src={props.img02} alt="" />
      </div>
      <h3 className="admin-product-card__name">{props.name}</h3>
      <div className="admin-product-card__price">
        {numberWithCommas(props.price)}
        <span className="admin-product-card__price__old">
          <del>{numberWithCommas(25000000)}</del>
        </span>
      </div>
      <div className="admin-product-card__btn">
        <Button style={{padding:"0 20px",margin:"0 20px"}} icon={<EditOutlined />}></Button>
        <Button style={{padding:"0 20px",margin:"0 20px"}} icon={<DeleteOutlined />}></Button>
      </div>
    </div>
  );
};

AdminProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default AdminProductCard;
