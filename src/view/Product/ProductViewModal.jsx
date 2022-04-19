import { Modal } from "antd";
import React from "react";
import { SubTitle } from "../../components/SubTitle";
import ProductView from "./ProductView";

const ProductViewModal = ({ openModal, onClose, productDetail ,id}) => {
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
        width={500}
        footer={null}
        keyboard={true}
      >
        <SubTitle
          title={"Sản phẩm"}
          onClickClose={onClose}
          defaultValue={productDetail}
        />
        <ProductView/>
      </Modal>
    </>
  );
};

export default ProductViewModal;
