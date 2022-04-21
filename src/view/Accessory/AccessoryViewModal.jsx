import { Modal } from "antd";
import React from "react";
import { SubTitle } from "../../components/SubTitle";
import AccessoryView from "./AccessoryView";

const AccessoryViewModal = ({ openModal, onClose, accessoryDetail }) => {
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
          defaultValue={accessoryDetail}
        />
        <AccessoryView defaultValue={accessoryDetail} onClose={onClose} />
      </Modal>
    </>
  );
};

export default AccessoryViewModal;
