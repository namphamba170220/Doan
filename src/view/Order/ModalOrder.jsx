import { Modal } from "antd";
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./index.scss";
function ModalOrder({ openModal, onClose }) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qyfe7we",
        "template_sgvfkmq",
        e.target,
        "QO8zHHMpHDDpzlYYc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    onClose();
  };

  return (
    <Modal
      title={null}
      closable={false}
      centered
      visible={openModal}
      onCancel={() => {
        Modal.destroyAll();
        onClose();
      }}
      footer={null}
      keyboard={true}
    >
      <div className="content-confirm">
        <div className="icon">
          <CheckCircleOutlined className="icon-warning" />
        </div>
        <div className="mt-3 confirm-p">Confirm</div>
        <div className="mt-2 content">Are you sure?</div>
        <form ref={form} onSubmit={sendEmail}>
          <input className="submit-confirm" type="submit" value="Xác nhận" />
        </form>
      </div>
    </Modal>
  );
}

export default ModalOrder;
