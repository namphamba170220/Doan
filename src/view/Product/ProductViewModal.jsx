import { Modal } from "antd";
import React from "react";
import { SubTitle } from "../../components/SubTitle";
import ProductView from "./ProductView";

const ProductViewModal = ({ openModal, onClose, productDetail }) => {
  return (
    <>
      <Modal
        title={null}
        closable={false}
        centered
        visible={openModal}
        onCancel={() => {
          Modal.destroyAll();
          onClose();
        }}
        width={1000}
        footer={null}
        keyboard={true}
      >
        <SubTitle
          title={"Thông tin sản phẩm"}
          onClickClose={onClose}
          defaultValue={productDetail}
        />
        <ProductView defaultValue={productDetail} onClose={onClose} />
      </Modal>
    </>
  );
};

export default ProductViewModal;
