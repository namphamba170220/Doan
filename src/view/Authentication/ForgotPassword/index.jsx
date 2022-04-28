import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../Api/userApi";
import emailjs from "emailjs-com";
import "./index.scss";
function ForgotPassword({ openModal, onClose }) {
  const [email, setEmail] = useState("");
  const naigate = useNavigate();

  const SubmitForgotPassword = (e) => {
    e.preventDefault();
    userApi.getUserWithForgot(email).then((res) => {
      const { data } = res;
      if (data.length === 0) {
        alert("Tài khoản chưa tồn tại");
        return;
      } else {
        const user = data[0];
        const idUser = makeid(5);
        userApi
          .update(user.id, {
            ...user,
            codeResetPass: idUser,
          })
          .then((res) => {
            emailjs
              .send(
                "service_qyfe7we",
                "template_13c3fdh",
                {
                  message: `resert code : ${idUser}`,
                },
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
            naigate(`/forgotpassword/${email}`);
          });
      }
    });
  };
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
        footer={null}
        keyboard={true}
      >
        <Input
          placeholder="Vui lòng nhập email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={SubmitForgotPassword}> Xác nhận</Button>
      </Modal>
    </>
  );
}
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default ForgotPassword;
