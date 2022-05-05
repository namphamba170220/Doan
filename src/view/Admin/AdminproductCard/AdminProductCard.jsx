import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import productApi from "../../../Api/productApi";
import ConfirmPopup from "../../../components/ConfirmPopup";
import numberWithCommas from "../../../utils/numberWithCommas";
import Addproduct from "../AddProduct/Addproduct";
import "./index.scss";

const AdminProductCard = (props) => {
  const [isModalEditProduct, setIsModalEditProduct] = useState(false);
  const [id, setId] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handelDeleteProduct = (check) => {
    if (check && id) {
      productApi.remove(id).then((res) => {
        setTimeout(() => {
          enqueueSnackbar("Success");
        }, 500);
        setOpenModalDeleteProduct(false);
        props.onSuccess();
      });
    } else {
      setOpenModalDeleteProduct(false);
    }
  };

  const showDeleteProductConfirm = (id) => {
    setId(id);
    setOpenModalDeleteProduct(true);
  };
  const onCloseModal = () => {
    setIsModalEditProduct(false);
    setProductDetail(null);
  };

  const showModalEdit = (item) => {
    return () => {
      setIsModalEditProduct(true);
      setProductDetail(item);
    };
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
          <del>{numberWithCommas(25000000)}</del>
        </span>
      </div>
      <div className="admin-product-card__btn">
        <Button
          onClick={showModalEdit(props?.item)}
          style={{ padding: "0 20px", margin: "0 20px" }}
          className="btn-nowidth"
          icon={<EditOutlined />}
        ></Button>
        <Button
          onClick={() => showDeleteProductConfirm(props?.id)}
          style={{ padding: "0 20px", margin: "0 20px" }}
          icon={<DeleteOutlined />}
        ></Button>
      </div>
      {isModalEditProduct && (
        <Addproduct
          openModal={isModalEditProduct}
          onClose={onCloseModal}
          productDetail={productDetail}
          onSuccess={props.onSuccess}
        />
      )}
      <ConfirmPopup
        onConfirm={handelDeleteProduct}
        visibleModal={openModalDeleteProduct}
      />
    </div>
  );
};

AdminProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default AdminProductCard;
