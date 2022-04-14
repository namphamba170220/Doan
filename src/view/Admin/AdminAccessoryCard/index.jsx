import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import accessoryApi from "../../../Api/accessoryApi";
import ConfirmPopup from "../../../components/ConfirmPopup";
import numberWithCommas from "../../../utils/numberWithCommas";
import AddAccessory from "../AddAccessory";
import "./index.scss";

const AdminAccessoryCard = (props) => {
  const [isModalEditAccessory, setIsModalEditAccessory] = useState(false);
  const [id, setId] = useState(null);
  const [accessoryData, setAccessoryData] = useState([]);
  const [isReloadAccessory, setIsReloadAccessory] = useState(false);
  const [accessoryDetail, setAccessoryDetail] = useState(null);
  const [openModalDeleteAccessory, setOpenModalDeleteAccessory] =
    useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleReloadAccessory = () => {
    setIsReloadAccessory(true);
  };

  useEffect(() => {
    accessoryApi
      .getAll()
      .then((res) => {
        if (res.statusText === "OK") {
          setAccessoryData(res.data);
        }
      })
      .finally(() => {
        setIsReloadAccessory(false);
      });
  }, [isReloadAccessory]);

  const handelDeleteAccessory = (check) => {
    if (check && id) {
      accessoryApi.remove(id).then((res) => {
        setTimeout(() => {
          enqueueSnackbar("Success");
        }, 500);
        setOpenModalDeleteAccessory(false);
        props.onReloadAccessory();
      });
    } else {
      setOpenModalDeleteAccessory(false);
    }
  };

  const showDeleteAccessoryConfirm = (id) => {
    setId(id);
    setOpenModalDeleteAccessory(true);
  };
  const onCloseModal = () => {
    setIsModalEditAccessory(false);
    setAccessoryDetail(null);
  };

  const showModalEdit = (item) => {
    setIsModalEditAccessory(true);
    setAccessoryDetail(item);
  };
  return (
    <div className="admin-product-card">
      <div className="admin-product-card__image">
        <img src={props.img01} alt="NEW" />
        <img src={props.img02} alt="" />
      </div>
      <h3 className="admin-product-card__name">{props.title}</h3>
      <div className="admin-product-card__price">
        {numberWithCommas(props.price)}
        <span className="admin-product-card__price__old">
          <del>{numberWithCommas(2000000)}</del>
        </span>
      </div>
      <div className="admin-product-card__btn">
        <Button
          onClick={() => showModalEdit(props?.item)}
          style={{ padding: "0 20px", margin: "0 20px" }}
          className="btn-nowidth"
          icon={<EditOutlined />}
        ></Button>
        <Button
          onClick={() => showDeleteAccessoryConfirm(props?.id)}
          style={{ padding: "0 20px", margin: "0 20px" }}
          icon={<DeleteOutlined />}
        ></Button>
      </div>
      {isModalEditAccessory && (
        <AddAccessory
          openModal={isModalEditAccessory}
          onClose={onCloseModal}
          accessoryDetail={accessoryDetail}
          onReloadAccessory={handleReloadAccessory}
        />
      )}
      <ConfirmPopup
        onConfirm={handelDeleteAccessory}
        visibleModal={openModalDeleteAccessory}
      />
    </div>
  );
};

AdminAccessoryCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default AdminAccessoryCard;
