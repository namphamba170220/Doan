import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import accessoryApi from "../../../Api/accessoryApi";
import productApi from "../../../Api/productApi";
import ConfirmPopup from "../../../components/ConfirmPopup";
import numberWithCommas from "../../../utils/numberWithCommas";
import Addproduct from "../AddProduct/Addproduct";
import "./index.scss";

const AdminProductCard = (props) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [openModalDeleteProjects, setOpenModalDeleteProjects] = useState(false);
  const [openModalDeleteAccessory, setOpenModalDeleteAccessory] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handelDeleteProduct = (check) => {
    if (check && id) {
      productApi.remove(id).then((res) => {
        setTimeout(() => {
          enqueueSnackbar("Success");
        }, 500);
        setOpenModalDeleteProjects(false);
        props.onReloadProduct();
      });
    } else {
      setOpenModalDeleteProjects(false);
    }
  };

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

  const showDeleteConfirm = (id) => {
    setOpenModalDeleteProjects(true);
    setOpenModalDeleteAccessory(true);
    setId(id);
  };
  const onClose = () => {
    setVisible(false);
  };

  const showModalEdit = () => {
    setVisible(true);
  };
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
        <Button
          onClick={showModalEdit}
          style={{ padding: "0 20px", margin: "0 20px" }}
          className="btn-nowidth"
          icon={<EditOutlined />}
        ></Button>
        <Button
          onClick={() => showDeleteConfirm(props?.id)}
          style={{ padding: "0 20px", margin: "0 20px" }}
          icon={<DeleteOutlined />}
        ></Button>
      </div>
      {visible && (
        <Addproduct
          visible={visible}
          onClose={onClose}
          projectDetail={projectDetail}
        />
      )}
      <ConfirmPopup
        onConfirm={handelDeleteProduct}
        visibleModal={openModalDeleteProjects}
      />
       <ConfirmPopup
        onConfirm={handelDeleteAccessory}
        visibleModal={openModalDeleteAccessory}
      />
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
