import { Modal } from "antd";
import React from "react";
import { SubTitle } from "../../components/SubTitle";

const ProductViewModal = ({ openModal, onClose ,productDetail}) => {
  return (
    <>
      <Modal>
        <SubTitle title = {"Product"} 
        onClickClose = {onClose}
        defaultValue = {productDetail}/>
        <Modal
          title={null}
          closable={false}
          centered
          visible={openModal}
          onCancel={() => {
            Modal.destroyAll();
            onClose();
          }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Modal>
    </>
  );
};

export default ProductViewModal;
