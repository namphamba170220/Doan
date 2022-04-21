import PropTypes from "prop-types";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import numberWithCommas from "../../utils/numberWithCommas";
import accessoryApi from "../../Api/accessoryApi";
import AccessoryViewModal from "./AccessoryViewModal";

const AccessoryCard = (props) => {
  const [isShowModalAccessory, setIsShowModalAccessory] = useState(false);
  const [accsessoryData, setAccessoryData] = useState([]);
  const onShowModalAccessory = (id) => {
    callApi(id);
  };
  const closeModal = () => {
    setIsShowModalAccessory(false);
  };

  const callApi = (id) => {
    accessoryApi.get(id).then((res) => {
      setAccessoryData(res?.data);
      setIsShowModalAccessory(true);
    });
  };
  return (
    <div className="accessory-card">
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
      <div className="accessory-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => onShowModalAccessory(props.id)}
        >
          Chọn mua
        </Button>
      </div>
      {isShowModalAccessory && (
        <AccessoryViewModal
          openModal={isShowModalAccessory}
          onClose={closeModal}
          accessoryDetail={accsessoryData}
        />
      )}
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
