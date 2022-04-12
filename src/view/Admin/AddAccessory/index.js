import { Form, Input, Modal } from "antd";
import React from "react";
import productApi from "../../../Api/productApi";
import { ButtonSubmission } from "../../../components/ButtonSubmission/index";
import { SubTitle } from "../../../components/SubTitle";
const { TextArea } = Input;
const AddAccessory = ({ openModal, onClose, accessoryDetail,onReloadAccessory}) => {
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    const AccessoryData = {
      id: data?.id,
      title: data?.title,
      image01: data?.image01,
      image02: data?.image02,
      categoryslug: data?.categoryslug,
      price: data?.price,
      slug: data?.slug,
      color: data?.colors,
      description: data?.description,
    };
    console.log(data);
    if (accessoryDetail?.id) {
      productApi
        .update(accessoryDetail.id && AccessoryData)
        .then((res) => {
          onClose();
          onReloadAccessory();
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    } else {
      productApi
        .add(AccessoryData)
        .then((res) => {
          onClose();
          onReloadAccessory();
        })
        .catch((error) => {
          console.log(`error`, error);
        });
    }
  };

  return (
    <>
      <Modal
        title={null}
        closable={false}
        centered
        onCancel={() => {
          Modal.destroyAll();
          onClose();
        }}
        footer={null}
        keyboard={true}
        visible={openModal}
        width={500}
      >
        <Form form={form} onFinish={onSubmit} name="control-ref">
          <SubTitle
            title={accessoryDetail ? "Edit Accessory" : "Add Accessory"}
            onClickClose={onClose}
            defaultValue={accessoryDetail}
          />
          <div className="appointment--settings-form">
            <div className="appointment--form-wrapper">
              <div className="scroll__modal">
                <div className="appointment--content">
                  <div className="input-form">
                    <div className="appointment--setting name">
                      <label className="label-input">Title</label>
                      <Form.Item
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "validName",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập tên sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Price</label>
                      <Form.Item
                        name="price"
                        rules={[
                          {
                            required: true,
                            message: "validPrice",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập giá sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Image01</label>
                      <Form.Item
                        name="image01"
                        rules={[
                          {
                            required: true,
                            message: "validLink",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập link ảnh sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Image02</label>
                      <Form.Item
                        name="image02"
                        rules={[
                          {
                            required: true,
                            message: "validLink",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập link ảnh sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Categoryslug</label>
                      <Form.Item
                        name="category"
                        rules={[
                          {
                            required: true,
                            message: "validCategory",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập phân loại sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Colors</label>
                      <Form.Item
                        name="colors"
                        rules={[
                          {
                            required: true,
                            message: "validColor",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập màu sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting name">
                      <label className="label-input">Slug</label>
                      <Form.Item
                        name="slug"
                        rules={[
                          {
                            required: true,
                            message: "validSlug",
                          },
                        ]}
                      >
                        <Input
                          className="appointment--item custom__input"
                          placeholder="Nhập số định dạng sản phẩm"
                        />
                      </Form.Item>
                    </div>
                    <div className="appointment--setting description">
                      <label className="label-input">Description</label>
                      <Form.Item name="description">
                        <TextArea
                          rows={2}
                          name="description"
                          className="appointment--item custom__input"
                          placeholder="Mô tả sản phẩm"
                        />
                      </Form.Item>
                      <Form.Item shouldUpdate>
                        <div className="btn-project-submission">
                          <ButtonSubmission isEdit={accessoryDetail?.id} />
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
};

export default AddAccessory;
