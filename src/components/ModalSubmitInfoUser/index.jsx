import { Form, Modal, Input, Button } from "antd";
import React from "react";
import { SubTitle } from "../SubTitle";
import { useSnackbar } from "notistack";
import orderApi from "../../Api/orderApi";
function ModalSubmitInfoUser({ openModal, onClose, productCardDetai }) {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (data) => {
    const infoUserData = {
      fullname: data.fullname,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
    };
    const postOrder = {
      infoUserData,
      productCardDetai,
    };
    orderApi.add(postOrder).then((res) => {
      return res;
    });
    onClose();
    enqueueSnackbar("Đặt hàng thành công!!!");
    enqueueSnackbar("Vui lòng chờ xác nhận đơn hàng!!!");
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
        <Form form={form} onFinish={onSubmit} name="control-ref">
          <SubTitle
            title={"Nhập thông tin người dùng"}
            onClickClose={onClose}
          />
          <div className="appointment--settings-form">
            <div className="appointment--form-wrapper">
              <div className="scroll__modal">
                <div className="appointment--content">
                  <div className="input-form">
                    <div className="appointment--setting fullname">
                      <label className="label-input">Họ và tên</label>
                      <Form.Item
                        name="fullname"
                        rules={[
                          {
                            required: true,
                            message: "Valid FullName",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập họ và tên"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting email">
                      <label className="label-input">Email</label>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Valid Email",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập giá sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting phoneNumber">
                      <label className="label-input">Số điện thoại</label>
                      <Form.Item
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Valid PhoneNumber",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập số điện thoại người nhận"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting address">
                      <label className="label-input">Địa chỉ</label>
                      <Form.Item
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: "Valid Address",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập địa chỉ người nhận"
                        />
                      </Form.Item>
                      <Form.Item>
                        <div className="btn-project-submission">
                          <Button htmlType="submit">
                            Xác nhận thông tin đơn hàng
                          </Button>
                        </div>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default ModalSubmitInfoUser;
